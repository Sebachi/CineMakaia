import dayjs from 'dayjs';

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

export const getDaysArray = () => {
  const daysArray = [];
  const today = dayjs(); // Obtener la fecha actual

  // Agregar el día actual al array
  daysArray.push({
    dayNumber: today.date(),
    dayName: getDayNameAbbreviated(today.format('dddd')),
    month: today.format('MMMM'),
    year: today.year()
  });

  // Agregar los siguientes 4 días al array
  for (let i = 1; i <= 4; i++) {
    const nextDay = today.add(i, 'day');
    daysArray.push({
      dayNumber: nextDay.date(),
      dayName: getDayNameAbbreviated(nextDay.format('dddd')),
      month: nextDay.format('MMMM'),
      year: nextDay.year()
    });
  }

  return daysArray;
};