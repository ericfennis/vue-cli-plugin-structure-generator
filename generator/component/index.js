module.exports = (api, options, rootOptions) => {
  
  const indexFilePath = api.resolve('./src/components/index.js');

  options.indexFilePath = indexFilePath;
  
  api.injectImports('./src/components/index.js', `import ${options.name} from './${options.name}'`)

  

  const files = {
      //[`./src/components/index.js`]: `./template/src/components/index.js`,
      [`./src/components/${options.name}/index.js`]: `./template/src/components/component/index.js`,
      [`./src/components/${options.name}/${options.name}.js`]: `./template/src/components/component/component.js`,
      [`./src/components/${options.name}/${options.name}.vue`]: `./template/src/components/component/component.vue`,
      [`./src/components/${options.name}/${options.name}.scss`]: `./template/src/components/component/component.scss`
    }

  api.render(files, {
    ...options,
  })
}