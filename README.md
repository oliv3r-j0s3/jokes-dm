# @jokes/jokes-dm

## Package info

### Package installation

Installation using NPM

```bash
npm install @jokes/jokes-dm
```

### Entry points & exports

- (Default entry point)
  - JokesDm (Class)
- jokes-dm.js
  - jokes-dm (Custom Element)


## JokesDm (Class) jokes-dm (Custom Element) 

### Extends from

LitElement (lit-element package)

### Usage

Import and extend the class:

```js
import { JokesDm } from '@jokes/jokes-dm';

class ExampleElement extends JokesDm {
  ...
}
```

Use the custom element (defined globally):

```js
import '@jokes/jokes-dm/jokes-dm.js';
```

```html
<jokes-dm ...>
  ...
</jokes-dm>
```

### Description

![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
  <jokes-dm></jokes-dm>
```

### Properties

- **name** (attribute: name): string = "Cells"
    Description for property
