const fs = require('fs')

module.exports = (api, options) => {

  // List template files
  const files = {
    [`./src${options.path}/${options.name.pascalCase}/index.js`]: `./template/index.js`,
    [`./src${options.path}/${options.name.pascalCase}/${options.name.pascalCase}.js`]: `./template/component.js`,
    [`./src${options.path}/${options.name.pascalCase}/${options.name.pascalCase}.vue`]: `./template/component.vue`,
    [`./src${options.path}/${options.name.pascalCase}/${options.name.pascalCase}.scss`]: `./template/component.scss`
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/components/index.js')

    if (indexFilePath) {
      let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

      indexFileContent = `export { default as ${options.name.pascalCase} } from \'./${options.name.pascalCase}\';\n`+indexFileContent;

      fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })

      // Inject globals file
      if(options.global) {
        const globalFilePath = api.resolve('./src/components/_globals.js'),
              globalFileContent = fs.readFileSync(globalFilePath, { encoding: 'utf8' })
                .replace(/} from \'\.\';/, (`  ${options.name.pascalCase},\n} from '.';`))
                .replace(/const components = {/, (`const components = {\n\t${options.name.pascalCase},`))

        fs.writeFileSync(globalFilePath, globalFileContent, { encoding: 'utf8' })
      }
    }
    
  });

}