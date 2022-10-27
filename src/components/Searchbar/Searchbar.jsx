import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { Header, SearchForm, SearchBtn, SearchField } from './Searchbar.styled';

export const Searchbar = ({ searchByQuery }) => {
  const [query, setQuery] = useState('');

  const onInputChange = e => {
    const { value } = e.currentTarget;
    setQuery(value.toLowerCase());
  };

  const onSubmitBtn = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please, type the title of image you want to find');
    }
    searchByQuery(query);
    setQuery('');
  };

  return (
    <>
      <Header>
        <SearchForm onSubmit={onSubmitBtn}>
          <SearchBtn type="submit">
            <BsSearch />
          </SearchBtn>

          <SearchField
            onChange={onInputChange}
            value={query}
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    </>
  );
};
