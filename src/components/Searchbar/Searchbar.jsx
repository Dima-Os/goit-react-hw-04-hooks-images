import { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmitHandler }) {
  const [userInput, setUserInput] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmitHandler(userInput);
    setUserInput('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onFormSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={userInput}
          onChange={e => {
            setUserInput(e.currentTarget.value);
          }}
        />
      </form>
    </header>
  );
}
