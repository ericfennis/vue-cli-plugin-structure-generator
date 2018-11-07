const _ = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: _.camelCase(string),
 pascalCase: _.upperFirst(_.camelCase(string)),
 kebabCase: _.kebabCase(string),
})

module.exports = (api, options, rootOptions, opts) => {

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
    require('./component')(api, options, rootOptions)
  }

  if (options.type === 'view' || options.view) {
    if(options.view) {
      options.name = options.view;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./view')(api, options, rootOptions)
  }

  if (options.type === 'store' || options.store) {
    if(options.store) {
      options.name = options.store;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./store')(api, options, rootOptions)
  }

  if (options.type === 'directive' || options.directive) {
    if(options.directive) {
      options.name = options.directive;
    }
    //Set namings
    options.name = getNamings(options.name);
    require('./directive')(api, options, rootOptions)
  }
  
}