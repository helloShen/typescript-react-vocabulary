import React from 'react';

interface InputFieldProps {
  vocab: string;
  setVocab: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  vocab,
  setVocab,
  handleAdd,
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVocab(e.target.value);
  };

  return (
    <form
      className="input"
      onSubmit={handleAdd}
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
