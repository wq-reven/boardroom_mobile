import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import RouterC from "./router";
import { Provider} from "mobx-react";
import stores from "./store/";
import registerServiceWorker from './registerServiceWorker';
const { ...storesArray } = stores;


ReactDOM.render(
    <Provider {...storesArray}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
