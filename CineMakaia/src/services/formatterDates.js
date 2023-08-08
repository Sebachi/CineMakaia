// Fecha en formato "2023-05-31" con guiones

export const formatterDate = (date) => {
const originalDate = date;

// Dividir la fecha en partes (año, mes, día)
const datePart = originalDate.split("-");

// Crear la nueva fecha en el formato deseado "31/05/2023"
const newDate = datePart[2] + "/" + datePart[1] + "/" + datePart[0];
return newDate
}