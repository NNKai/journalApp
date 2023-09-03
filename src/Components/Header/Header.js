import React from 'react';
import { auth } from '../../firebase'; // Import Firebase authentication
import './Header.scss';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../Redux/Reducer';

// const Header = ({authenicated}) => {
//   // Function to handle sign-out
//   const navigate = useNavigate()

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         navigate('/login')
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };

//   return (
//     <div className='header'>
      
//     </div>
//   );
// };

// export default Header;



function Header({authenicated}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser()); // Dispatch the sign-out action
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className=" mb-3 header" bg='dark' variant='dark'>
          <Container>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        
              <div className='header-content'>
                <span> {authenicated ? "Logged in as :" + auth.currentUser.displayName : <>Welcome to my Site</>}</span>
                <button onClick={handleSignOut}>{authenicated ? "Sign Out" : "Sign In Below"}</button>
              </div>
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          
        </Navbar>
      ))}
      
    </>
  );
}

export default Header;