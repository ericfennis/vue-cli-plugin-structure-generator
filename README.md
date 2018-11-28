<p align=center><img width="410" src="https://user-images.githubusercontent.com/11825403/47913201-848e1000-de9b-11e8-8c51-8d269bdf4ca1.png" alt="Vue Structure Logo"></p>

# Vue CLI Structure Generator
A Vue CLI Plugin Add-on for [Vue CLI Plugin Structure](https://github.com/ericfennis/vue-cli-plugin-structure) to generate components, views (opt. routes), filters, directives and mixins. 

## Getting Started with Structure Generator
``` bash
# Add Generator in your vue cli project
vue add structure generator
```
``` bash
# Start using
$ yarn make

? What do you want to generate? #(Use arrow keys)
❯ Component
  View
  Store
  Mixin
  Directive
```
<br>

### Shorthand generate commands
Shorthand commands give you the option to skip the prompt, it will also not generate imports in ```_globals.js``` files (for component, directive, filters and mixins), for views will it skip the route generator as wel.

#### Using Shorthand commands
``` bash
yarn make --<type> [<name>]  
```

##### Examples:
``` bash
# Generate component
yarn make --component button 
```
``` bash
# Generate view
yarn make --view contact 
```
``` bash
# Generate store
yarn make --store products 
```
``` bash
# Generate filter
yarn make --filter uppercase 
```
``` bash
# Generate directive
yarn make --directive focus 
```
``` bash
# Generate mixin
yarn make --mixin scrollTo 
```