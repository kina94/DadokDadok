import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import '@fortawesome/fontawesome-free/js/all.js'
import MainContainer from './views/MainContainer';

function App({ userRepository, authService, bookRepository}) {

<<<<<<< HEAD
  window.onresize = function() {
=======
  useEffect(()=>{
>>>>>>> 171c1ae3f6ab346e5e8c5dd4d1fe502d54641806
    document.querySelector('.app').style.height=window.innerHeight+'px';
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService}/>}/>
          <Route path="/home/*" element={<MainContainer
          authService={authService}
          userRepository={userRepository}
          bookRepository={bookRepository}/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
