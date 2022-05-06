import React, {useState, useEffect, useRef} from 'react';
import Vocab, {VocabsAction} from './Vocab';
import {
  MdModeEdit,
  MdCancel,
  MdCheck,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';

export interface CardsProps {
  vocabs: Vocab[];
  dispatch: React.Dispatch<VocabsAction>;
}

const Cards: React.FC<CardsProps> = ({vocabs, dispatch}) => {
  return (
    <div className="cards">
      {
        vocabs.map((vocab: Vocab) => {
          return (
            <Card
              key={vocab.id}
              vocab={vocab}
              vocabs={vocabs}
              dispatch={dispatch}
            />
          );
        })
      }
    </div>
  );
};

interface CardProps {
  vocab: Vocab;
  vocabs: Vocab[];
  dispatch: React.Dispatch<VocabsAction>;
};

const Card: React.FC<CardProps> = ({vocab, vocabs, dispatch}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [localVocab, setLocalVocab] = useState<string>(vocab.word);
  const vocabInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    vocabInput.current?.focus();
  }, [editing]);

  function toggleEditing() {
    setEditing(!editing);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalVocab(e.target.value);
  }

  function handleSave() {
    dispatch({type: 'edit', payload: {id: vocab.id, text: localVocab}});
    toggleEditing();
  }

  const inputClasses = 'card__input' +
    ((vocab.isDone) ? ' done' : '');
  const saveClasses = 'btn card__save';
  const cancelClasses = 'btn card__cancel';
  const wordClasses = 'card__word' +
    ((vocab.isDone) ? ' done' : '');
  const isDoneClasses = 'icon card__done' +
    ((vocab.isDone) ? ' done' : '') +
    ((editing) ? ' editing' : '');
  const editClasses = 'icon card__edit';
  const deleteClasses = 'icon card__delete';

  return (
    (editing) ?
    (
      <div className="card">
        <span className={isDoneClasses}>
          <MdCheckCircle
            onClick={() => dispatch({type: 'done', payload: vocab.id})}
          />
        </span>
        <input
          ref={vocabInput}
          className={inputClasses}
          value={localVocab}
          type="text"
          // size={localVocab.length}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
        <MdCheck
          className={saveClasses}
          onClick={handleSave}
        />
        <MdClose
          className={cancelClasses}
          onClick={() => {
            toggleEditing();
            setLocalVocab(vocab.word);
          }}
        />
      </div>
    ) : (
      <div className="card">
        <span className={isDoneClasses}>
          <MdCheckCircle
            onClick={() => dispatch({type: 'done', payload: vocab.id})}
          />
        </span>
        <span className={wordClasses}>{vocab.word}</span>
        <span className={editClasses}>
          <MdModeEdit onClick={toggleEditing}/>
        </span>
        <span className={deleteClasses}>
          <MdCancel
            onClick={() => dispatch({type: 'delete', payload: vocab.id})}
          />
        </span>
      </div>
    )
  );
};

export default Cards;
