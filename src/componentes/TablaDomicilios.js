import React from 'react'


function TablaDomicilios(props) {

    let { domicilios } = props

    return (
        <>
        { domicilios.length === 0 && <div className="alert alert-warning">No se encontraron datos</div> }
        { domicilios.length > 0 &&
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CALLE</th>
                    <th>NUMERO</th>
                    <th>LOCALIDAD</th>
                </tr>
            </thead>
            <tbody>
                {
                domicilios.map( (domicilio, key) => 
                    <tr key={key}>
                        <td>{domicilio.id}</td>                               
                        <td>{domicilio.calle}</td>                               
                        <td>{domicilio.numero}</td>                               
                        <td>{domicilio.localidad}</td>                               
                    </tr>
                )
                }
            </tbody>
        </table>
        }
        </>
    )
}

export default TablaDomicilios