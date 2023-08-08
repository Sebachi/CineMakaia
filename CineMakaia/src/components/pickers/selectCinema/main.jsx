import "./main.scss"

import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { css } from '@emotion/react'

export default function SelectCinema() {
  const cinemaLocalstorage = JSON.parse(localStorage.getItem("cinemaSelected")) || false
  const [cinema, setCinema] = cinemaLocalstorage? React.useState(cinemaLocalstorage) :  React.useState("Los Molinos")
  
  React.useEffect(() => {
    localStorage.setItem("cinemaSelected", JSON.stringify(cinema))
  }, [cinema])


  const handleChange = (event) => {
    setCinema(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={cinema}
         
          onChange={handleChange}
          sx={css`
          height: 30px;
          max-width: 130px;
          width: 18vw;
          min-width: 90px;
          padding-left: 5px;
          &:hover{
            & .MuiSvgIcon-root{
                fill: #0098BC;
                transform: scale(1.1);
              }
          }
          & .MuiSvgIcon-root{
            height:  calc(20px + 0.5vw);
            max-height: 24px;
            fill: #094891;
          }
          & .MuiInputBase-root{
           padding-left: 5px;
          }
          & .MuiSelect-nativeInput{
            display:none;
          }
          `}
        >
          <MenuItem value={"Los Molinos"}>Los Molinos</MenuItem>
          <MenuItem value={"Viva Envigado"}>Viva Envigado</MenuItem>
          <MenuItem value={"Vizcaya"}>Vizcaya</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}