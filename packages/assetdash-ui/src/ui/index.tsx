import React from 'react';
import {render} from 'react-dom';
import App from './react/App';
import './styles/index.sass';
import {ServiceContext} from './react/hooks/useServices';
import { createServices } from './react/services';

render(
  (<ServiceContext.Provider value={createServices()}>
    <App/>
  </ServiceContext.Provider>),
  document.getElementById('app')
);
