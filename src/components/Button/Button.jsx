import s from './Button.module.css';

const Button = ({ onClickHandler }) => {
  return (
    <button type="button" onClick={onClickHandler} className={s.button}>
      Load more
    </button>
  );
};
export default Button;
