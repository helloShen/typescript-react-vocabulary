import React, {useEffect, useReducer} from 'react';
import InputField from './InputField';
import {VocabsReducer, vocabsReducer} from './Vocab';
import Cards from './Cards';
import Paper from '@mui/material/Paper';
import Footer from '../js/footer/footer';
import '../css/index.css';

const vocabsInit = [
  {id: 999999999, word: 'vocabulary', isDone: false},
  {id: 999999998, word: 'today', isDone: false},
  {id: 999999997, word: 'in', isDone: false},
  {id: 999999996, word: 'typescript', isDone: false},
  {id: 999999995, word: 'react', isDone: false},
  {id: 999999994, word: 'mui', isDone: false},
  {id: 999999993, word: 'is', isDone: false},
  {id: 999999992, word: 'awsome', isDone: false},
  {id: 999999991, word: 'happy', isDone: true},
  {id: 999999990, word: 'hacking', isDone: true},
];
export const DATA_NAME = 'vocabs';

const App: React.FC = () => {
  const [vocabs, vocabsDispatch] =
  useReducer<VocabsReducer>(
      vocabsReducer,
      ((JSON.parse(localStorage.getItem(DATA_NAME) as string)) || vocabsInit),
  );

  useEffect(() => {
    if (!localStorage.getItem(DATA_NAME)) {
      localStorage.setItem(DATA_NAME, JSON.stringify(vocabs));
    }
  }, []);

  const notDoneVocabs = vocabs.filter((v) => v.isDone === false);
  const doneVocabs = vocabs.filter((v) => v.isDone === true);

  return (
    <div className="app">
      <div className="heading">
        <div><span className="heading__logo">Vocabulary Today </span>in</div>
        <div>Typescript & React & MUI</div>
      </div>
      <InputField dispatch={vocabsDispatch}/>
      <div className="paper__container">
        <Paper className="paper notDoneSection" elevation={1}>
          <Cards
            vocabs={notDoneVocabs}
            dispatch={vocabsDispatch}
          />
          <div className="paper__label">To learn</div>
        </Paper>
      </div>
      <div className="paper__container">
        <Paper className="paper doneSection" elevation={1}>
          <Cards
            vocabs={doneVocabs}
            dispatch={vocabsDispatch}
          />
          <div className="paper__label">Learned</div>
        </Paper>
      </div>
      <Footer
        sourceCode="https://github.com/helloShen/typescript-react-vocabulary"
        githubLogo="black"
      />
    </div>
  );
};

export default App;
