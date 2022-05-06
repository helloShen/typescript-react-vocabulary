import React, {useState, useRef} from 'react';
import {VocabsAction} from './Vocab';
import Button from '@mui/material/Button';

interface InputFieldProps {
  dispatch: React.Dispatch<VocabsAction>;
}

const InputField: React.FC<InputFieldProps> = ({
  dispatch,
}) => {
  const [vocab, setVocab] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVocab(e.target.value);
  };

  return (
    <form
      className="inputForm"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({type: 'add', payload: vocab});
        setVocab('');
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a vocabulary"
        name="vocab"
        className="inputForm__input"
        value={vocab}
        onChange={handleChange}
      />
      <Button
        className="inputForm__submit"
        variant="contained"
        type="submit"
      >Go</Button>
    </form>
  );
};

export default InputField;
