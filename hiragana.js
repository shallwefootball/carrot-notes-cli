import lowdb from 'lowdb';
const hiraData = lowdb('./hira.json');

export const read = () => {
  return hiraData.getState();
};

export const readAllHira = () => {
  return read().map(({hiragana}) => {
    return hiragana
  });
};
