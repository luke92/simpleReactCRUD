import React from 'react';
import './App.css';
import Contador from './componentes/Contador';
import Formulario from './componentes/Formulario';


class App extends React.Component {
  
  state = {
    mostrarContador : !true,
    mostrarFormulario: true
  }

  render() {

    let { mostrarContador, mostrarFormulario } = this.state

    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron mt-3">
            <h1>Componente Principal</h1>
            <hr/>

            {/* -------------------------------- */}
            {/* CONTROL DE LA VISTA DEL CONTADOR */}
            {/* -------------------------------- */}
            <button className="btn btn-info my-2" onClick={() =>
              this.setState(prevstate => ({mostrarContador: !prevstate.mostrarContador}))
            }>{ mostrarContador? 'Ocultar':'Mostrar Contador'}</button>
            { mostrarContador &&
              <>
                <Contador valorInicial="456" />
                <Contador valorInicial="789" />
              </>
            }

            <hr/>

            {/* ---------------------------------- */}
            {/* CONTROL DE LA VISTA DEL FORMULARIO */}
            {/* ---------------------------------- */}
            <button className="btn btn-info my-2" onClick={() =>
              this.setState(prevstate => ({mostrarFormulario: !prevstate.mostrarFormulario}))
            }>{ mostrarFormulario? 'Ocultar':'Mostrar Formulario'}</button>
            { mostrarFormulario && <Formulario /> }


          </div>
        </div>
      </div>
    )
  }
}

export default App;
