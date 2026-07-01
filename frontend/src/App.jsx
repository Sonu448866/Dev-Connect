import "./index.css";
import Login from "./components/Login";
import Body from "./components/Body";
import Feed from "./components/Feed";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Signup from "./components/Signup";

import ReceivedRequests from "./components/ReceivedRequests";
import Connections from "./components/Connections";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              //children Routes
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/" element={<Feed />}></Route>
              <Route
                path="/getReceivedRequests"
                element={<ReceivedRequests />}
              ></Route>
              <Route
                path="/getAllConnections"
                element={<Connections />}
              ></Route>
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
