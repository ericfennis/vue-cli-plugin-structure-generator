module.exports = (api, options, rootOptions, opts) => {
  
  console.log(options);
  if(api.invoking) {
    api.extendPackage({
      scripts: {
        make: 'vue invoke vue-cli-plugin-structure-generator'
      }
    })
  }

  if (options.type === 'component') {
    require('./component')(api, options)
  }
}