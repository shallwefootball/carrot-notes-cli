const commander = require('commander');

commander
  .arguments('<cmd> [hiragana] [korean]')
  .option('-k, --kanji <kanji>', 'Add Kanji')
  .option('-a --kata <kata>', 'Add Katakana')
  .action(function (cmd) {
    console.log('cmd  : ', cmd);

    cmdValue
  })
  .parse(process.argv);

// console.log('commander : ', commander);

console.log('commander.hira : %j: ', commander.cmd);
console.log('commander.hira : %j: ', commander.hiragana);


// -h -hira
// -k -ko
// --kanji
// --kata


// carrot add わたしわ　나는 -
// carrot review -r

