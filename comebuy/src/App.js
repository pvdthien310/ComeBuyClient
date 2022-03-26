
import './App.css';
import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { currentUser, loading_user,messageError } from './redux/selectors';
import {login } from './redux/slices/accountSlice';

function App() {
  const [, forceRerender] = useState();
  const dispatch = useDispatch()
  const _currentUser = useSelector(currentUser)
  const _loadingUser = useSelector(loading_user)
  const _messageError = useSelector(messageError)

  return (
    <div>
      <button onClick={() => dispatch(login({ email: "pvdthien@gmail.com", password: "123456" }))}>
        Login
      </button>
      <div>
        {
          _loadingUser? <p>loading.....</p> :
            <div> <p> {_currentUser.email != 'test.com' && !_loadingUser ? _currentUser.email : _messageError}</p>
            </div>
        }
      </div>
      <p>aaaaaa</p>
    </div>
  );
}

export default App;
