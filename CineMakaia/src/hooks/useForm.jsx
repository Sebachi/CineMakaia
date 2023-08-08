import { useState } from "react";

const useForm = (initialState = {}) =>{
const [dataForm, setdataForm] = useState(initialState);
const handleChange = (event) =>{
    const {name, value} = event.target;
    setdataForm({...dataForm, [name]: value})
}
const resetForm = () => {
    setdataForm(initialState);
}
return [dataForm, handleChange, resetForm ];
}
export default useForm;