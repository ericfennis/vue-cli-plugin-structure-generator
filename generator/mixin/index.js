const fs = require('fs')
  
module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src/mixins/${options.name.camelCase}.js`]: `./template/mixin.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })
  
  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/mixins/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent+`export { default as ${options.name.camelCase} } from \'./${options.name.camelCase}\';\n`;

    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/mixins/_globals.js'),
            globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
              .replace(/} from \'\.\';/, (`  ${options.name.camelCase},\n} from '.';`))
              .replace(/const mixins = {/, (`const mixins = {\n\t${options.name.camelCase},`))

      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
    }
  });

}