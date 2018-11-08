const fs = require('fs')
  
module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src/mixins/${options.name.kebabCase}.js`]: `./template/mixin.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importMixin =`import ${options.name.camelCase} from \'./${options.name.kebabCase}\';`
  
  // Inject imports
  try {
    api.injectImports('src/mixins/index.js', importMixin)
  } catch (e) {
    console.error(`Couldn't add '${importMixin}' to: (./src/mixins/index.js)`)
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/mixins/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name.camelCase},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/mixins/_globals.js')
      let globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
  
      globalFileContent = globalFileContent
      .replace(/} from \'\.\';/, (
`  ${options.name.camelCase},
} from '.';`
      ))
      .replace(/const mixins = {/, (
        `const mixins = {
  ${options.name.camelCase},`
      ))
      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
      
    }
  });

}