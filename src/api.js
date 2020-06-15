import axios from 'axios'

class Api {
    constructor(url) {
        this.url = url
    }

    get(id) {
        return axios.get(this.url+id).then(respuesta => respuesta.data)
    }

    getAll() {
        return axios.get(this.url).then(respuesta => respuesta.data)
    }

    post(datos) {
        return axios.post(this.url,datos).then(respuesta => respuesta.data)
    }

    put(id,datos) {
        return axios.put(this.url+id,datos).then(respuesta => respuesta.data)
    }

    delete(id) {
        return axios.delete(this.url+id).then(respuesta => respuesta.data)
    }
}

export default Api