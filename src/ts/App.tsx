import React, {useReducer} from 'react';
import InputField from './InputField';
import Vocab, {VocabsReducer, vocabsReducer} from './Vocab';
import Cards from './Cards';
import '../css/index.css';

const App: React.FC = () => {
  const [vocabs, vocabsDispatch] = useReducer<VocabsReducer>(vocabsReducer, []);

  return (
    <div className="app">
      <span className="heading">VOCAB</span>
      <InputField dispatch={vocabsDispatch}/>
      <Cards
        vocabs={vocabs}
        dispatch={vocabsDispatch}
      />
    </div>
  );
};

export default App;
