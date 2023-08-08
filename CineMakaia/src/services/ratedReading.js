

export const ratedReader = (rated)=>{
    switch (rated) {
        case "G":
            return "Apto para todo público";
        
        case "PG":
            return "Recomendada para mayores de 7 años";

        case "PG-13":
            return "Recomendada para mayores de 13 años";

        case "R":
            return "Menores de edad sólo con un adulto";

        case "NC-17":
            return "No apto para menores";

        default:
            return "Clasificación no reconocida";
    }

}