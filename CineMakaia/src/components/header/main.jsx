import React from 'react'
import Carousel from './carousel/main'
import "./main.scss"
import TopNav from './nav/main'

function Header({isHome}) {
  return (
    <section className='header'>
        <TopNav isHome={isHome}/>
        <Carousel/>
    </section>
  )
}

export default Header