const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'What do you want to generate?',
    choises: [
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
    name: '',
    message: 'Name for the component?',
    group: 'component',
    validate: input => !!input,
    when: answers => answers.type.value === 'component',
  },
  {
    type: 'input',
    name: '',
    message: 'Name for the view?',
    group: 'view',
    validate: input => !!input,
    when: answers => answers.type.value === 'view',
  },
  {
    type: 'input',
    name: '',
    message: 'Name for the store?',
    group: 'store',
    validate: input => !!input,
    when: answers => answers.type.value === 'store',
  },
  {
    type: 'input',
    name: '',
    message: 'Name for the mixin?',
    group: 'mixin',
    validate: input => !!input,
    when: answers => answers.type.value === 'mixin',
  },
  {
    type: 'input',
    name: '',
    message: 'Name for the directive?',
    group: 'directive',
    validate: input => !!input,
    when: answers => answers.type.value === 'directive',
  },
  {
    type: 'input',
    name: '',
    message: 'Name for the filter?',
    group: 'filter',
    validate: input => !!input,
    when: answers => answers.type.value === 'filter',
  },
]

module.exports  = api => {
  if(api.scripts.hasOwnProperty('make')) {
    return questions;
  }
  return [];
}