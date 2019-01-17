

module.exports = api => {

  api.addClientAddon({
    id: 'org.vue.webpack.vue-cli-plugin-structure-generator',
    // Folder containing the built JS files
    path: '@vue/cli-ui-addon-webpack/dist'
  })

}