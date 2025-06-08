import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Home from "./pages/home/home";
import { auth } from "./services/firebaseConfig";
import { useState } from "react";
import Account from "./pages/account/Account";

function App() {
  const [userOn, setUserOn] = useState(false)
  
  onAuthStateChanged(auth, (user)=> {
    user ? setUserOn(true) : console.log('Offline')
  })  

  return userOn ? <Account/> : <Home/>;
}

export default App;
