
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Button.svelte generated by Svelte v3.32.1 */

    const file = "src/components/Button.svelte";

    function create_fragment(ctx) {
    	let button;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[24].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[23], null);

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			t0 = text(/*label*/ ctx[0]);
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", /*finalClasses*/ ctx[4]);
    			button.disabled = /*disabled*/ ctx[1];
    			attr_dev(button, "id", /*id*/ ctx[2]);
    			attr_dev(button, "name", /*name*/ ctx[3]);
    			add_location(button, file, 84, 0, 1858);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[25], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*label*/ 1) set_data_dev(t0, /*label*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8388608) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[23], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*finalClasses*/ 16) {
    				attr_dev(button, "class", /*finalClasses*/ ctx[4]);
    			}

    			if (!current || dirty & /*disabled*/ 2) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[1]);
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(button, "id", /*id*/ ctx[2]);
    			}

    			if (!current || dirty & /*name*/ 8) {
    				attr_dev(button, "name", /*name*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    const defaultClass = "button";

    function instance($$self, $$props, $$invalidate) {
    	let _color;
    	let _theme;
    	let _size;
    	let _block;
    	let _outline;
    	let _invert;
    	let _round;
    	let _loading;
    	let _freeze;
    	let finalClasses;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);
    	let { color = "" } = $$props;
    	let { theme = "" } = $$props;
    	let { size = "normal" } = $$props;
    	let { label = "" } = $$props;
    	let { block = false } = $$props;
    	let { outline = false } = $$props;
    	let { invert = false } = $$props;
    	let { round = false } = $$props;
    	let { loading = false } = $$props;
    	let { freeze = false } = $$props;
    	let { disabled = false } = $$props;
    	let { id = "" } = $$props;
    	let { name = "" } = $$props;

    	const writable_props = [
    		"color",
    		"theme",
    		"size",
    		"label",
    		"block",
    		"outline",
    		"invert",
    		"round",
    		"loading",
    		"freeze",
    		"disabled",
    		"id",
    		"name"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ("color" in $$props) $$invalidate(5, color = $$props.color);
    		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
    		if ("size" in $$props) $$invalidate(7, size = $$props.size);
    		if ("label" in $$props) $$invalidate(0, label = $$props.label);
    		if ("block" in $$props) $$invalidate(8, block = $$props.block);
    		if ("outline" in $$props) $$invalidate(9, outline = $$props.outline);
    		if ("invert" in $$props) $$invalidate(10, invert = $$props.invert);
    		if ("round" in $$props) $$invalidate(11, round = $$props.round);
    		if ("loading" in $$props) $$invalidate(12, loading = $$props.loading);
    		if ("freeze" in $$props) $$invalidate(13, freeze = $$props.freeze);
    		if ("disabled" in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("$$scope" in $$props) $$invalidate(23, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		color,
    		theme,
    		size,
    		label,
    		block,
    		outline,
    		invert,
    		round,
    		loading,
    		freeze,
    		disabled,
    		id,
    		name,
    		defaultClass,
    		_color,
    		_theme,
    		_size,
    		_block,
    		_outline,
    		_invert,
    		_round,
    		_loading,
    		_freeze,
    		finalClasses
    	});

    	$$self.$inject_state = $$props => {
    		if ("color" in $$props) $$invalidate(5, color = $$props.color);
    		if ("theme" in $$props) $$invalidate(6, theme = $$props.theme);
    		if ("size" in $$props) $$invalidate(7, size = $$props.size);
    		if ("label" in $$props) $$invalidate(0, label = $$props.label);
    		if ("block" in $$props) $$invalidate(8, block = $$props.block);
    		if ("outline" in $$props) $$invalidate(9, outline = $$props.outline);
    		if ("invert" in $$props) $$invalidate(10, invert = $$props.invert);
    		if ("round" in $$props) $$invalidate(11, round = $$props.round);
    		if ("loading" in $$props) $$invalidate(12, loading = $$props.loading);
    		if ("freeze" in $$props) $$invalidate(13, freeze = $$props.freeze);
    		if ("disabled" in $$props) $$invalidate(1, disabled = $$props.disabled);
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    		if ("name" in $$props) $$invalidate(3, name = $$props.name);
    		if ("_color" in $$props) $$invalidate(14, _color = $$props._color);
    		if ("_theme" in $$props) $$invalidate(15, _theme = $$props._theme);
    		if ("_size" in $$props) $$invalidate(16, _size = $$props._size);
    		if ("_block" in $$props) $$invalidate(17, _block = $$props._block);
    		if ("_outline" in $$props) $$invalidate(18, _outline = $$props._outline);
    		if ("_invert" in $$props) $$invalidate(19, _invert = $$props._invert);
    		if ("_round" in $$props) $$invalidate(20, _round = $$props._round);
    		if ("_loading" in $$props) $$invalidate(21, _loading = $$props._loading);
    		if ("_freeze" in $$props) $$invalidate(22, _freeze = $$props._freeze);
    		if ("finalClasses" in $$props) $$invalidate(4, finalClasses = $$props.finalClasses);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*color*/ 32) {
    			/**
     * @type {"is-primary" | "is-link" | "is-info" | "is-warning" | "is-success" | "is-danger" | ""}
     */
    			 $$invalidate(14, _color = color ? `is-${color}` : "");
    		}

    		if ($$self.$$.dirty & /*theme*/ 64) {
    			/**
     * @type { 'is-white' | 'is-light'| 'is-dark'  | 'is-black'   | 'is-text'   | 'is-ghost'   | '' }
     */
    			 $$invalidate(15, _theme = theme ? `is-${theme}` : null);
    		}

    		if ($$self.$$.dirty & /*size*/ 128) {
    			/**
     * @type { 'is-small' | 'is-normal' | 'is-medium' | 'is-large' }
     */
    			 $$invalidate(16, _size = `is-${size}`);
    		}

    		if ($$self.$$.dirty & /*block*/ 256) {
    			 $$invalidate(17, _block = block ? "is-fullwidth" : null);
    		}

    		if ($$self.$$.dirty & /*outline*/ 512) {
    			 $$invalidate(18, _outline = outline ? "is-outlined" : null);
    		}

    		if ($$self.$$.dirty & /*invert*/ 1024) {
    			 $$invalidate(19, _invert = invert ? "is-inverted" : null);
    		}

    		if ($$self.$$.dirty & /*round*/ 2048) {
    			 $$invalidate(20, _round = round ? "is-rounded" : null);
    		}

    		if ($$self.$$.dirty & /*loading*/ 4096) {
    			 $$invalidate(21, _loading = loading ? "is-loading" : null);
    		}

    		if ($$self.$$.dirty & /*freeze*/ 8192) {
    			 $$invalidate(22, _freeze = freeze ? "is-static" : null);
    		}

    		if ($$self.$$.dirty & /*_color, _theme, _size, _block, _outline, _invert, _round, _loading, _freeze*/ 8372224) {
    			 $$invalidate(4, finalClasses = `${defaultClass} ${_color} ${_theme} ${_size} ${_block} ${_outline} ${_invert} ${_round} ${_loading} ${_freeze}`.replace(/  +/g, " ").trim());
    		}
    	};

    	return [
    		label,
    		disabled,
    		id,
    		name,
    		finalClasses,
    		color,
    		theme,
    		size,
    		block,
    		outline,
    		invert,
    		round,
    		loading,
    		freeze,
    		_color,
    		_theme,
    		_size,
    		_block,
    		_outline,
    		_invert,
    		_round,
    		_loading,
    		_freeze,
    		$$scope,
    		slots,
    		click_handler
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			color: 5,
    			theme: 6,
    			size: 7,
    			label: 0,
    			block: 8,
    			outline: 9,
    			invert: 10,
    			round: 11,
    			loading: 12,
    			freeze: 13,
    			disabled: 1,
    			id: 2,
    			name: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invert() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invert(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get round() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set round(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loading() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loading(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get freeze() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set freeze(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.1 */
    const file$1 = "src/App.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let button;
    	let current;

    	button = new Button({
    			props: { color: /*c*/ ctx[0], label: "button" },
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[1]);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(button.$$.fragment);
    			add_location(main, file$1, 7, 0, 110);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(button, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const button_changes = {};
    			if (dirty & /*c*/ 1) button_changes.color = /*c*/ ctx[0];
    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let c = "link";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		if (c === "link") $$invalidate(0, c = "anger"); else $$invalidate(0, c = "link");
    	};

    	$$self.$capture_state = () => ({ Button, c });

    	$$self.$inject_state = $$props => {
    		if ("c" in $$props) $$invalidate(0, c = $$props.c);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [c, click_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: "world",
      },
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
