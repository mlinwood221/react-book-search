import React, { Component, StrictMode } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { bindActionCreators, Dispatch as ReduxDispatch } from 'redux';
import reducer, { actions, selectors, epic } from '../../redux/bookDetail';
import { Detail } from '../../redux/bookDetail/types';
import { State } from '../../redux/store';
import { RouteParams, RouteModule } from './types';
import BookDetail from '../../components/BookDetail';
import Loading from '../../components/Loading';

type StateProps = {
  bookDetail: Detail | null;
  loading: boolean;
};

type ActionProps = {
  actions: typeof actions;
};

type OwnProps = {
  bookId: string | null;
};

export class DetailRoute extends Component<StateProps & ActionProps & OwnProps & RouteComponentProps> {
  componentDidMount() {
    if (
      this.props.bookId &&
      (!this.props.bookDetail || this.props.bookDetail.id !== this.props.bookId)
    )
      this.props.actions.getBookDetail(this.props.bookId);
  }

  render() {
    return (
      <StrictMode>
        {this.props.loading && <Loading />}
        {this.props.bookDetail && (
          <BookDetail
            goBack={this.props.history.goBack}
            bookDetail={this.props.bookDetail}
          />
        )}
      </StrictMode>
    );
  }
}

function mapStateToProps(
  state: State,
  routeProps: RouteComponentProps
): StateProps & OwnProps {
  const bookDetail = selectors(state) || null;
  const loading = state.details ? state.details.loading : false;
  return {
    bookDetail,
    loading,
    bookId: (routeProps.match.params as RouteParams).bookId
  };
}

function mapDispatchToProps(dispatch: ReduxDispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailRoute)
);

export const routeModule: Omit<RouteModule, 'state'> = {
  routeName: 'details',
  epic,
  reducer
};
