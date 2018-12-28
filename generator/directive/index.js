const fs = require('fs')
  
module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src/directives/${options.name.camelCase}.js`]: `./template/directive.js`,
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/directives/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent+`export { default as ${options.name.camelCase} } from \'./${options.name.camelCase}\';\n`;

    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

    // Inject globals file
    if(options.global) {
      const globalFilePath = api.resolve('./src/directives/_globals.js'),
            globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
              .replace(/} from \'\.\';/, (`  ${options.name.camelCase},\n} from '.';`))
              .replace(/const directives = {/, (`const directives = {\n\t${options.name.camelCase},`))

      fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
    }
  });

}