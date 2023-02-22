import React from 'react';
import App from "./App"
import  Store  from './store/index';
import { Provider } from "react-redux";

import "./index.css"
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    <Provider store={Store}>
            <App/>
    </Provider>
    );

