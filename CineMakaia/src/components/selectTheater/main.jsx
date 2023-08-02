import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation } from 'react-router-dom';
import SelectSeat from './theaterSelect/main.jsx';
import SeatInfoExtra from './seatInfoExtra/main.jsx';

function SelectTheater({ signIn, login }) {
  const location = useLocation()
  useEffect(() => {
    //console.log(location)
  }, [])

  return (
    <>
      <Header signIn={signIn} login={login} />
      <div className='bodySeat'>
        <SelectSeat />
        <SeatInfoExtra />

      </div>

    </>
  )
}

export default SelectTheater;