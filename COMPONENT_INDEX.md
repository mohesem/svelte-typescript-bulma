# Component Index

> 22 components exported from svelte-typescript-bulma@0.1.7.

## Components

- [`Button`](#button)
- [`ButtonGroup`](#buttongroup)
- [`Card`](#card)
- [`CardContent`](#cardcontent)
- [`CardFooter`](#cardfooter)
- [`Column`](#column)
- [`Columns`](#columns)
- [`Fieldset`](#fieldset)
- [`Help`](#help)
- [`Input`](#input)
- [`ModalNotif`](#modalnotif)
- [`Navbar`](#navbar)
- [`NavbarBrand`](#navbarbrand)
- [`NavbarEnd`](#navbarend)
- [`NavbarItem`](#navbaritem)
- [`Notification`](#notification)
- [`PageLoader`](#pageloader)
- [`Subtitle`](#subtitle)
- [`Text`](#text)
- [`Title`](#title)
- [`Toast`](#toast)
- [`box`](#box)

---

## `Button`

### Props

| Prop name | Kind             | Reactive | Type                                                                                                  | Default value         | Description                                |
| :-------- | :--------------- | :------- | :---------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------ |
| color     | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" </code> | <code>""</code>       | --                                         |
| theme     | <code>let</code> | No       | <code> 'white' &#124; 'light'&#124; 'dark'&#124; 'black' &#124; 'text' &#124; 'ghost' </code>         | <code>""</code>       | --                                         |
| size      | <code>let</code> | No       | <code> 'small' &#124; 'normal'&#124; 'medium' &#124; 'large' </code>                                  | <code>"normal"</code> | --                                         |
| label     | <code>let</code> | No       | <code> string</code>                                                                                  | <code>""</code>       | --                                         |
| block     | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | Specify whether the button should be block |
| outline   | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| invert    | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| round     | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| loading   | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| freeze    | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| disabled  | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --                                         |
| id        | <code>let</code> | No       | <code> string</code>                                                                                  | <code>""</code>       | --                                         |
| name      | <code>let</code> | No       | <code> string</code>                                                                                  | <code>""</code>       | --                                         |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

| Event name | Type      | Detail |
| :--------- | :-------- | :----- |
| click      | forwarded | --     |

## `ButtonGroup`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Card`

### Props

| Prop name | Kind             | Reactive | Type                 | Default value      | Description |
| :-------- | :--------------- | :------- | :------------------- | ------------------ | ----------- |
| centered  | <code>let</code> | No       | <code>boolean</code> | <code>false</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `CardContent`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `CardFooter`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Column`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Columns`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Fieldset`

### Props

| Prop name | Kind             | Reactive | Type                 | Default value      | Description |
| :-------- | :--------------- | :------- | :------------------- | ------------------ | ----------- |
| disabled  | <code>let</code> | No       | <code>boolean</code> | <code>false</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Help`

### Props

| Prop name | Kind             | Reactive | Type                                                                                                  | Default value   | Description |
| :-------- | :--------------- | :------- | :---------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| color     | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" </code> | <code>""</code> | --          |
| message   | <code>let</code> | No       | <code>string</code>                                                                                   | <code>""</code> | --          |

### Slots

None.

### Events

None.

## `Input`

### Props

| Prop name   | Kind             | Reactive | Type                                                                                                  | Default value         | Description |
| :---------- | :--------------- | :------- | :---------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| value       | <code>let</code> | Yes      | <code>string</code>                                                                                   | <code>""</code>       | --          |
| color       | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" </code> | <code>""</code>       | --          |
| size        | <code>let</code> | No       | <code> 'small' &#124; 'normal'&#124; 'medium' &#124; 'large' </code>                                  | <code>"normal"</code> | --          |
| round       | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --          |
| loading     | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --          |
| notifs      | <code>let</code> | No       | <code>[]</code>                                                                                       | <code>[]</code>       | --          |
| readonly    | <code>let</code> | No       | <code>boolean</code>                                                                                  | <code>false</code>    | --          |
| label       | <code>let</code> | No       | <code>string</code>                                                                                   | <code>""</code>       | --          |
| name        | <code>let</code> | No       | <code>string</code>                                                                                   | <code>""</code>       | --          |
| id          | <code>let</code> | No       | <code>string</code>                                                                                   | <code>""</code>       | --          |
| placeholder | <code>let</code> | No       | <code>string</code>                                                                                   | <code>""</code>       | --          |
| t           | <code>let</code> | No       | <code> 'text' &#124; 'password' </code>                                                               | <code>"text"</code>   | --          |

### Slots

None.

### Events

| Event name | Type      | Detail |
| :--------- | :-------- | :----- |
| input      | forwarded | --     |
| blur       | forwarded | --     |

## `ModalNotif`

### Props

| Prop name | Kind             | Reactive | Type                    | Default value           | Description |
| :-------- | :--------------- | :------- | :---------------------- | ----------------------- | ----------- |
| active    | <code>let</code> | No       | <code>boolean</code>    | <code>false</code>      | --          |
| onClose   | <code>let</code> | No       | <code>() => null</code> | <code>() => null</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Navbar`

### Props

| Prop name    | Kind             | Reactive | Type                                                                                                                                                             | Default value         | Description |
| :----------- | :--------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| color        | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" &#124; "black" &#124; "dark" &#124; "white" &#124; "light" </code> | <code>""</code>       | --          |
| defaultClass | <code>let</code> | No       | <code>string</code>                                                                                                                                              | <code>"navbar"</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `NavbarBrand`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `NavbarEnd`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `NavbarItem`

### Props

| Prop name | Kind             | Reactive | Type                 | Default value      | Description |
| :-------- | :--------------- | :------- | :------------------- | ------------------ | ----------- |
| href      | <code>let</code> | No       | <code>string</code>  | <code>""</code>    | --          |
| value     | <code>let</code> | No       | <code>string</code>  | <code>""</code>    | --          |
| active    | <code>let</code> | No       | <code>boolean</code> | <code>false</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Notification`

### Props

| Prop name | Kind             | Reactive | Type                                                                                                  | Default value   | Description |
| :-------- | :--------------- | :------- | :---------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| color     | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" </code> | <code>""</code> | --          |
| theme     | <code>let</code> | No       | <code> 'white' &#124; 'light'&#124; 'dark'&#124; 'black' &#124; 'text' &#124; 'ghost' </code>         | <code>""</code> | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `PageLoader`

### Props

None.

### Slots

None.

### Events

None.

## `Subtitle`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Text`

### Props

| Prop name | Kind             | Reactive | Type                                                                                                    | Default value  | Description |
| :-------- | :--------------- | :------- | :------------------------------------------------------------------------------------------------------ | -------------- | ----------- |
| size      | <code>let</code> | No       | <code> 1 &#124; 2 &#124; 3 &#124; 4 &#124; 5 &#124; 6 &#124; 7 &#124; undefined </code>                 | <code>2</code> | --          |
| align     | <code>let</code> | No       | <code> 'center' &#124; 'justify' &#124; 'left' &#124; 'right' &#124; undefined</code>                   | --             | --          |
| weight    | <code>let</code> | No       | <code> 'light' &#124; 'normal' &#124; 'medium' &#124; 'semibold' &#124; 'bold' &#124; undefiend </code> | --             | --          |

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Title`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.

## `Toast`

### Props

| Prop name | Kind             | Reactive | Type                                                                                                  | Default value   | Description |
| :-------- | :--------------- | :------- | :---------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| color     | <code>let</code> | No       | <code>"primary" &#124; "link" &#124; "info" &#124; "warning" &#124; "success" &#124; "danger" </code> | <code>""</code> | --          |
| theme     | <code>let</code> | No       | <code> 'white' &#124; 'light'&#124; 'dark'&#124; 'black' &#124; 'text' &#124; 'ghost' </code>         | <code>""</code> | --          |

### Slots

None.

### Events

None.

## `box`

### Props

None.

### Slots

| Slot name | Default | Props | Fallback |
| :-------- | :------ | :---- | :------- |
| --        | Yes     | --    | --       |

### Events

None.
