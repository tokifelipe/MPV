import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from '../assets/logo.png'


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/dashboard">
                    <img
                        alt="..."
                        src={AppLogo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Reunion Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink
                          className={({ isActive }) => `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}
                          to='/dashboard'
                        >
                          Home
                        </NavLink>
                        <NavLink
                          className={({ isActive }) => `nav-bar__link ${isActive ? 'nav-bar__link--active' : ''}`}
                          to='/plan'
                        >
                          Reuniones
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;