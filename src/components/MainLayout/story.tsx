/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import MainLayout from './index';
import BookList from '../BookList';
import SearchForm from '../SearchForm';
import Pagination from '../Pagination';
import { Book } from '../../redux/books/types';

function getDateForDaysAgo(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}

function getBooks(count: number): Book[] {
  return Array.from({ length: count }, (v, idx) => ({
    author: { avatar: 'http://picsum.photos/250/250/', name: `Author ${idx}` },
    cover: 'http://picsum.photos/500/700/',
    description: `Book ${idx} description`,
    genre: { category: 'Non-Fiction', name: 'History' },
    id: idx.toString(),
    introduction: 'intro',
    likes: idx,
    name: `Book ${idx} description`,
    published: getDateForDaysAgo(idx).toISOString()
  }));
}

function getSearchParams(count: number) {
  return Array.from({ length: count }, (v, idx) => ({
    id: idx,
    label: `Item ${String.fromCharCode(97 + (idx % 26)).repeat(idx / 26 + 1)}`
  }));
}

storiesOf('Layouts|MainLayout', module)
  .add('default', () => (
    <MainLayout
      bookList={
        <BookList
          books={getBooks(25)}
          onBookClick={action('handleBookClick')}
          onBookLike={action('handleBookLike')}
        />
      }
      searchForm={
        <SearchForm
          search={action('handleSearch')}
          selectedCategory="selected category"
          selectedGenre="selected genre"
          selectedQuery="selected query"
          availableCategories={getSearchParams(2)}
          availableGenres={getSearchParams(5)}
        />
      }
      pagination={
        <Pagination currentPage={3} pageCount={6} showPage={action('showPage')} />
      }
      loadingBooks={false}
    />
  ))
  .add('loading', () => (
    <MainLayout
      bookList={
        <BookList
          books={getBooks(25)}
          onBookClick={action('handleBookClick')}
          onBookLike={action('handleBookLike')}
        />
      }
      searchForm={
        <SearchForm
          search={action('handleSearch')}
          selectedCategory="selected category"
          selectedGenre="selected genre"
          selectedQuery="selected query"
          availableCategories={getSearchParams(2)}
          availableGenres={getSearchParams(5)}
        />
      }
      pagination={
        <Pagination currentPage={3} pageCount={6} showPage={action('showPage')} />
      }
      loadingBooks={true}
    />
  ))
  .add('with error', () => (
    <MainLayout
      bookList={
        <BookList
          books={getBooks(25)}
          onBookClick={action('handleBookClick')}
          onBookLike={action('handleBookLike')}
        />
      }
      searchForm={
        <SearchForm
          search={action('handleSearch')}
          selectedCategory="selected category"
          selectedGenre="selected genre"
          selectedQuery="selected query"
          availableCategories={getSearchParams(2)}
          availableGenres={getSearchParams(5)}
        />
      }
      pagination={
        <Pagination currentPage={3} pageCount={6} showPage={action('showPage')} />
      }
      error="This is the error message"
      loadingBooks={false}
    />
  ));
