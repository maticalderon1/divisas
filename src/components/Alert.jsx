import React from "react";


export const Alert = (alerta) => {
    const { msg, type } = alerta;

    if(type === 'error') {
        return(
            <div className='alerta-error'>
                <p>{msg}</p>
            </div>
        )
    } else {
        return(
            <div className="alerta-succes">
                <p>{msg}</p>
            </div>
        )
    }
    
};