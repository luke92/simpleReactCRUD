import React from 'react'
import './Formulario.css'
import Api from '../api'
import TablaUsuarios from './TablaUsuarios'
import TablaDomicilios from './TablaDomicilios'

const URL = 'https://5c8ef17a3e557700145e85c7.mockapi.io/form/'
const URL_JAVA = 'http://localhost:8080/api/domicilios/'


const api = new Api(URL)
const apiJava = new Api(URL_JAVA)


class Formulario extends React.Component {

    state = {
        datos : {
            nombre : '',
            edad: ''
        },
        dirty: {
            nombre: false,
            edad: false
        },
        deshabilitar : false,
        usuarios: [],
        domicilios: []
    }

    componentDidMount() {
        this.getUsuarios()
        this.getDomicilios()
    }

    /* --------------- */
    /* API Rest : GET  */
    /* --------------- */
    async getDomicilios() {
        try {
            /* POST */
            let dato = {
                numero: 123,
                calle: "Lavalle 2",
                localidad: "Capital 2"
            }
            let rta = await apiJava.post(dato)
            console.log('getDomicilios apiJava POST', rta)

            /* PUT */
            dato = {
                numero: 321,
                calle: "Lavalle 3",
                localidad: "Capital 3"
            }
            rta = await apiJava.put(9, dato)
            console.log('getDomicilios apiJava PUT', rta)

            /* DELETE */
            rta = await apiJava.delete(3)
            console.log('getDomicilios apiJava DELETE', rta)

            /* GET */
            rta = await apiJava.get(2)
            console.log('getDomicilios apiJava GET', rta)

            /* GET ALL */
            let datos = await apiJava.getAll()
            console.log('getDomicilios apiJava GET ALL', datos)
            this.setState({domicilios: datos})
        }
        catch(error) {
            console.log('Error getDomicilios', error)
        }
    }

    /* --------------- */
    /* API Rest : GET  */
    /* --------------- */
    async getUsuarios() {

        try {
            /* let datos = await apiJava.getAll()
            console.log('getUsuarios apiJava', datos) */
            let datos = await api.getAll()
            console.log('getUsuarios api', datos)
            this.setState({usuarios: datos})
        }
        catch(error) {
            console.log('Error getUsuarios', error)
        }
    }

    /* --------------- */
    /* API Rest : POST */
    /* --------------- */
    async enviar(e) {
        try {
            e.preventDefault()
            console.log(this.state.datos)

            /* Deshabilito el botón enviar */
            this.setState({deshabilitar: true})

            /* Envio los datos a la nube */
            let datos = await api.post(this.state.datos)
            console.log(datos)

            /* Habilito el botón enviar */
            //this.setState({deshabilitar: false})

            let stateAux = {...this.state}
            stateAux.datos.nombre = ''
            stateAux.datos.edad = ''
            stateAux.dirty.nombre = false
            stateAux.dirty.edad = false
            stateAux.deshabilitar = false
            stateAux.usuarios.push(datos)
            this.setState(stateAux)

            //this.getUsuarios()
        }
        catch(error) {
            console.log('Error enviar', error)
        }
    }

    /* ----------------- */
    /* API Rest : DELETE */
    /* ----------------- */
    async borrar(id) {
        console.log('borrar', id)

        try {
            let datos = await api.delete(id)
            console.log(datos)

            let offset = this.state.usuarios.findIndex(usuario => usuario.id === datos.id)
            let stateAux = {...this.state}
            stateAux.usuarios.splice(offset,1)
            this.setState({stateAux})

            //this.getUsuarios()
        }
        catch(error) {
            console.log('error borrar', error)
        }
    }


    /* ----------------- */
    /*  API Rest : PUT   */
    /* ----------------- */
    async actualizar(id) {
        console.log('actualizar', id)

        try {

            /* Deshabilito el botón enviar */
            this.setState({deshabilitar: true})

            let datos = await api.put(id, this.state.datos)
            console.log(datos)

            let offset = this.state.usuarios.findIndex(usuario => usuario.id === datos.id)

            let stateAux = {...this.state}
            stateAux.datos.nombre = ''
            stateAux.datos.edad = ''
            stateAux.dirty.nombre = false
            stateAux.dirty.edad = false
            stateAux.deshabilitar = false
            stateAux.usuarios.splice(offset, 1, datos)
            this.setState(stateAux)

            //this.getUsuarios()
        }
        catch(error) {
            console.log('error actualizar', error)
        }
    }

