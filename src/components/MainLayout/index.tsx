import React from 'react';
import menuIcon from '@mdi/svg/svg/menu.svg';
import Info from '../Info';
import Loading from '../Loading';
import Toolbar from '../Toolbar';
import './style.scss';

type Props = {
  loadingBooks: boolean;
  error?: string;
  bookList: React.ReactElement;
  searchForm: React.ReactElement;
  pagination: React.ReactElement;
};

const MainLayout = (props: Props) => {
  const handleMenuClick = () => {
    alert('Click');
  };

  return (
    <>
      <Toolbar icon={menuIcon} title="Book Search" onMenuClick={handleMenuClick} />
      <div className="main-layout">
        <div className="main-layout__status">
          {props.loadingBooks && <Loading />}
          {props.error && <h2>{props.error}</h2>}
        </div>
        <div className="main-layout__books">{props.bookList}</div>
        <div className="main-layout__search">{props.searchForm}</div>
        <div className="main-layout__pagination">{props.pagination}</div>
        <div className="main-layout__info">
          <Info />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
