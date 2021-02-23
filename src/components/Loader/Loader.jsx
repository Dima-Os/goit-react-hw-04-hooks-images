import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';
const PuffLoader = () => {
  return (
    <div className={s.loader}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
      Loading ...
    </div>
  );
};

export default PuffLoader;
