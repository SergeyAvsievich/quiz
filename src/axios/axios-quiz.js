import axios from "axios"

export default axios.create({
    baseURL: 'https://quizes-5245c-default-rtdb.europe-west1.firebasedatabase.app/'
})