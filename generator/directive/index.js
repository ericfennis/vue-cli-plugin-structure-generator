const fs = require('fs')
  
module.exports = (api, options, rootOptions) => {

  // List template files
  const files = {
    [`./src/directives/${options.name.kebabCase}.js`]: `./template/directive.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importDirective =`import ${options.name.camelCase} from \'./${options.name.kebabCase}\';`
  
  // Inject imports
  try {
    api.injectImports('src/directives/index.js', importDirective)
  } catch (e) {
    console.error(`Couldn't add '${importDirective}' to: (./src/directives/index.js)`)
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/directives/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name.camelCase},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/directives/_globals.js')
      let globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
  
      globalFileContent = globalFileContent
      .replace(/} from \'\.\';/, (
`  ${options.name.camelCase},
} from '.'`
      ))
      .replace(/const directives = {/, (
        `const directives = {
  ${options.name.camelCase},`
      ))
      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
      
    }
  });

}