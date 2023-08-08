import React from 'react'
import Carousel from './carousel/main'
import "./main.scss"
import TopNav from './nav/main'

function Header({isHome, signIn, login}) {
  return (
    <section className='header'>
        <TopNav isHome={isHome} signIn={signIn} login={login}/>
        <Carousel/>
    </section>
  )
}

export default Header