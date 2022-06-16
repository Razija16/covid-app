import React, { useState, useEffect, useContext } from 'react';
import SignUp from './screens/signup';
import Login from './screens/login';
import { BrowserRouter, Route, Routes, HashRouter, Link } from "react-router-dom";
import UserProfile from './screens/userProfile';
import CaseDayInfo from './screens/caseDayInfo';
import InterventionsInfo from './screens/interventionsInfo';
import UserContext from './context';
import NotFound from './screens/notFound';
import Form from './screens/form';
import AdminPatients from './screens/admin/patients';
import UsersInfo from "./screens/admin/patientInfo"
import Team from "./screens/admin/team"
import TeamInfo from "./screens/admin/teamInfo"
import AdminPanel from './screens/admin';
import AdminIntervention from "./screens/admin/intervention"
import AdminInterventionInfo from "./screens/admin/interventionInfo"
import { UserContextProvider } from "./context/index"

export default function App() {

  return (
    <HashRouter basename='/'>
      <UserContextProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />}>
            <Route path='/admin/' element={<AdminPatients />} />
            <Route path='/admin/patient/:id' element={<UsersInfo />} />
            <Route path='/admin/team' element={<Team />} />
            <Route path='/admin/team/:id' element={<TeamInfo />} />
            <Route path='/admin/intervention' element={<AdminIntervention />} />
            <Route path='/admin/intervention/:id/:casedayId' element={<AdminInterventionInfo />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/form' element={<Form />} />
          <Route path='/case-day/:id' element={<CaseDayInfo />} />
          <Route path='/intervention/:id/:casedayId' element={<InterventionsInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </HashRouter>
  )
}
