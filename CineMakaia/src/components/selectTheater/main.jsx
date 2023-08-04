import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import { useLocation } from 'react-router-dom';
import SelectSeatTheater from './theaterSelect/main.jsx';
import SeatInfoExtra from './seatInfoExtra/main.jsx';

function SelectTheater({ signIn, login }) {
  const location = useLocation()
  const maxSeat = location.state[2].adult + location.state[2].child + location.state[2].grand;
  const [actualSeat, setActualSeat] = useState(0)
  const [seatId, setSeatId] = useState([])
  useEffect(() => {
    console.log(location)
    console.log("asientos maximos: ", maxSeat)
    console.log("asientos actuales: ", actualSeat)
    console.log(seatId)
  }, [actualSeat])

  return (
    <>
      <Header signIn={signIn} login={login} />
      <div className='bodySeat'>
        <SelectSeatTheater actualSeat={actualSeat} setActualSeat={setActualSeat} seatId={seatId} setSeatId={setSeatId} />
        <SeatInfoExtra actualSeat={actualSeat} setActualSeat={setActualSeat} seatId={seatId} />

      </div>

    </>
  )
}

export default SelectTheater;