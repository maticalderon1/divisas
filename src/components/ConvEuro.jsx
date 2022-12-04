import React, { useEffect, useState } from "react";
import { Cambio } from "./Cambio";
import { useNavigate } from "react-router-dom";


export const ConvEuro = () => {
    const [valores, setValores] = useState([]);
    const [obtenido, setObtenido] = useState(false);

    let keys;

    const navigate = useNavigate();

    useEffect( () => {
        const obtenerCambios = () => {
            fetch('https://api.frankfurter.app/latest')
            .then(respuesta => respuesta.json())
            .then(conversiones => agregarConversiones(conversiones));
        }

        obtenerCambios();
    }, []);

    const agregarConversiones = (conversiones) => {
        keys = Object.keys(conversiones.rates);
        const cambios = [];

        for(let i = 0; i < keys.length; i++) {
            cambios.push({
                valor: conversiones.rates[keys[i]],
                key: keys[i]});
        };

        console.log(cambios);
        setValores(cambios);
        console.log(valores);
        setTimeout( () => {
            setObtenido(true);
        }, 1000)
    };

    const handleClick = () => {
        navigate('/');
    };

    return(
        <>
            <div className="padre">
                <div className="listado">
                    <h1 className="title">
                        conversiones
                    </h1>
                    { obtenido
                    ?  <div className='conversiones'>
                            { valores.map( cambio => (
                            <Cambio 
                                key={cambio.key} 
                                cambio={cambio} />
                            )) 
                            }
                        </div>
                    :  <div class="spinner">
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                        </div>}
                    <button 
                        className='button'
                        onClick={handleClick}
                    >
                        Volver atras!
                    </button>
                </div>
            </div>
        </>
    )
}