const fs = require('fs')

module.exports = (api, options, rootOptions) => {
  
  const files = {
      [`./src/components/${options.name}/index.js`]: `./template/index.js`,
      [`./src/components/${options.name}/${options.name}.js`]: `./template/component.js`,
      [`./src/components/${options.name}/${options.name}.vue`]: `./template/component.vue`,
      [`./src/components/${options.name}/${options.name}.scss`]: `./template/component.scss`
    }

  api.render(files, {
    ...options,
  })

  try {
    const importComponent =`import ${options.name} from \'./${options.name}\';`
    api.injectImports('src/components/index.js', importComponent)
  } catch (e) {
    console.error(`Couldn't add '${importComponent}' to: (./src/components/index.js)`)
  }

  api.onCreateComplete(() => {

    const indexFilePath = api.resolve('./src/components/index.js')
    let content = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    content = content.replace(/export {/, (
      `export {
  ${options.name},`
    ))
    fs.writeFileSync(indexFilePath, content, { encoding: 'utf8' })
  });

}