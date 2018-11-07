const fs = require('fs')

module.exports = (api, options, rootOptions) => {

  // List template files
  const files = {
    [`./src/directives/${options.name}.js`]: `./template/directive.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importDirective =`import ${options.name} from \'./${options.name}\';`

  // Inject imports
  try {
    api.injectImports('src/directives/index.js', importDirective)
  } catch (e) {
    console.error(`Couldn't add '${importDirective}' to: (./src/directives/index.js)`)
  }

  if(options.global) {
    try {
      api.injectImports('src/directives/_globals.js', importDirective)
    } catch (e) {
      console.error(`Couldn't add '${importDirective}' to: (./src/directives/index.js)`)
    }
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/directives/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/directives/_globals.js')
      let globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
  
      globalFileContent = globalFileContent.replace(/const directives = {/, (
        `const directives = {
  ${options.name},`
      ))
      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
      
    }
  });

}