import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';

import PageContainer from '../common/PageContainer';
import OpeningForm from '../OpeningForm';
import LoadingLayer from '../common/LoadingLayer';

import OpeningProvider from '../common/OpeningProvider';

class EditPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    loadOpening: PropTypes.func,
    opening: PropTypes.object,
    openingKey: PropTypes.string,
    history: PropTypes.object,
  };

  state = {
    isLoading: true,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const hasOpeningKeyChanged = nextProps.match.params.openingKey !== nextProps.openingKey;
    if (hasOpeningKeyChanged) {
      return {
        isLoading: true,
      };
    }

    if (!hasOpeningKeyChanged && prevState.isLoading) {
      return {
        isLoading: false,
      };
    }
    return null;
  }

  componentDidMount = async () => {
    const {
      match,
      history,
      loadOpening,
      opening,
    } = this.props;
    if (!opening) {
      const { openingKey } = match.params;
      await loadOpening(openingKey, history);
    }
  }

  componentDidUpdate = async (prevProps) => {
    const { loadOpening, history } = this.props;
    const { openingKey } = this.props.match.params;
    const prevOpeningKey = prevProps.match.params.openingKey;

    const openingKeyChanged = prevOpeningKey !== openingKey;

    if (openingKeyChanged) {
      await loadOpening(openingKey, history);
    }
  }

  render() {
    const { opening } = this.props;
    const { isLoading } = this.state;

    return (
      <PageContainer>
        <LoadingLayer isLoading={isLoading} />

        {opening &&
          <OpeningForm
            showDownloadButton
          />
        }

      </PageContainer>
    );
  }
}

const mapOpeningProviderToProps = context => ({
  loadOpening: context.loadOpening,
  opening: context.opening,
  openingKey: context.key,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default withRouter(connectOpeningProvider(EditPage));
