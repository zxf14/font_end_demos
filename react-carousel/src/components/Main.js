require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/carousel.css');

import React from 'react';
import Carousel from './Carousel';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <Carousel/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
