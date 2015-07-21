import mixin from '../src/mixin.js';
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
    assert.equal(Test.propTypes, propTypes);
  })
});
