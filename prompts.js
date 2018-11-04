const questions = [
  {
    type: 'confirm',
    name: 'vueStructure',
    message: 'Use Vue Structure?'
  },
]

module.exports  = api => {
  if(api.scripts.hasOwnProperty('make')) {
    return questions;
  }
  return [];
}