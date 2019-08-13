import React, { useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import favoriteIcon from '@mdi/svg/svg/heart.svg';
import favoriteBorderIcon from '@mdi/svg/svg/heart-outline.svg';
import calendarIcon from '@mdi/svg/svg/calendar-clock.svg';
import { Book } from '../../redux/books/types';
import TextWithIcon from '../TextWithIcon';
import './style.scss';

type Props = {
  book: Book;
  onViewDetails: (book: Book) => void;
  onLike: (book: Book) => void;
};

dayjs.extend(relativeTime);

const BookCard = ({ onViewDetails, onLike, book }: Props) => {
  const handleViewDetails = useCallback(() => {
    onViewDetails(book);
  }, [onViewDetails, book]);

  const handleLike = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onLike(book);
    },
    [onLike, book]
  );

  const [relativeDate, setRelativeDate] = useState('');
  useEffect(() => {
    setRelativeDate(dayjs(book.published).fromNow());
  }, [book.published]);

  return (
    <div
      className="book-card"
      style={{ backgroundImage: `url(${book.cover})` }}
      onClick={handleViewDetails}
    >
      <div className="book-card__header">
        <div className="book-card__title">{book.name}</div>
        <div className="book-card__author">{book.author.name}</div>
      </div>
      <div className="book-card__actions">
        <div className="book-card__action" onClick={handleLike} data-testid="like-button">
          <TextWithIcon
            icon={book.liked ? favoriteIcon : favoriteBorderIcon}
            text={`${book.likes} ${book.likes > 1 ? 'likes' : 'like'}`}
          />
        </div>
        <div className="book-card__action book-card__action--align-right book-card__action--no-click">
          <TextWithIcon
            data-testid="relative-date"
            icon={calendarIcon}
            text={relativeDate}
          />
        </div>
      </div>
    </div>
  );
};

BookCard.displayName = 'BookCard';

export default React.memo(BookCard);
