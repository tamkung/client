import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

// import "antd/dist/antd.css";
// import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// ตัวรวม Reducer (index)
import rootReducer from "./components/reducers/index";

// Route
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
   // <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
         {/* basename="/reactproject" */}
         <App />
      </BrowserRouter>
   </Provider>,
   // </React.StrictMode>,
   document.getElementById("root")
);
