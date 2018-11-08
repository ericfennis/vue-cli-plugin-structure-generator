const fs = require('fs')
  
module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src/filters/${options.name.kebabCase}.js`]: `./template/filter.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importFilter =`import ${options.name.camelCase} from \'./${options.name.kebabCase}\';`
  
  // Inject imports
  try {
    api.injectImports('src/filters/index.js', importFilter)
  } catch (e) {
    console.error(`Couldn't add '${importFilter}' to: (./src/filters/index.js)`)
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/filters/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name.camelCase},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/filters/_globals.js')
      let globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
  
      globalFileContent = globalFileContent
      .replace(/} from \'\.\';/, (
`  ${options.name.camelCase},
} from '.';`
      ))
      .replace(/const filters = {/, (
        `const filters = {
  ${options.name.camelCase},`
      ))
      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
      
    }
  });

}