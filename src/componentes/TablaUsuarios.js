import React from 'react'


function TablaUsuarios(props) {

    let { usuarios, borrar, actualizar, disabled } = props

    return (
        <>
        { usuarios.length === 0 && <div className="alert alert-warning">No se encontraron datos</div> }
        { usuarios.length > 0 &&
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>EDAD</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
                {
                usuarios
                //.filter( usuario => usuario.id < 5 )
                .map( (usuario, key) => 
                    <tr key={key}>
                        <td>{usuario.id}</td>                               
                        <td>{usuario.nombre}</td>                               
                        <td>{usuario.edad}</td>
                        <td>
                            <button className="btn btn-danger mr-3" onClick={() => borrar(usuario.id)}>BORRAR</button>
                            <button className="btn btn-warning" disabled={disabled} onClick={() => actualizar(usuario.id)}>ACTUALIZAR</button>
                        </td>                               
                    </tr>
                )
                }
            </tbody>
        </table> 
        }
        </>       
    )
}

export default TablaUsuarios