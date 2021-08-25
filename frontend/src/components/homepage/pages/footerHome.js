import React from 'react';
import './footerHome.css';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

function FooterHome() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>

          
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to={{ pathname:"https://www.facebook.com/PublicisSapient/"}}
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to={{ pathname:"https://www.instagram.com/publicissapient/"}}
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={{ pathname:"https://www.youtube.com/channel/UCqDal2iXO02gy5rNyhOmiwQ"}}
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
            <Link
              className='social-icon-link'
              to={{ pathname:"https://twitter.com/PublicisSapient"}}
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to={{ pathname:"https://www.linkedin.com/company/publicissapient"}}
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FooterHome;