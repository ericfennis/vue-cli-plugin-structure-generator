const fs = require('fs')

module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src/store/modules/${options.name.camelCase}/index.js`]: `./template/index.js`,
    [`./src/store/modules/${options.name.camelCase}/${options.name.camelCase}.js`]: `./template/store.js`
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/store/modules/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent+`export { default as ${options.name.camelCase} } from \'./${options.name.camelCase}\';\n`;

    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })
    
  });
}