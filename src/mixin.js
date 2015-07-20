/*
 * based on https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596
 * by Sebastian Markbåge
 */

import React from 'react';

const noop = () => null;
const trueNoop = () => true;
const es6ify = (mixin) => {
  if (typeof mixin === 'function') {
    // mixin is already es6 style
    return mixin;
  }
  return (Base) => {
    // mixin is old-react style plain object
    // convert to ES6 class
    class NewClass extends Base {}

    const clonedMixin = {...mixin};
    // These React properties are defined as ES7 class static properties
    [
      'childContextTypes', 'contextTypes',
      'defaultProps', 'propTypes'
    ].forEach(m => {
      NewClass[m] = clonedMixin[m];
      delete clonedMixin[m];
    });
    Object.assign(NewClass.prototype, clonedMixin);

    return NewClass;
  };
};

const mixin = (...mixins) => {
  class Base extends React.Component {}

  Base.prototype.shouldComponentUpdate = trueNoop;

  // No-ops so we need not check before calling super()
  ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps',
   'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount',
   'render'].
    forEach(m => Base.prototype[m] = noop);

  mixins.reverse();

  mixins.forEach(mixin => Base = es6ify(mixin)(Base));
  return Base;
};

export default mixin;
