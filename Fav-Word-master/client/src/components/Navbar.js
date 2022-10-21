
import React, { useEffect,useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';



 
const Navbar = () => {
	

	const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
	useEffect(() => {
	  (async () => {
		const loggedIn = localStorage.getItem('user')
		if (loggedIn) setnavbarUserIsLogged(true);
	  })();
	}, [navbarUserIsLogged]);
    
	const handleLogout = () => {
		
			localStorage.clear();
			setnavbarUserIsLogged(false);
	
	  };

const handleLogin=()=>{
		const loggedIn = localStorage.getItem('user')
		if(loggedIn) setnavbarUserIsLogged(true)
	
	  }


		

	
return (
	<>
	<Nav>
		<NavLink to='/'>
     		<h1 className='logo'>WORD SUBSCRIBER</h1>
		</NavLink>
		 <Bars/>
		<NavMenu>
			{/* <NavLink to='/' activeStyle>
				Home
			</NavLink> */}
			{/* <NavLink onClick={home} to='/contact' activeStyle>
				Contact
			</NavLink>
			<NavLink onClick={home} to='/main' activeStyle>
                    Book
                </NavLink> */}
			{navbarUserIsLogged===true?
        	<>
				{/* <NavLink onClick={home} to='/history' activeStyle>
					Purchase History
				</NavLink> */}
                <NavLink to='/search'onClick={handleLogin} activeStyle>
					Search
				</NavLink>
				<NavLink to='/subscribe'onClick={handleLogin} activeStyle>
					Subscriptions
				</NavLink>
        		<NavLink onClick={handleLogout} to='/logout' activeStyle>
					Logout
				</NavLink>
					
				
		
        		

        </>:<>
        		<NavLink to='/Register'onClick={handleLogin} activeStyle>
					Sign Up
				</NavLink>
        		<NavBtn>
				<NavBtnLink to='/' onClick={handleLogin}>Sign In</NavBtnLink>
				</NavBtn>

        </>
        		}
				</NavMenu>

		
	</Nav>
	</>
);
};

export default Navbar;