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
    require('./component')(api, options, rootOptions)
  }

  if (options.type === 'view' || options.view) {
    if(options.view) {
      options.name = options.view;
    }
    require('./view')(api, options, rootOptions)
  }
}