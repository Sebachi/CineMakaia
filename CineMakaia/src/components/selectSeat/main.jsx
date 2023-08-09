import { useEffect, useState } from 'react';
import Header from '../header/main.jsx';
import "./main.scss";
import SeatInfo from './seatInfo/main.jsx'
import FuncionInfo from './functionInfo/main.jsx'



function SelectSeat({ signIn, login }) {
  const [childTicket, setChildTicket] = useState(0)
  const [adultTicket, setAdultTicket] = useState(0)
  const [grandTicket, setGrandTicket] = useState(0)

  const [totalTicketPrice, setTotalTicketPrice] = useState(0)
  const [totalTicketAmount, setTotalTicketAmount] = useState(0)

  const baseChild = 30
  const baseAdult = 40
  const baseGrand = 50

  useEffect(() => {
    setTotalTicketPrice((baseChild * childTicket) + (baseAdult * adultTicket) + (baseGrand * grandTicket))
    setTotalTicketAmount(childTicket + adultTicket + grandTicket)
    //console.log(totalTicketPrice)
    //console.log(totalTicketAmount)
  }, [childTicket, adultTicket, grandTicket])

  return (
    <>
      <Header signIn={signIn} login={login} />
      <div className='bodySeat'>
        <SeatInfo childTicket={childTicket} setChildTicket={setChildTicket} adultTicket={adultTicket} setAdultTicket={setAdultTicket} grandTicket={grandTicket} setGrandTicket={setGrandTicket} baseChild={baseChild} baseAdult={baseAdult} baseGrand={baseGrand} />
        <FuncionInfo totalTicketPrice={totalTicketPrice} totalTicketAmount={totalTicketAmount} childTicket={childTicket} adultTicket={adultTicket} grandTicket={grandTicket} />
      </div>
    </>
  )
}

export default SelectSeat;