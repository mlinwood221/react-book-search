import { Detail } from './types';

export function getBookDetail(
  bookId: string
) {
  return {
    type: 'react-book-search/bookDetail/GET_BOOK_DETAIL',
    payload: {
      bookId
    }
  } as const;
}

export function bookDetailsReceived(bookDetail: Detail) {
  return {
    type: 'react-book-search/bookDetail/BOOK_DETAIL_RECEIVED',
    payload: {
      bookDetail
    }
  } as const;
}
