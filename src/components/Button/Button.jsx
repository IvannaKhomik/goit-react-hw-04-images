import React from 'react';
import { LoadBtn } from './Button.styled';

export const Button = ({ onClickLoadBtn }) => {
  return (
    <LoadBtn type="button" onClick={onClickLoadBtn}>
      Load more
    </LoadBtn>
  );
};
