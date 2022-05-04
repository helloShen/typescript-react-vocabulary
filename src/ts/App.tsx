import React, {useState} from 'react';
import InputField from './InputField';
import {Vocab} from './model';
import Cards from './Cards';
import '../css/index.css';

let next = 0;
const App: React.FC = () => {
  const [vocab, setVocab] = useState<string>('');
  const [vocabs, setVocabs] = useState<Vocab[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (vocab) {
      setVocabs([
        ...vocabs,
        {id: next, word: vocab, isDone: false},
      ]);
      next += 1;
      setVocab('');
    }
  };

  return (
    <div className="app">
      <span className="heading">VOCAB</span>
      <InputField
        vocab={vocab}
        setVocab={setVocab}
        handleAdd={handleAdd}
      />
      <Cards vocabs={vocabs} />
    </div>
  );
};

export default App;
