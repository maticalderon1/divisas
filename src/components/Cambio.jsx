import React from "react";


export const Cambio = ({cambio}) => {
    return(
        <strong>1 EUR = {cambio.valor} {cambio.key}</strong>
    )
};