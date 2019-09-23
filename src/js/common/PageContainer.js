import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const PageContainer = ({ children }) => (
  <div className="page-container">
    <div className="background-image" />
    <NavBar />
    <div className="center-content">
      <h1 className="app-title">GAME OF THRONES INTRO CREATOR</h1>
      <div>
        {children}
      </div>
    </div>
    <div className="share-buttons">
      <a href="http://www.facebook.com/sharer.php?u=https://gameofthronesintrocreator.kassellabs.io/" target="_blank" rel="noopener noreferrer">
        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" width="40" />
      </a>
      <a href="https://twitter.com/share?url=https://gameofthronesintrocreator.kassellabs.io/&amp;text=Check%20out%20the%20Game%20of%20Thrones%20Intro%20Creator!&amp;hashtags=GameOfThrones,KasselLabs" target="_blank" rel="noopener noreferrer">
        <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" width="40" />
      </a>
      <a href="https://www.producthunt.com/posts/game-of-thrones-intro-creator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-game-of-thrones-intro-creator" target="_blank" rel="noopener noreferrer">
        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=168012" alt="Game of Thrones Intro Creator - Create a Game of Thrones intro video | Product Hunt Embed" style={{ width: '191px', height: '41px' }} width="250px" height="54px" />
      </a>
    </div>
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
