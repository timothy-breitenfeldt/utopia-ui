/* eslint-disable */

import jquery from 'jquery';
window.$ = window.jQuery=jquery;


import React from 'react';
import ReactDom from 'react-dom';

import {App} from './components/app.js';

ReactDom.render((
      <App />
), document.getElementById('app'));
