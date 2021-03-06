import { mount } from '../../../src/index.js';
import Title from '../../fixtures/Title.vue';
import Tree from '../../fixtures/Tree.vue';
import Slottable from '../../fixtures/Slottable.vue';

describe('mount() & ._init()', function () {
  it('should mount given component', function () {
    const mounted = mount(Title, {});

    expect(mounted).to.have.property('_vm');
    expect(mounted).to.have.property('_el');
    expect(mounted._vm).to.have.property('$el');
    expect(mounted._el[0]).to.be.an.instanceof(HTMLElement);
  });

  it('should be cool with default props', function () {
    const mounted = mount(Title);

    expect(mounted).to.have.property('_vm');
    expect(mounted).to.have.property('_el');
    expect(mounted._vm).to.have.property('$el');
    expect(mounted._el[0]).to.be.an.instanceof(HTMLElement);
  });

  it('should mount given component with props', function () {
    const mounted = mount(Title, {
      title: 'testing 123'
    });

    expect(mounted._el[0].textContent).to.equal('testing 123');
  });

  it('should convert props to kebab case', function () {
    const mounted = mount(Title, {
      titleKebabTest: 'testing 456'
    });

    expect(mounted._el[0].textContent).to.equal('testing 456');
  });

  it('should have length prop', function () {
    const mounted = mount(Title);

    expect(mounted).to.have.property('length');
    expect(mounted).to.have.length(1);
  });

  it('should have length prop when > 1', function () {
    const mounted = mount(Tree).find('li');

    expect(mounted).to.have.property('length');
    expect(mounted).to.have.length(3);
  });

  describe('slots', function () {
    it('should support slot test', function () {
      const mounted = mount(Slottable, {}, 'test');
      expect(mounted._el[0].textContent).to.equal('test');
    });

    it('should not override default text if not specified', function () {
      const mounted = mount(Slottable);
      expect(mounted._el[0].textContent).to.equal('Default text');
    });
  });
});
