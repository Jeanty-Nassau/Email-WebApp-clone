import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Mail from './Mail'
import EmailList from './EmailList'
import SendMail from './SendMail'
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { selectUser } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice';
import { useEffect } from 'react';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      }
    });
  },[]);


  return (
    <Router>
      {!user ? (<Login />) :
        (
          <div className="app">
            <Header />

            <div className='app-body'>
              <Sidebar />
              <Routes>
                <Route path='/mail' element={<Mail />} />
                <Route path='/' element={<EmailList />} />
              </Routes>
            </div>
            {sendMessageIsOpen && <SendMail />}
          </div>
        )}

    </Router>
  );
}

export default App;
//5:55:33
