import React, {useState, useEffect, useRef} from 'react';
import Vocab, {VocabsAction} from './Vocab';
import {MdModeEdit} from 'react-icons/md';
import {MdOutlineDelete} from 'react-icons/md';
import {MdOutlineDone} from 'react-icons/md';

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

  const saveClasses = 'btn card__save';
  const cancelClasses = 'btn card__cancel';
  const wordClasses = 'card__word' +
    ((vocab.isDone) ? ' done' : '');
  const isDoneClasses = 'icon card__isdone' +
    ((vocab.isDone) ? ' done' : '');
  const editClasses = 'icon card__edit';
  const deleteClasses = 'icon card__delete';

  return (
    (editing) ?
    (
      <div className="card">
        <input
          ref={vocabInput}
          className={wordClasses}
          value={localVocab}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
        <button
          className={saveClasses}
          onClick={handleSave}
        >Save</button>
        <button
          className={cancelClasses}
          onClick={toggleEditing}
        >Cancel</button>
      </div>
    ) : (
      <div className="card">
        <span className={wordClasses}>{vocab.word}</span>
        <span className={isDoneClasses}>
          <MdOutlineDone
            onClick={() => dispatch({type: 'done', payload: vocab.id})}
          />
        </span>
        <span className={editClasses}>
          <MdModeEdit onClick={toggleEditing}/>
        </span>
        <span className={deleteClasses}>
          <MdOutlineDelete
            onClick={() => dispatch({type: 'delete', payload: vocab.id})}
          />
        </span>
      </div>
    )
  );
};

export default Cards;
