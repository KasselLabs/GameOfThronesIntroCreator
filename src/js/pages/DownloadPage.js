import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectContext from 'react-context-connector';

import Loader from '../download/Loader';
import { fetchStatus } from '../api/queueApi';
import PendingStatus from '../download/PendingStatus';
import RenderingOrBumpedStatus from '../download/RenderingOrBumpedStatus';
import RenderedStatus from '../download/RenderedStatus';
import DownloadPageContainer from '../download/DownloadPageContainer';
import OpeningProvider from '../common/OpeningProvider';

class DownloadPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    clearOpening: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      isLoading: true,
      error: null,
    };
  }

  componentDidMount = async () => {
    await this._loadDownloadStatus();
  }

  componentDidUpdate = async (prevProps) => {
    const { openingKey } = this.props.match.params;
    const prevOpeningKey = prevProps.match.params.openingKey;

    const openingKeyChanged = prevOpeningKey !== openingKey;

    if (openingKeyChanged) {
      this.setState({ isLoading: true });
      await this._loadDownloadStatus();
      this.props.clearOpening();
    }
  }

  _loadDownloadStatus = async () => {
    const { match: { params } } = this.props;
    const { openingKey } = params;

    try {
      const status = await fetchStatus(openingKey);
      this.setState({ isLoading: false, status });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { isLoading, status = {}, error } = this.state;

    const isNotQueued = 'not_queued' === status.status;
    const isQueued = 'queued' === status.status;
    const isPending = isQueued || isNotQueued;

    const isBumped = 'bumped' === status.status;
    const isRendering = 'rendering' === status.status;
    const isRenderingOrBumped = isRendering || isBumped;

    const isRendered = 'rendered' === status.status;

    if (error) {
      throw error;
    }

    return (
      <DownloadPageContainer>
        {isLoading && (<div className="center-content"><Loader /></div>)}
        {isPending && <PendingStatus status={status} />}
        {isRenderingOrBumped && <RenderingOrBumpedStatus status={status} />}
        {isRendered && <RenderedStatus status={status} />}
      </DownloadPageContainer>

    );
  }
}

const mapOpeningProviderToProps = context => ({
  clearOpening: context.clearOpening,
});

const connectOpeningProvider = connectContext(OpeningProvider, mapOpeningProviderToProps);

export default connectOpeningProvider(DownloadPage);
