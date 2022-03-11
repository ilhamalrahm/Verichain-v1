import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Userpage from './Pages/Userpage';
import Signin_user from './Pages/UserSignin';
import Signin_org from './Pages/OrgSignin';
import Orgpage from './Pages/Organisationpage';
import Landing from './Pages/Landingpage';
import UserSignUp from './Pages/UserSignUp';
import OrgSignup from './Pages/OrgSignup';
import {useCheckUser} from './useCheckUser';
import {useCheckOrg} from './useCheckOrg';
import {UserContext} from './UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function App() {


  const {user,setUser}=useCheckUser();
  const {org,setOrg}= useCheckOrg();


 
  return (
   <div className="App">
    <Router>
    <UserContext.Provider value={{user,setUser,org,setOrg}}>
      <Routes>
        <Route path="/user" element={<Userpage/>}/>
        <Route path="/signin_user" element={<Signin_user/>}/>
        <Route path="/signin_org" element={<Signin_org/>}/>
        <Route path="/company" element={<Orgpage/>}/>
        <Route path="/signup_stud" element={<UserSignUp/>}/>
        <Route path="/signup_org" element={<OrgSignup/>}/>

        <Route path="/" element={<Landing/>}/>


      </Routes>
      </UserContext.Provider>
    </Router>

    </div>
     
   
  );
}

export default App;
