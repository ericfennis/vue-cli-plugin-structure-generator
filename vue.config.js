const { clientAddonConfig } = require('@vue/cli-ui')

module.exports = {
  ...clientAddonConfig({
    id: 'org.vue.webpack.vue-cli-plugin-structure-generator',
    // Development port (default 8042)
    //port: 8042
  })
}