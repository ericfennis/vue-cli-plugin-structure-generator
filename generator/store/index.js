const fs = require('fs')

module.exports = (api, options, rootOptions) => {

  // List template files
  const files = {
    [`./src/store/modules/${options.name}/index.js`]: `./template/index.js`,
    [`./src/store/modules/${options.name}/${options.name}.js`]: `./template/store.js`
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importStore =`import ${options.name} from \'./${options.name}\';`

  // Inject imports
  try {
    api.injectImports('src/store/modules/index.js', importStore)
  } catch (e) {
    console.error(`Couldn't add '${importStore}' to: (./src/store/modules/index.js)`)
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/store/modules/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })
    console.log(indexFileContent);
    
    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name},`
    ))
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

  });

}