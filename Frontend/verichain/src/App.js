import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Userpage from './Pages/Userpage';
import Signin from './Pages/UserSignin';
import {useCheckUser} from './useCheckUser';
import {UserContext} from './UserContext';


function App() {

  const {user,setUser}=useCheckUser();
  return (
   <div className="App">
    <Router>
    <UserContext.Provider value={{user,setUser}}>
      <Routes>
        <Route path="/user" element={<Userpage/>}/>
        <Route path="/signin" element={<Signin/>}/>

      </Routes>
      </UserContext.Provider>
    </Router>

    </div>
     
   
  );
}

export default App;
