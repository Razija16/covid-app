import React, { useState, useEffect } from 'react';
import SignUp from './screens/signup';
import Login from './screens/login';
import { BrowserRouter, Route, Routes, HashRouter, Link } from "react-router-dom";
import UserProfile from './screens/userProfile';
import CaseDayInfo from './screens/caseDayInfo';
import InterventionsInfo from './screens/interventionsInfo';
import UserContext from './context';
import NotFound from './screens/notFound';

export default function App() {

  console.log("Cordova:", window.cordova)
  // if (window.cordova") Router = HashRouter;

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_id: null,
    caseId: null
  })

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/case-day/:id' element={<CaseDayInfo />} />
          <Route path='/intervention/:id/:casedayId' element={<InterventionsInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  )
}
