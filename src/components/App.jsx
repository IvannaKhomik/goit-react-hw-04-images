import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container } from './App.styled';
import { Modal } from './Modal';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [largeImgUrl, setLargeImgUrl] = useState(null);
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);

  const onSetLargeImgUrl = (image, tag) => {
    setLargeImgUrl(image);
    setTag(tag);
  };
  return (
    <Container>
      <Searchbar searchByQuery={setQuery} setPage={setPage} />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
        }}
      />
      <ImageGallery
        onSetLargeImgUrl={onSetLargeImgUrl}
        query={query}
        page={page}
        setPage={setPage}
      />
      {largeImgUrl && (
        <Modal
          url={largeImgUrl}
          tag={tag}
          onCloseModal={() => setLargeImgUrl(null)}
        />
      )}
    </Container>
  );
};
