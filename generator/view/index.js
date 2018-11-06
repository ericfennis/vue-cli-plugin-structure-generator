const fs = require('fs')

module.exports = (api, options, rootOptions) => {

  // List template files
  const files = {
    [`./src/views/${options.name}/index.js`]: `./template/index.js`,
    [`./src/views/${options.name}/${options.name}.js`]: `./template/view.js`,
    [`./src/views/${options.name}/${options.name}.vue`]: `./template/view.vue`,
    [`./src/views/${options.name}/${options.name}.scss`]: `./template/view.scss`
  }

  // Render template
  api.render(files, {
    ...options,
  })

  // Import template
  const importComponent =`import ${options.name} from \'./${options.name}\';`

  // Inject imports
  try {
    api.injectImports('src/views/index.js', importComponent)
  } catch (e) {
    console.error(`Couldn't add '${importComponent}' to: (./src/views/index.js)`)
  }

  // Inject exports
  api.onCreateComplete(() => {
    // Inject index file
    const indexFilePath = api.resolve('./src/views/index.js')
    let indexFileContent = fs.readFileSync(indexFilePath, { encoding: 'utf8' })

    indexFileContent = indexFileContent.replace(/export {/, (
      `export {
  ${options.name},`
    ))
    
    fs.writeFileSync(indexFilePath, indexFileContent, { encoding: 'utf8' })
    
    // If user want to generate a route
    if(options.routes) {
      const routesFilePath = api.resolve('./src/router/routes.js')
      let routesFileContent = fs.readFileSync(routesFilePath, { encoding: 'utf8' })

      routesFileContent = routesFileContent
      .replace(/(\} from \'\.\.\/views\')/, (
`  ${options.name},
} from '../views'`
      ))
      .replace(/export default \[/, (
      `export default [
  {
    path: '${options.routePath}',
    name: '${options.routeName}',
    component: ${options.name},
    meta: {
      title: '${options.routeTitle}',
    },
  },`))
    
      fs.writeFileSync(routesFilePath, routesFileContent, { encoding: 'utf8' })
    }
  });

}