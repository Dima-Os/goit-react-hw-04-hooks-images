import React, { Component } from 'react';

import s from './App.module.css';

import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import imageFinderAPI from './services/imageFinderAPI';
import PuffLoader from './components/Loader';
import Button from './components/Button';

export default class App extends Component {
  state = {
    userQuery: '',
    images: [],
    currentPage: 1,
    error: null,
    showModal: false,
    largeImageURL: '',
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userQuery !== this.state.userQuery) {
      this.fetchImages();
    }
  }
  fetchImages = () => {
    this.setState({ isLoading: true });
    imageFinderAPI
      .getImages(this.state.userQuery, this.state.currentPage)
      .then(({ hits, total }) => {
        if (total === 0) {
          throw new Error(
            `По запросу ${this.state.userQuery} ничего не найдено!`,
          );
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: 'smooth',
        });
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(this.setState({ isLoading: false }));
  };
  getUserQuery = userInput => {
    this.setState({
      userQuery: userInput,
      images: [],
      currentPage: 1,
      error: null,
    });
  };
  onClickImage = largeImageURL => {
    this.togleModal();
    this.setState({ largeImageURL: largeImageURL });
  };
  togleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmitHandler={this.getUserQuery} />
        {this.state.isLoading && <PuffLoader />}
        {this.state.error && <h1>{this.state.error}</h1>}
        {this.state.images.length > 0 && (
          <ImageGallery>
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                onCLick={this.onClickImage}
              />
            ))}
          </ImageGallery>
        )}
        {this.state.showModal && (
          <Modal URL={this.state.largeImageURL} togleModal={this.togleModal} />
        )}
        {this.state.images.length > 0 && (
          <Button onClickHandler={this.fetchImages} />
        )}
      </div>
    );
  }
}
