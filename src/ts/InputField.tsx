import React, {useState, useRef} from 'react';
import {VocabsAction} from './Vocab';

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
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({type: 'add', payload: vocab});
        setVocab('');
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        placeholder="Enter a vocabulary"
        name="vocab"
        className="input__box"
        value={vocab}
        onChange={handleChange}
      />
      <button
        className="input__submit"
        type="submit"
      >Go</button>
    </form>
  );
};

export default InputField;
