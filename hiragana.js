const path = require('path');
const lowdb = require('lowdb');
const moment = require('moment');
const fileAsync = require('lowdb/lib/storages/file-async');
const random = require('lodash/random');
const dataPath = path.resolve(path.join(__dirname, './data/hira.json'));
const hiraData = lowdb(dataPath, {storage: fileAsync});

const read = () => {
  const db = hiraData.get('hira');
  return {
    db,
    values: db.value()
  };
};

const readAllHira = () => {
  const {values} = read();
  return values.map(({hiragana}) => {
    return hiragana
  });
};

const randomReadOne = () => {
  const {db, values} = read();
  const lastIndex = values.length;
  const randomIndex = random(lastIndex - 1);
  return {db, value: values[randomIndex]}
};

const write = argObj => {
  hiraData
    .get('hira')
    .push(argObj)
    .write()
    .then(() => {
      console.log('added word 💽');
    });
};

const review = (db, value, {awareness}) => {
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

exports.read = read;
exports.readAllHira = readAllHira;
exports.randomReadOne = randomReadOne;
exports.write = write;
exports.review = review;