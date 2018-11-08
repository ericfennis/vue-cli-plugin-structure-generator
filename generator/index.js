const _ = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: _.camelCase(string),
 pascalCase: _.upperFirst(_.camelCase(string)),
 kebabCase: _.kebabCase(string),
})

module.exports = (api, options) => {

  if(api.invoking) {
    api.extendPackage({
      scripts: {
        make: 'vue invoke vue-cli-plugin-structure-generator'
      }
    })
  }

  if (options.type === 'component' || options.component) {
    if(options.component) {
      options.name = options.component;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./component')(api, options)
  }

  if (options.type === 'view' || options.view) {
    if(options.view) {
      options.name = options.view;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./view')(api, options)
  }

  if (options.type === 'store' || options.store) {
    if(options.store) {
      options.name = options.store;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./store')(api, options)
  }

  if (options.type === 'mixin' || options.mixin) {
    if(options.mixin) {
      options.name = options.mixin;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./mixin')(api, options)
  }

  if (options.type === 'directive' || options.directive) {
    if(options.directive) {
      options.name = options.directive;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./directive')(api, options)
  }

  if (options.type === 'filter' || options.filter) {
    if(options.filter) {
      options.name = options.filter;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./filter')(api, options)
  }
  
}