const inquirer = require('inquirer');
const {randomReadOne, review} = require('./hiragana');

const rememberSentence = () => {
  const {db, value} = randomReadOne();
  const question = {
    type: 'confirm',
    name: 'awareness',
    message: 'Do you remember a sentence below. \n ' +
    `"${value.hiragana}"`
  };
  return inquirer.prompt(question)
    .then(({awareness}) => {
      return review(db, value, awareness)
        .then(({interpretation}) => {
          if (awareness) {
            console.log('\n  👍  great!!');
          }else {
            console.log('\n  ✋  cheer up!!!!');
          }
          console.log(`\n  📕  - ${interpretation}`);
          return rememberSentence();
        })
    })
};

exports.rememberSentence = rememberSentence;
