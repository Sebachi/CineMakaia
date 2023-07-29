import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./main.scss";
import dayjs from "dayjs";
import { useState } from "react";
import { css } from "@emotion/react";

export default function DatePickerAdmin() {
  const valueLocalstorage = localStorage.getItem("dateAdmin") || false;
  const [value, setValue] = valueLocalstorage
    ? useState(dayjs(valueLocalstorage))
    : useState(dayjs());
  React.useEffect(() => {
    localStorage.setItem("dateAdmin", value);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          views={["day", "month", "year"]}
          format="DD/MM/YYYY"
          className="picker_admin"
          disablePast={true}
          sx={css`
            border-radius: 5px;
            height: 30px;
            margin: 0;
            padding: 0px;
            &:hover {
              border: 1px #03203a solid;
            }
            & .MuiInputBase-root {
              height: 100%;
              width: 100%;
              padding: 0;

              & .MuiInputBase-input {
                height: 100%;

                font-size: calc(5px + 0.6vw);
                font-weight: 500;
                padding: 0;
                padding-left: 10px;
              }
            }

            & .MuiInputAdornment-root {
              height: 100%;
              width: auto;
              & .MuiButtonBase-root {
                & .MuiSvgIcon-root {
                  fill: #094891;
                  &:hover {
                    transform: scale(1.1);
                    fill: #0098bc;
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
