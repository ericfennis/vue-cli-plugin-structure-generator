module.exports = (api, options) => {
  //api.injectImports(api.entryFile, `import store from './store'`)

  const files = {
      [`./src/components/${options.name}/index.js`]: `./template/src/components/component/index.js`,
      [`./src/components/${options.name}/${options.name}.js`]: `./template/src/components/component/component.js`,
      [`./src/components/${options.name}/${options.name}.vue`]: `./template/src/components/component/component.vue`,
      [`./src/components/${options.name}/${options.name}.scss`]: `./template/src/components/component/component.scss`
    }

  api.render(files, {
    ...options,
  })
}