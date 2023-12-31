import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./main.scss";
import dayjs from "dayjs";
import { useState } from "react";
import { css } from '@emotion/react'


export default function BasicDatePicker() {
  const valueLocalstorage = localStorage.getItem("dateFunction") || false
  const initialValue = valueLocalstorage
  ? dayjs(valueLocalstorage, "DD/MM/YYYY")
  : dayjs(); 

  const [value, setValue] =  useState(initialValue)
  React.useEffect(() => {
    console.log(value);
    const dateLocal = dayjs(value).format("DD/MM/YYYY");

    localStorage.setItem("dateFunction", dateLocal)
  }, [value])



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker value={value} onChange={(newValue) => {setValue(newValue)}} 
        views={["day","month", "year"]}
        format="DD/MM/YYYY"
        className="picker"
        disablePast={true}
        sx={css`

        border-radius: 5px;
        height: 30px;
        margin: 0;
         padding: 0px;
         max-width: 130px;
         width: 18vw;
       overflow-x: hidden !important;
        &:hover{
          border: 1px #03203A solid;
        }
        & .MuiInputBase-root{
          height: 100%; 
          width: 100%;
          padding: 0;
          
          & .MuiInputBase-input {
            height: 100%;
            width: 70%;
            font-size: calc(5px + 0.6vw);
            font-weight: 500;
            padding: 0;
            padding-left: 10px;
           
          }
        }

       & .MuiInputAdornment-root{
          height:100%;
          width: auto;
        & .MuiButtonBase-root{
          
          height: 20px;
          width: 30%;
          & .MuiSvgIcon-root{
            height:  calc(12px + 0.5vw);
            max-height: 16px;
            fill: #094891;
            &:hover{
              transform: scale(1.1);
              fill: #0098BC;
            }
          }
        }
      }
      `}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
