import logo from './logo.svg';
import Listview from './pages/Listview.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Detailedview from './pages/Detailedview.js'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>

        <Route 
        path='/'
        element={<Navigate replace to = '/signUp' />}
        />

        <Route path='/login' element={<Login />}/>

        <Route path='/signUp' element={<Signup />}/>

        <Route path='/movies' element={<Listview />}/>

        <Route path='/movie/:id' element={<Detailedview />}/>

      </Routes>
    </Router>
  );
}

export default App;
