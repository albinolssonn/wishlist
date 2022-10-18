import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage'
import WishlistPage from './Pages/WishlistPage';
import WishlistProductsPage from './Pages/WishlistProductsPage';
import SignedOutErrorPage from './Pages/SignedOutErrorPage';
import SignedInErrorPage from './Pages/SignedInErrorPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Server/firebase-config';
import { useState } from 'react';
import SharedListPage from './Pages/SharedListPage';

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
            <Route path='/profile/:id' element={<WishlistPage userToken={user.uid} />}/>
            <Route path='/wlist/:id' element={<WishlistProductsPage loggedInUser={user.uid} />}/>
            <Route path='*' element={<SignedInErrorPage />}/>
            <Route path='/u/:user/wl/:id' element={<SharedListPage />}/>
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
            <Route path='/u/:user/wl/:id' element={<SharedListPage />}/>

          </Routes>
        </div>
      </Router>
      
  );
}

export default App;
