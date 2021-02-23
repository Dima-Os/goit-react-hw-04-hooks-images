import React, { Component } from 'react';
import s from './Searchbar.module.css';
class Searchbar extends Component {
  state = { userInput: '' };
  onChangHandler = e => {
    const inputted = e.currentTarget.value;
    this.setState({ userInput: inputted });
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmitHandler(this.state.userInput);
    this.setState({ userInput: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onFormSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.userInput}
            onChange={this.onChangHandler}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
