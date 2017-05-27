#!/usr/bin/env node

import program from 'commander';
import inquirer from 'inquirer';
import moment from 'moment';
import pgk from './package.json';
import {readAllHira, randomReadOne, write, review} from './hiragana';

program
  .version(pgk.version)
  .description('carrot notes cli');

program
  .command('add <hiragana> <interpretation>')
  .description('Add hiragana with interpretation')
  .action((hiragana, interpretation) => {
    write({
      hiragana,
      interpretation,
      created: moment().toString(),
      reviews: []
    });
  });

program
  .command('kanji <kanji> <hiragana> <definition>')
  .description('Add kanji with definition')
  .action((kanji, hiragana, definition) => {
    console.log('kanji "%s"', kanji);
    console.log('hiragana "%s"', hiragana);
    console.log('definition "%s"', definition);
  });

program
  .command('list').alias('ls')
  .action(() => {
    readAllHira().map(hira => {
      console.log(`${hira}`);
    })
  });

program
  .command('review').alias('re')
  .action(() => {
    const {db, value} = randomReadOne();
    const question = {
      type: 'confirm',
      name: 'awareness',
      message: 'Do you remember a sentence below. \n ' +
      `"${value.hiragana}"`
    };
    inquirer.prompt(question)
      .then(awareness => {
        review(db, value, awareness);
      });
  });

program.parse(process.argv);

if (!program.args.length) {
  console.log('Carrot notes 🥕');
  console.log('v' + pgk.version);
}
