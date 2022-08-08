import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage'
import WishListProfilePage from './Pages/WishListProfilePage';
import SingleWishListPage from './Pages/SingleWishListPage';
import SignedOutErrorPage from './Pages/SignedOutErrorPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Server/firebase-config';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({});  

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser); 
  }); 

  if (user){
    return(
      <Router>
        <div className="App">
          <Routes>
            <Route path='/profile/:id' element={<WishListProfilePage userToken={user.uid} />}/>
            <Route path='/wlist/:id' element={<SingleWishListPage loggedInUser={user.uid} />}/>
          </Routes>
        </div>
      </Router>
    )
  }

  return (
      <Router>  
        <div className="app">
          <Routes>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='*' element={<SignedOutErrorPage />}/>
          </Routes>
        </div>
      </Router>
      
  );
}

export default App;
