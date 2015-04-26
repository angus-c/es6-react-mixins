# es6-react-mixins

`es6-react-mixins` is a module that lets you augment your ES6 React component classes with any number of custom ES6 mixins. You can also use it to merge traditional pre-es6 React mixin objects into your ES6 React classes.

Inspired by [this gist](https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596) by [Sebastian Markbåge](https://github.com/sebmarkbage) the strategy is transient class hierarchies – instead of locking classes into permanent *is a* roles, class realtionships are assembled and re-assembled at will.

ES6 mixins are functions that return classes. There's no need to extend `React.component`, you get that for free.

```js
const es6Mixin = base => class extends base {
  componentWillMount() {
    console.log("augmented componentWillMount");
  }
  render() {
    console.log("augmented render");
  }
};
```

React components invokes mixins with a call to `super`.

```js
import 'mixin' from 'es6-react-mixins';
import 'React' from 'react';

class MyComponent extends mixin(es6Mixin) {
  componentWillMount() {
    super.componentWillMount();
  }
  render() {
    super.render();
    return <div>hello/div>;
  }
}

React.render(<MyComponent>, document.body);
```
The API works with any number of mixins. Obviously order matters withe multiple mixins–each super call works its way up the hierarchy.

```js
const mixin1 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    console.log("mixin1 componentWillMount");
  }
  render() {
    super.render();
    console.log("mixin1 render");
  }
};

const mixin2 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    console.log("mixin2 componentWillMount");
  }
  render() {
    super.render();
    console.log("mixin2 render");
  }
};

class MyComponent extends mixin(mixin1, mixin2) {
  componentWillMount() {
    super.componentWillMount();
  }
  render() {
    super.render();
    return <div>hello/div>;
  }
}
```

Notice that any mixin can call `super`, even though there may be no other mixins to hear it. Every mixin descends from a base mixin with no-op implementations of the react lifecycle methods.

`es6-react-mixins` also accepts traditional plain object mixins (a la pre-ES6 React), adapting them to ES6 style mixins internally.

```js
var reactMixin = {
  componentWillMount: function () {
    console.log
  },
  render: function () {
    this.reactMixin_rendered = true;
  }
};

class MyComponent extends mixin(reactMixin) {
  componentWillMount() {
    super.componentWillMount();
  }
  render() {
    super.render();
    return <div>hello/div>;
  }
}
```

#Installation

```
npm install es6-react-mixins
```

The source is written in es6 put there's an npm prebublish step which transpiles to es5 and dumps into `lib` directory - which is the default import.

#Testing

```
npm test
```

#Contributions

Yes please!







