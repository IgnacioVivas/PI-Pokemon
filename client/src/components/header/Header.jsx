// import { Link } from 'react-router-dom';
import banner from '../../images/pikachu.jpg';
import './header.scss';
import imgPlus from '../../images/add-circle-line.svg';
import Search from './search/Search';
import NavBar from '../navBar/NavBar';
import Filters from '../filters/Filters';
import imgHamburguer from '../../images/menu-3-line.svg';
import imgClose from '../../images/close-line.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  const openMenu = () => {
    if (document.getElementById('menu')) {
      if (showMobileMenu === true) {
        console.log('entro');
        document.querySelector('#menu').style.left = '0px';
      } else {
        document.querySelector('#menu').style.left = '-1000px';
      }
    }
  };

  return (
    <>
      <div id='header'>
        <div id='menu-container'>
          <div id='menu-wrapper'>
            <div onClick={() => setShowMobileMenu(!showMobileMenu)} id='iconmenu'>
              {showMobileMenu ? (
                <img src={imgHamburguer} alt='' onClick={openMenu} />
              ) : (
                <img src={imgClose} alt='' onClick={openMenu} />
              )}
            </div>
          </div>
        </div>
        <div id='img-more-container'>
          <Link to={`/create-pokemon`}>
            <img src={imgPlus} alt='' />
          </Link>
        </div>
        <div id='search-container'>
          <h1>search for your favorite pokemon</h1>
          <Search />
        </div>
        <div id='img-container'>
          <img src={banner} alt='' />
        </div>
        <div id='filters'>
          <Filters />
        </div>
        <div id='menu'>
          <NavBar />
        </div>
      </div>
    </>
  );
}
export default Header;
