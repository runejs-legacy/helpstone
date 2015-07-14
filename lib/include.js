import _ from 'lodash';

const DEFAULT_PROPERTIES = [
  'length', 'name', 'arguments', 'caller', 'prototype'
]

const define = (target, props) => {
  for (let key in props) {
    let prop = props[key];
    prop.configurable = true;
    if (prop.value) prop.writable = true;
  }

  Object.defineProperties(target, props);
}

const setSuper = (methods, targetMethods) => {
  let $super = {};

  _.each(targetMethods, (val, key) => {
    $super[key] = val.value;
  });

  methods.$super = { value: $super };

  return methods;
}

const Include = (klass) => {
  return (base) => {
    let instanceMethods = Object.getOwnPropertyDescriptors(klass.prototype);
    let classMethods = Object.getOwnPropertyDescriptors(klass);
    let baseInstanceMethods = Object.getOwnPropertyDescriptors(base.prototype);
    let baseClassMethods = Object.getOwnPropertyDescriptors(base);
    instanceMethods = _.omit(instanceMethods, 'constructor');
    classMethods = _.omit(classMethods, ...DEFAULT_PROPERTIES);

    define(base.prototype, setSuper(instanceMethods, baseInstanceMethods));
    define(base, setSuper(classMethods, baseClassMethods));

    if (classMethods.$included) {
      base.$included();
      delete(base.$included);
    }

    return base;
  }
}

export { Include };