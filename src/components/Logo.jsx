import React from 'react';
import image from 'media/logo.png';

const Logo = () => {
  return (
      <>
        <img className='mx-auto h-40 w-auto mt-8 mb-4' src={image} alt='App Icon' />
        <hr className="bg-black block w-full h-0.5 mb-8 opacity-75"/>
      </>
  )
};

export default Logo;
