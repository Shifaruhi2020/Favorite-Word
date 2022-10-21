import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Searchfilter from './Searchfilter';
import Logout from './pages/Logout';
import Home from './Home';
import Subscribe from './pages/Subscribe'
import ProtectedRoutes from '/Users/ar-sadiyya.fayaz/sanavi project2/client/src/components/Protectedroutes.jsx'

function App() {
  return (
    <div className="App">
      <Router> 
        <Navbar/>
        <Routes>   
         {/* <Route path="/" element={<Home/>}/>      */}
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Registration/>}/>
        <Route path="/logout" element={<Logout/>}/>
        {/* <Route path="/search" element={<Searchfilter/>}/>
        <Route path="/subscribe" element={<Subscribe/>}/> */}
        <Route element={<ProtectedRoutes/>}>
        <Route path="/search" element={<Searchfilter/>}/>
        <Route path="/subscribe" element={<Subscribe/>}/>
        </Route>

      </Routes> 
      </Router>       
    </div>
  );
}

export default App;
