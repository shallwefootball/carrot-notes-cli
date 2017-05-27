import lowdb from 'lowdb';
import moment from 'moment';
import fileAsync from 'lowdb/lib/storages/file-async';
import random from 'lodash/random';
const hiraData = lowdb('./data/hira.json', {storage: fileAsync});

export const read = () => {
  const db = hiraData.get('hira');
  return {
    db,
    values: db.value()
  };
};

export const readAllHira = () => {
  const {values} = read();
  return values.map(({hiragana}) => {
    return hiragana
  });
};

export const randomReadOne = () => {
  const {db, values} = read();
  const lastIndex = values.length;
  const randomIndex = random(lastIndex - 1);
  return {db, value: values[randomIndex]}
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

export const review = (db, value, {awareness}) => {
  const result = db.find(value);
  const reviewed = result.value().reviews
    .push({
      data: moment().toString(),
      awareness
    });
  result
    .assign(reviewed)
    .write();
};