import React from 'react'
import { Container, Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap'
import Switch from 'react-bootstrap/esm/Switch'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

export default function NavBar() {
    return (
        <div style={{ width: '100%', margin: '0px', backgroundColor: '#212529' }}>
            <Container fluid>
                <div >
                    <BrowserRouter>
                        <div >
                            <Navbar bg="dark" variant="dark" >
                                <NavbarCollapse>
                                    <Nav>

                                        <Nav.Item>
                                            <button style={{ backgroundColor: 'black', border: 'black', margin: '5px' }} >
                                                <img src="../../coolicon.svg"></img>
                                            </button>

                                        </Nav.Item>
                                        <Nav.Item><Nav.Link href="/home"><p style={{ fontFamily: 'Poppins', color: "white", marginLeft: '40px' }}>Home</p></Nav.Link></Nav.Item>
                                        <Nav.Item ><Nav.Link href="/mobilePlan" ><p style={{ fontFamily: 'Poppins', color: "white", marginLeft: '40px' }}>Mobile Plan</p></Nav.Link></Nav.Item>
                                        <NavDropdown title="About" style={{ fontFamily: 'Poppins', color: "white", marginLeft: '40px' }}>
                                            <NavDropdown.Item>Company</NavDropdown.Item>
                                            <NavDropdown.Item>Team</NavDropdown.Item>
                                            <NavDropdown.Item>Contact</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </NavbarCollapse>
                            </Navbar>
                            <br></br>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/Home" />
                            </Route>
                            <Route exact path="/mobilePlan">

                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Container>
        </div>
    )
}

