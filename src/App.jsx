import { useState, useEffect } from 'react';

import s from './App.module.css';

import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import imageFinderAPI from './services/imageFinderAPI';
import PuffLoader from './components/Loader';
import Button from './components/Button';

export default function App() {
  const [userQuery, setUserQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getUserQuery = userInput => {
    setUserQuery(userInput);
    setImages('');
    setCurrentPage(1);
    setError(null);
  };
  const onClickImage = largeImageURL => {
    setShowModal(prevState => !prevState);
    setLargeImageURL(largeImageURL);
  };

  useEffect(() => {
    if (userQuery === '') {
      return;
    }
    setIsLoading(true);
    const fetchImages = () => {
      imageFinderAPI
        .getImages(userQuery, currentPage)
        .then(({ hits, total }) => {
          if (total === 0) {
            throw new Error(`По запросу ${userQuery} ничего не найдено!`);
          }
          setImages(prevImg => [...prevImg, ...hits]);
          window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => setError(error.message))
        .finally(setIsLoading(false));
    };
    fetchImages();
  }, [userQuery, currentPage]);

  return (
    <div className={s.App}>
      <Searchbar onSubmitHandler={getUserQuery} />
      {isLoading && <PuffLoader />}
      {error && <h1>{error}</h1>}
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onCLick={onClickImage}
            />
          ))}
        </ImageGallery>
      )}
      {showModal && (
        <Modal
          URL={largeImageURL}
          togleModal={() => {
            setShowModal(prevState => !prevState);
          }}
        />
      )}
      {images.length > 0 && (
        <Button
          onClickHandler={() => {
            setCurrentPage(prevPage => prevPage + 1);
          }}
        />
      )}
    </div>
  );
}
