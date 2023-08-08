import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

// Función para obtener el nombre abreviado en español de un día de la semana
const getDayNameAbbreviated = (dayName) => {
  const daysMap = {
    Sunday: 'dom',
    Monday: 'lun',
    Tuesday: 'mar',
    Wednesday: 'mié',
    Thursday: 'jue',
    Friday: 'vie',
    Saturday: 'sáb',
  };
  return daysMap[dayName] || dayName;
};

const useDaysArray = (selectedDay) => {
  const [daysArray, setDaysArray] = useState([]);

  useEffect(() => {
    const today = dayjs(selectedDay); // Obtener la fecha actual basada en el estado "selectedDay"

    const newDaysArray = [];

    // Agregar el día actual al array
    newDaysArray.push({
      dayNumber: today.date(),
      month: today.format('MMMM'),
      year: today.year(),
      dayName: getDayNameAbbreviated(today.format('dddd')),
      date: today.toDate(), // Propiedad que contiene la fecha
    });

    // Agregar los siguientes 4 días al array
    for (let i = 1; i <= 4; i++) {
      const nextDay = today.add(i, 'day');
      newDaysArray.push({
        dayNumber: nextDay.date(),
        month: nextDay.format('MMMM'),
        year: nextDay.year(),
        dayName: getDayNameAbbreviated(nextDay.format('dddd')),
        date: nextDay.toDate(), // Propiedad que contiene la fecha
      });
    }

    setDaysArray(newDaysArray);
  }, [selectedDay]);

  return daysArray;
};

export default useDaysArray;