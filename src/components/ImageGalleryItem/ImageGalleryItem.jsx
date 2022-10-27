import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tags, onSetLargeImgUrl }) => {
  return (
    <>
      <GalleryItem>
        <GalleryImg onClick={onSetLargeImgUrl} src={url} alt={tags} />
      </GalleryItem>
    </>
  );
};
