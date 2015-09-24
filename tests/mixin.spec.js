import { assert } from 'chai';
import jsdom from 'mocha-jsdom';
import mixin, { mergeStaticProps } from '../src/mixin.js';
import React from 'react/addons';

const ReactTestUtils = React.addons.TestUtils;

// es6 mixins
const es6Mixin1 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    this.es6Mixin1_componentMounted = true;
  }
  render() {
    super.render();
    this.es6Mixin1_rendered = true;
  }
};

const es6Mixin2 = base => class extends base {
  componentWillMount() {
    super.componentWillMount();
    this.es6Mixin2_componentMounted = true;
  }
  render() {
    super.render();
    this.es6Mixin2_rendered = true;
  }
};

// old-style react mixin (ES5 syntax intentional)
const reactMixin = {
  componentWillMount: function () {
    this.reactMixin_componentMounted = true;
  },
  render: function () {
    this.reactMixin_rendered = true;
  }
};

describe('mixin', () => {
  jsdom();

  assert.typeOf(es6Mixin1, 'function');
  it('works with es6 mixins', () => {
    class Test extends mixin(es6Mixin1) {
      componentDidMount() {
        super.componentDidMount();
        this.componentMounted = true;
        assert.isTrue(this.componentMounted);
        assert.isTrue(this.es6Mixin1_componentMounted);
        assert.isUndefined(this.es6Mixin2_componentMounted);
      }
      render() {
        super.render();
        this.rendered = true;
        assert.isTrue(this.rendered);
        assert.isTrue(this.es6Mixin1_rendered);
        assert.isUndefined(this.es6Mixin2_rendered);
        return (
          <p>Test</p>
        );
      }
    }

    ReactTestUtils.renderIntoDocument(<Test/>);
  });

  it('works with multiple es6 mixins', () => {
    class Test extends mixin(es6Mixin1, es6Mixin2) {
      componentDidMount() {
        super.componentDidMount();
        this.componentMounted = true;
        assert.isTrue(this.componentMounted);
        assert.isTrue(this.es6Mixin1_componentMounted);
        assert.isTrue(this.es6Mixin2_componentMounted);
      }
      render() {
        super.render();
        this.rendered = true;
        assert.isTrue(this.rendered);
        assert.isTrue(this.es6Mixin1_rendered);
        assert.isTrue(this.es6Mixin2_rendered);
        return (
          <p>Test</p>
        );
      }
    }

    ReactTestUtils.renderIntoDocument(<Test/>);
  });

  it('works with old style react mixins', () => {
    assert.typeOf(reactMixin, 'object');
    class Test extends mixin(reactMixin) {
      componentDidMount() {
        super.componentDidMount();
        this.componentMounted = true;
        assert.isTrue(this.componentMounted);
        assert.isTrue(this.reactMixin_componentMounted);
      }
      render() {
        super.render();
        this.rendered = true;
        assert.isTrue(this.rendered);
        assert.isTrue(this.reactMixin_rendered);
        return (
          <p>Test</p>
        );
      }
    }

    ReactTestUtils.renderIntoDocument(<Test/>);
  });

  it('defaults shouldComponentUpdate to truthy', () => {
    class Test extends mixin(es6Mixin1) {
      render() {
        super.render();
        return (
          <p>Test</p>
        );
      }
    }

    const testInstance = new Test({});
    assert.ok(testInstance.shouldComponentUpdate());
  });
});

describe('static property mixin support', () => {
  jsdom();

  const propTypes = {'test': true};

  const es6Mixin = base => {
    class newClass extends base {};
    newClass.propTypes = propTypes;
    return newClass;
  }

  const es5Mixin = {
    propTypes: propTypes
  };

  it('upgrades ES6 properties', () => {
    class Test extends mixin(es6Mixin) {}
    assert.equal(Test.propTypes, propTypes);
  });

  it('upgrades ES5 properties', () => {
    class Test extends mixin(es5Mixin) {}
    assert.deepEqual(Test.propTypes, propTypes);
  })
});

describe('mergeStaticProps', () => {
  jsdom();

  const mixin1 = {
    propTypes: {a: 1}
  };
  const mixin2 = (Base) => {
    class NewClass extends Base {}
    NewClass.propTypes = {
      ...Base.propTypes,
      a: 2,
      b: 1
    };
    return NewClass;
  };

  it('merges ES7 static props of final class from its base class', () => {
    class Test extends mixin(mixin2, mixin1) {
      static propTypes = {a: 0, c: 3};

      constructor() {
        super();
      }
    }
    mergeStaticProps(Test);
    assert.equal(Test.propTypes.a, 2);
    assert.equal(Test.propTypes.b, 1);
    assert.equal(Test.propTypes.c, 3);
  });
});
