import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import Router from "./routes/Router";
import store, { history } from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
