import lowdb from 'lowdb';
import random from 'lodash/random';
const hiraData = lowdb('./hira.json');

export const read = () => {
  return hiraData.getState();
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
