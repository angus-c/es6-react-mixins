'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * based on https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596
 * by Sebastian Markbåge
 */

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var noop = function noop() {};
var es6ify = function es6ify(mixin) {
  if (typeof mixin === 'function') {
    // mixin is already es6 style
    return mixin;
  }
  return function (Base) {
    // mixin is old-react style plain object
    // convert to ES6 class

    var NewClass = (function (_Base) {
      function NewClass() {
        _classCallCheck(this, NewClass);

        if (_Base != null) {
          _Base.apply(this, arguments);
        }
      }

      _inherits(NewClass, _Base);

      return NewClass;
    })(Base);

    Object.assign(NewClass.prototype, mixin);
    return NewClass;
  };
};

var mixin = function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  var Base = (function (_React$Component) {
    function Base() {
      _classCallCheck(this, Base);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(Base, _React$Component);

    return Base;
  })(_React2['default'].Component);

  // No-ops so we need not check before calling super()
  ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'render'].forEach(function (m) {
    return Base.prototype[m] = noop;
  });

  mixins.reverse();

  mixins.forEach(function (mixin) {
    return Base = es6ify(mixin)(Base);
  });
  return Base;
};

exports['default'] = mixin;
module.exports = exports['default'];