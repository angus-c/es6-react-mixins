/*
 * based on https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596
 * by Sebastian Markbåge
 */

import React from 'react';

const noop = () => {};
const es6ify = (mixin) => {
  if (typeof mixin === 'function') {
    // mixin is already es6 style
    return mixin;
  }
  return (Base) => {
    // mixin is old-react style plain object
    // convert to ES6 class
    class NewClass extends Base {}
    Object.assign(NewClass.prototype, mixin);
    return NewClass;
  };
};

const mixin = (...mixins) => {
  class Base extends React.Component {}

  // No-ops so we need not check before calling super()
  ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps',
   'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate',
   'componentWillUnmount', 'render'].
    forEach(m => Base.prototype[m] = noop);

  mixins.reverse();

  mixins.forEach(mixin => Base = es6ify(mixin)(Base));
  return Base;
};

export default mixin;
