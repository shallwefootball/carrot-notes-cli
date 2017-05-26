import lowdb from 'lowdb';
import fileAsync from 'lowdb/lib/storages/file-async';
import random from 'lodash/random';
const hiraData = lowdb('./hira.json', {storage: fileAsync});

export const read = () => {
  return hiraData.get('hira').value();
};

export const readAllHira = () => {
  return read().map(({hiragana}) => {
    return hiragana
  });
};

export const randomReadOne = () => {
  const lastIndex = read().length;
  const randomIndex = random(lastIndex - 1);
  return read()[randomIndex];
};

export const write = argObj => {
  hiraData
    .get('hira')
    .push(argObj)
    .write()
    .then(() => {
      console.log('added word 💽');
    });
};