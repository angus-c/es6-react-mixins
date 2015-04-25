describe('es6 sanity test', () =>
  it('should destruture', () => {
    let obj = { a:2, b:4 };
    let { a, b } = obj;
    assert.equal( a, 2);
    assert.equal( b, 4);
  })
)