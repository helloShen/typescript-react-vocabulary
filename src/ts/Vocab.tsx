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
        return [
          ...vocabs,
          {id: next++, word: action.payload, isDone: false},
        ];
      }
    case 'edit':
      const data = action.payload as {id: number, text: string};
      return vocabs.map((v) => {
        return (v.id === data.id) ?
          {...v, word: data.text} : v;
      });
    case 'delete':
      return vocabs.filter((v) => v.id !== action.payload);
    case 'done':
      return vocabs.map((v) => {
        return (v.id === action.payload) ? {...v, isDone: !v.isDone} : v;
      });
    default:
      throw new Error();
  }
};

export default Vocab;
