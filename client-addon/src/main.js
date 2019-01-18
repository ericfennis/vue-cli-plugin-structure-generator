import StructureGenerator from './components/StructureGenerator'

ClientAddonApi.component('org.vue.webpack.vue-cli-plugin-structure-generator', StructureGenerator)

ClientAddonApi.addRoutes('org.vue.webpack', [
  { path: '/generator', name: 'org.vue.webpack.routes.test', component: TestView }
])