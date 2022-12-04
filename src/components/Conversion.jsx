import React from "react";


export const Conversion = (props) => {
    const { res, entrada, salida } = props;
    const { amount, date, rates } = res;

    return(
        <>
            <p>
                <strong>Fecha: </strong> 
                {date}
            </p>
            <p>
                <strong>{amount} {entrada}</strong>
                {' '}={' '}
                <strong>{rates[salida]} {salida}</strong>
            </p>
        </>
    )
}