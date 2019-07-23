import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageContainer from './common/PageContainer';

import { errorImageUrl, errorImageAlt } from './api/config';


class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <PageContainer>
          <div className="box-page error-boundary">
            <div className="box" >
              <h1 className="title">ERROR</h1>
              <img
                src={errorImageUrl}
                alt={errorImageAlt}
              />
              <p>We&apos;re sorry — something&apos;s gone wrong.</p>
              <p>
                Please try to reload the page.
                If the problem persists, please fill the report with more
                information so we can help you as soon as possible.
              </p>
              <div className="center-content horizontal">
                <button className="button small-medium" onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>Report</button>
                <button className="button small-medium" style={{ marginLeft: '20px' }} onClick={() => window.location.reload()}>Reload page</button>
              </div>
            </div>
          </div>
        </PageContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
