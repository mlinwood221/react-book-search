import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import backIcon from '@mdi/svg/svg/arrow-left.svg';
import authorIcon from '@mdi/svg/svg/account.svg';
import calendarIcon from '@mdi/svg/svg/calendar-clock.svg';
import favoriteIcon from '@mdi/svg/svg/heart.svg';
import tagIcon from '@mdi/svg/svg/tag-multiple.svg';
import Toolbar from '../Toolbar';
import { Detail } from '../../redux/bookDetail/types';
import TextWithIcon from '../TextWithIcon';
import './style.scss';

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
    <>
      <Toolbar icon={backIcon} title={bookDetail.name} onMenuClick={goBack} />
      <article className="book-detail">
        <img className="book-detail__image" src={bookDetail.cover} />

        <div className="book-detail__status">
          <TextWithIcon icon={authorIcon} text={bookDetail.author.name} />
          <TextWithIcon icon={calendarIcon} text={relativeDate} />
          <TextWithIcon icon={favoriteIcon} text={`${bookDetail.likes} likes`} />
          <TextWithIcon
            icon={tagIcon}
            text={`${bookDetail.genre.category} / ${bookDetail.genre.name}`}
          />
        </div>

        <div className="book-detail__description">
          <p>{bookDetail.description}</p>
          <p>{bookDetail.introduction}</p>
        </div>

        <footer className="book-detail__footer">
          <img src={bookDetail.author.avatar} className="book-detail__author-img" />
          <p>Written by {bookDetail.author.name}</p>
        </footer>
      </article>
    </>
  );
};

export default BookDetail;
