import React, { useState } from 'react';
import menuIcon from '@mdi/svg/svg/menu.svg';
import searchIcon from '@mdi/svg/svg/magnify.svg';
import searchCloseIcon from '@mdi/svg/svg/magnify-close.svg';
import Info from '../Info';
import Loading from '../Loading';
import Toolbar from '../Toolbar';
import ErrorMessage from '../ErrorMessage';
import SvgButton from '../SvgButton';
import './style.scss';

type Props = {
  loadingBooks: boolean;
  error?: string;
  bookList: React.ReactElement;
  searchForm: React.ReactElement;
  pagination: React.ReactElement;
};

const MainLayout = (props: Props) => {
  const [searchVisible, setSearchVisible] = useState();

  const handleMenuClick = () => {
    console.log('menu click!');
  };

  const toggleSeach = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <Toolbar icon={menuIcon} title="Book Search" onMenuClick={handleMenuClick}>
        <SvgButton
          invertedColor
          icon={searchVisible ? searchCloseIcon : searchIcon}
          onClick={toggleSeach}
        />
      </Toolbar>
      <div className="main-layout">
        <div className="main-layout__status">
          {props.loadingBooks && <Loading />}
          {props.error && <ErrorMessage message={props.error} />}
        </div>
        <div className="main-layout__books">{props.bookList}</div>
        <div
          className={`main-layout__search ${
            searchVisible ? 'main-layout__search--visible' : ''
          }`}
        >
          {props.searchForm}
        </div>
        <div className="main-layout__pagination">{props.pagination}</div>
        <div className="main-layout__info">
          <Info />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
