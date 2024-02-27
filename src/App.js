import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "animate.css";
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import TokenService from "./services/token.service";
import { UserService } from "./services/user.service";
import { axiosInstance } from "./common/AxiosInstance";
import TimeoutAuthModal from "./components/modals/TimeoutAuthModal";

const HomePage = React.lazy(() => import("./views/HomePage"));
const UserProfile = React.lazy(() => import("./views/UserProfile"));
const Profile = React.lazy(() => import("./views/Profile"));
const UserDashboard = React.lazy(() => import("./views/UserDashboard"));
const UserPhotoGallery = React.lazy(() => import("./views/UserPhotoGallery"));
const NewMatches = React.lazy(() => import("./views/NewMatches"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const [userLogin, setUserLogin] = useState(true)
  const [showTimoutModal, setShowTimoutModal] = useState(false);

  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
    if (error.response && error.response.status === 401) {
      setShowTimoutModal(true);
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    const user = TokenService.getUser()

    if (user?.jwt) {
      setUserLogin(true)
    } else {
      logOut()
    }
  }, [])

  const logOut = () => {
    UserService.logout()
    setUserLogin(false)
    // change status
  }
  
  return (
    <>
     <div>
      {showTimoutModal && <TimeoutAuthModal open={showTimoutModal} />}
    </div>
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          {/* <Route
          exact
          path="/register"
          name="Register Page"
          element={userLogin ? <Register /> : <Login />}
        />
        <Route
          exact
          path="/#/organizers"
          name="Login Page"
          element={userLogin ? <OrganizersPage /> : <Login />}
        />
        <Route
          exact
          path="/#/voters"
          name="Login Page"
          element={userLogin ? <VotersPage /> : <Login />}
        />
        <Route
          exact
          path="/#/reports"
          name="Reports Page"
          element={userLogin ? <ReportsPage /> : <Login />}
        /> */}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          <Route
            exact
            path="/user/photos"
            name="User Gallery Page"
            element={userLogin ?  <UserPhotoGallery /> : <HomePage />}
          />
          <Route
            exact
            path="/user/myprofile"
            name="User Profile Page"
            element={userLogin ? <UserProfile />: <HomePage />}
          />
          <Route
            exact
            path="/user/profile/:ref"
            name="Profile Page"
            element={userLogin ? <Profile />: <HomePage />}
          />
          <Route
            exact
            path="/user/dashboard"
            name="User Dashboard Page"
            element={userLogin ? <UserDashboard />: <HomePage />}
          />
          <Route
            exact
            path="/user/newmatches"
            name="User New Matches Page"
            element={userLogin ? <NewMatches />: <HomePage />}
          />
          <Route path="/" name="Home" element={<HomePage />} />
        </Routes>
      </Suspense>
    </HashRouter>
    </>
  );
}

export default App;
