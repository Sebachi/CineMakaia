import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import SeatInfo from './seatInfo/main.jsx'
import FuncionInfo from './functionInfo/main.jsx'



function SelectSeat({ signIn, login }) {

  return (
    <>
      <Header signIn={signIn} login={login} />
      <div className='bodySeat'>
        <SeatInfo />
        <FuncionInfo />
      </div>
    </>
  )
}

export default SelectSeat;