    /*
    getUsuarios() {
        api.getAll()
        .then(datos => {
            console.log(datos)
            this.setState({usuarios: datos})
        })
    }

    getDomicilios() {
        apiJava.getAll()
        .then(datos => {
            console.log(datos)
            this.setState({domicilios: datos})
        })
    }

    enviar(e) {
        e.preventDefault()
        console.log(this.state.datos)

        // Deshabilito el botón enviar
        this.setState({deshabilitar: true})

        // Envio los datos a la nube
        api.post(this.state.datos)
        .then( datos => {
            console.log(datos)

            // Habilito el botón enviar
            //this.setState({deshabilitar: false})

            let stateAux = {...this.state}
            stateAux.datos.nombre = ''
            stateAux.datos.edad = ''
            stateAux.dirty.nombre = false
            stateAux.dirty.edad = false
            stateAux.deshabilitar = false
            this.setState(stateAux)

            this.getUsuarios()
        })
    }
    */

    disableButton() {
        let { nombre, edad } = this.state.datos
        let { deshabilitar } = this.state
        return deshabilitar || nombre.length === 0 || edad.length === 0
    }



    render() {
        //console.log(this.state)
        let { nombre, edad } = this.state.datos
        let { nombre:nombreDirty, edad:edadDirty } = this.state.dirty
        let { usuarios, domicilios } = this.state

        return(
            <div className="Formulario">
                <div className="jumbotron mt-3">
                    <h2>Componente Formulario</h2>
                    <hr/>

                    <form autoComplete="off">
                        {/* --------------------------------------- */}
                        {/*             Campo nombre                */}
                        {/* --------------------------------------- */}
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" className="form-control" value={nombre} onChange={e => {
                                this.setState({
                                    datos: {...this.state.datos, nombre: e.target.value},
                                    dirty: {...this.state.dirty, nombre: true}
                                })
                            }}/>
                            {/* --------------------------------------- */}
                            {/* Mensajes de validación del campo nombre */}
                            {/* --------------------------------------- */}
                            {
                                nombreDirty && nombre.length === 0 &&
                                <div className="alert alert-danger mt-1">
                                    Campo Nombre Requerido
                                </div>
                            }
                        </div>

                        {/* --------------------------------------- */}
                        {/*              Campo edad                 */}
                        {/* --------------------------------------- */}
                        <div className="form-group">
                            <label htmlFor="edad">Edad</label>
                            <input type="number" id="edad" className="form-control" value={edad} onChange={e =>
                                //this.setState({edad: e.target.value})
                                this.setState({
                                    datos: {...this.state.datos, edad: e.target.value},
                                    dirty: {...this.state.dirty, edad: true}
                                })
                            }/>
                            {/* --------------------------------------- */}
                            {/* Mensajes de validación del campo edad   */}
                            {/* --------------------------------------- */}
                            {
                                edadDirty && edad.length === 0 &&
                                <div className="alert alert-danger mt-1">
                                    Campo Edad Requerido
                                </div>
                            }
                        </div>

                        {/* --------------------------------------- */}
                        {/*           Botón de Envío                */}
                        {/* --------------------------------------- */}
                        <button className="btn btn-success my-3" disabled={this.disableButton()} onClick={e => 
                            this.enviar(e)
                        }>Enviar</button>

                    </form>

                    <hr/>
                    <hr/>

                    {/* -------------------------------------------------------- */}
                    {/* REPRESENTACIÓN DE LOS DATOS INGRESADOS POR EL FORMULARIO */}
                    {/* -------------------------------------------------------- */}
                    <TablaUsuarios 
                        usuarios={usuarios} 
                        borrar={id => this.borrar(id) }
                        actualizar={id => this.actualizar(id)}
                        disabled={this.disableButton()}
                    />

                    <hr/>

                    {/* -------------------------------------------------------- */}
                    {/*      REPRESENTACIÓN DE LOS DATOS DEL BACKEND JAVA        */}
                    {/* -------------------------------------------------------- */}
                    <TablaDomicilios domicilios={domicilios}/>


                </div>
            </div>
        )
    }
}

export default Formulario