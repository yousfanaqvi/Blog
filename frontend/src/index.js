import React from 'react';
import App from "./App"
// import {store,persistor} from "./store/index";
 import  Store  from './store/index';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import "./index.css"
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    // <React.StrictMode>
    <Provider store={Store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <App/>
        {/* </PersistGate> */}
    </Provider>
    /* </React.StrictMode> */
    );

