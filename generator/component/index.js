const fs = require('fs')

module.exports = (api, options, rootOptions) => {

  // List template files
  const files = {
    [`./src/components/${options.name}/index.js`]: `./template/index.js`,
    [`./src/components/${options.name}/${options.name}.js`]: `./template/component.js`,
    [`./src/components/${options.name}/${options.name}.vue`]: `./template/component.vue`,
    [`./src/components/${options.name}/${options.name}.scss`]: `./template/component.scss`
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importComponent =`import ${options.name} from \'./${options.name}\';`

  // Inject imports
  try {
    api.injectImports('src/components/index.js', importComponent)
  } catch (e) {
    console.error(`Couldn't add '${importComponent}' to: (./src/components/index.js)`)
  }

  if(options.global) {
    try {
      api.injectImports('src/components/_globals.js', importComponent)
    } catch (e) {
      console.error(`Couldn't add '${importComponent}' to: (./src/components/index.js)`)
    }
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/components/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })
    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/components/_globals.js')
      let globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
  
      globalFileContent = globalFileContent.replace(/const components = {/, (
        `const components = {
  ${options.name},`
      ))
      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
    }
  });

}