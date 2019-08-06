import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import backIcon from 'material-design-icons/navigation/svg/production/ic_arrow_back_18px.svg';
import { Detail } from '../../redux/bookDetail/types';
import './BookDetail.scss';

type Props = {
  bookDetail: Detail;
  goBack: () => void;
};

dayjs.extend(relativeTime);

const BookDetail = ({ bookDetail, goBack }: Props) => {
  const [relativeDate, setRelativeDate] = useState('');
  useEffect(() => {
    setRelativeDate(dayjs(bookDetail.published).fromNow());
  }, [bookDetail.published]);

  return (
    <article className="book-detail">
      <nav className="book-detail__nav">
        <button onClick={goBack} className="book-detail__back-button">
          <svg viewBox={backIcon.viewBox} className="book-detail__icon">
            <use xlinkHref={`#${backIcon.id}`} />
          </svg>
        </button>
      </nav>
      <header className="book-detail__header">
        <h1 className="book-detail__title">{bookDetail.name}</h1>
        <p className="book-detail__info">
          <div>{bookDetail.author.name}</div>
          <div>{relativeDate}</div>
          <div>{bookDetail.likes} likes</div>
        </p>
      </header>
      <div className="book-detail__content">
        <p>{bookDetail.description}</p>
        <p>{bookDetail.introduction}</p>
      </div>
      <footer className="book-detail__footer">
        <div>
          <img src={bookDetail.author.avatar} />
        </div>
      </footer>
    </article>
  );
};

export default BookDetail;
