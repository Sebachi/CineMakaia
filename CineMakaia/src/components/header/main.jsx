import React from 'react'
import Carousel from './carousel/main'
import "./main.scss"
import TopNav from './nav/main'

function Header() {
  return (
    <section className='header'>
        <TopNav/>
        <Carousel/>
    </section>
  )
}

export default Header