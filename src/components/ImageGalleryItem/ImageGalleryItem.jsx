import s from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, largeImageURL, onCLick }) => {
  return (
    <li
      className={s.item}
      onClick={() => {
        onCLick(largeImageURL);
      }}
    >
      <img src={webformatURL} alt="" className={s.itemImage} />
    </li>
  );
};
export default ImageGalleryItem;
