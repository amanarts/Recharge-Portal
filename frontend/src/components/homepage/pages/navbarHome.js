import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiAbstract030 } from 'react-icons/gi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { HomeButton } from './homeButton';
import './navbarHome.css';
import { IconContext } from 'react-icons/lib'

function NavbarHome() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };
    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <div className="navbar-container container">
                        <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                            <GiAbstract030 className="navbar-icon" />
                            PS Portal
                        </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>Contact Us</Link>
                            </li>
                            <li className='nav-btn'>
                                {
                                    button ? (
                                        <Link to='/login' className="btn-link">
                                            <HomeButton buttonStyle='btn--outline'>Login</HomeButton>
                                        </Link>
                                    ) : (
                                        <Link to='/login' className="btn-link" onClick={closeMobileMenu}>
                                            <HomeButton buttonStyle='btn--outline' buttonSize='btn--mobile'>Login</HomeButton>
                                        </Link>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default NavbarHome
