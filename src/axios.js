import axios from 'axios';

const communicator = axios.create({
    baseUrl: "http://localhost:8080/"
})

export default communicator;