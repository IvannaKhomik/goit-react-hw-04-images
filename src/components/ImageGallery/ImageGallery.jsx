import React, { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Gallery, Error } from './ImageGallery.styled';
import { Loader } from '../Loader';
import { getImages } from '../../requests';

export const ImageGallery = ({ query, onSetLargeImgUrl }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    setPage(1);
    setStatus('pending');
    getImages(query)
      .then(res => onFirstTimeLoad(res.hits))
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setLoad(true);
    getImages(query, page)
      .then(res => onLoadMoreImages(res.hits))
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page]);

  const onFirstTimeLoad = data => {
    setImages(data);
    setStatus('resolved');
  };

  const onLoadMoreImages = data => {
    setImages(images => [...images, ...data]);
    setLoad(false);
    setStatus('resolved');
  };

  const onClickLoadBtn = () => {
    setPage(page => page + 1);
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <Error>{error.message}</Error>;
  }

  if (status === 'resolved') {
    const noResults = images.length === 0;
    const noMoreImages = images.length / (12 * page) < 1;
    return noResults ? (
      <Error> Sorry, we couldn't find a match for your search.</Error>
    ) : (
      <>
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              tags={tags}
              onSetLargeImgUrl={() => onSetLargeImgUrl(largeImageURL, tags)}
            />
          ))}
        </Gallery>
        {load && <Loader />}
        {!noMoreImages && <Button onClickLoadBtn={onClickLoadBtn} />}
      </>
    );
  }
};
