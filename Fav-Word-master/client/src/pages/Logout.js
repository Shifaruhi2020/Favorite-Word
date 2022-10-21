import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate=useNavigate();
    navigate('/')
    localStorage.clear();
  
}

export default Logout;