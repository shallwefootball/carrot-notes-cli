#!/usr/bin/env node

import program from 'commander';
import pgk from './package.json';
import {readAllHira} from './hiragana';

program
  .version(pgk.version)
  .description('carrot notes cli');

program
  .command('add <hiragana> <explanation>')
  .description('Add hiragana with explanation')
  .action((hiragana, explanation) => {
    console.log('hiragana "%s"', hiragana);
    console.log('explanation "%s"', explanation);
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

program.parse(process.argv);

if (!program.args.length) {
  console.log('Carrot notes 🥕');
  console.log('v' + pgk.version);
}
