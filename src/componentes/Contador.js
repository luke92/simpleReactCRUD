import React from 'react'
import './Contador.css'


class Contador extends React.Component {

    constructor(props) {
        super(props)
        console.log('constructor Contador')

        /* this.state = {
            contador: Number(props.valorInicial)
        } */
    }
  
    state = {
        contador: Number(this.props.valorInicial),
        contador2: Number(this.props.valorInicial)
    }

    componentDidMount() {
        console.log('componentDidMount Contador')
        //this.setState({contador: Number(this.props.valorInicial)})
        this.refTimer = setInterval(() => this.incrementar(),2000)
    }

    UNSAFE_componentWillUpdate() {
        console.log('componentWillUpdate Contador')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate Contador')
    }

    componentWillUnmount() {
        clearInterval(this.refTimer)
        console.log('componentWillUnmount Contador')
    }


    incrementar() {
        console.log('incrementar')
        //this.setState({contador: this.state.contador + 1}) //Funciona por está MAL!!
        this.setState(prevstate => ({contador: prevstate.contador + 1})) //Forma Correcta
    }

    incrementar2() {
        console.log('incrementar 2')
        //this.setState({contador: this.state.contador + 1}) //Funciona por está MAL!!
        this.setState(prevstate => ({contador2: prevstate.contador2 + 1})) //Forma Correcta
    }

    render() {
        console.log('render Contador', this.state)

        let { contador,contador2 } = this.state
        //let { valorInicial } = this.props

        return (
            <div className="Contador">
                <div className="jumbotron mt-3">
                    <h2>Componente Contador</h2>
                    <hr/>
                    {/* <h4>{this.state.contador}</h4> */}
                    <h4>{contador}</h4>
                    {/* <h5>{this.props.valorInicial}</h5> */}
                    {/* <h5>{valorInicial}</h5> */}
                    {/* <button className="btn btn-success mt-2" onClick={this.incrementar}> */}
                    <button className="btn btn-success mt-2" onClick={() => this.incrementar()}>
                        Incrementar
                    </button>
                    <hr/>
                    <h4>{contador2}</h4>
                    <button className="btn btn-success mt-2" onClick={() => this.incrementar2()}>
                        Incrementar 2
                    </button>

                </div>
            </div>
        )
    }
}

export default Contador