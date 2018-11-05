const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'What do you want to generate?',
    choices: [
      {
        name: 'Component',
        value: 'component'
      },
      {
        name: 'View',
        value: 'view'
      },
      {
        name: 'Store',
        value: 'store'
      },
      {
        name: 'Mixin',
        value: 'mixin'
      },
      {
        name: 'Directive',
        value: 'directive'
      },
      {
        name: 'Filter',
        value: 'filter'
      }
    ],
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the component?',
    description: 'Name for the component, this name will also apply for the file names and imports. It will follow the naming convention of Vue and JavaScript',
    group: 'component',
    validate: input => !!input,
    when: answers => answers.type === 'component',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the view?',
    group: 'view',
    validate: input => !!input,
    when: answers => answers.type === 'view',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the store?',
    group: 'store',
    validate: input => !!input,
    when: answers => answers.type === 'store',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the mixin?',
    group: 'mixin',
    validate: input => !!input,
    when: answers => answers.type === 'mixin',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the directive?',
    group: 'directive',
    validate: input => !!input,
    when: answers => answers.type === 'directive',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name for the filter?',
    group: 'filter',
    validate: input => !!input,
    when: answers => answers.type === 'filter',
  },
]

module.exports  = api => {
  if(api.scripts.hasOwnProperty('make')) {
    return questions;
  }
  return [];
}