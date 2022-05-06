import {DATA_NAME} from './App';

interface Vocab {
  id: number;
  word: string;
  isDone: boolean;
}

export type VocabsAction =
  | {type: 'add', payload: string}
  | {type: 'edit', payload: {id: number, text: string}}
  | {type: 'delete', payload: number}
  | {type: 'done', payload: number};
export type VocabsReducer = (vocabs: Vocab[], action: VocabsAction) => Vocab[];

let next = 0;
export const vocabsReducer: VocabsReducer = (vocabs, action) => {
  switch (action.type) {
    case 'add':
      if (action.payload) {
        const addResult = [
          ...vocabs,
          {id: next++, word: action.payload, isDone: false},
        ];
        localStorage.setItem(DATA_NAME, JSON.stringify(addResult));
        return addResult;
      }
    case 'edit':
      const data = action.payload as {id: number, text: string};
      const editResult = vocabs.map((v) => {
        return (v.id === data.id) ?
          {...v, word: data.text} : v;
      });
      localStorage.setItem(DATA_NAME, JSON.stringify(editResult));
      return editResult;
    case 'delete':
      const deleteResult = vocabs.filter((v) => v.id !== action.payload);
      localStorage.setItem(DATA_NAME, JSON.stringify(deleteResult));
      return deleteResult;
    case 'done':
      const doneResult = vocabs.map((v) => {
        return (v.id === action.payload) ? {...v, isDone: !v.isDone} : v;
      });
      localStorage.setItem(DATA_NAME, JSON.stringify(doneResult));
      return doneResult;
    default:
      throw new Error();
  }
};

export default Vocab;
