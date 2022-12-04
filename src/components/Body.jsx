import React from "react";
import { useEffect, useState } from "react";
import { Alert } from "./Alert";
import { Conversion } from "./Conversion";
import { Link } from "react-router-dom";


export const Body = () => {
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');
    const [monto, setMonto] = useState('');
    const [alerta, setAlerta] = useState({});
    const [resultado, setResultado] = useState({});


    const url = 'https://api.frankfurter.app';
    
    useEffect(() => {
        const selectEntrada = document.querySelector('#entrada');
        const selectSalida = document.querySelector('#salida');

        function llenarSelects(res) {
            const llaves = Object.keys(res);

            for( let i = 0; i < llaves.length; i++) {
                selectEntrada.innerHTML += `
                    <option value='${llaves[i]}'>${res[llaves[i]]}</option>
                `
    
                selectSalida.innerHTML += `
                    <option value='${llaves[i]}'>${res[llaves[i]]}</option>
                `
            }
        }

        fetch(`${url}/currencies`)
            .then(respuesta => respuesta.json())
            .then(res => {
                llenarSelects(res);
            });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        if([entrada, salida, monto].includes('')) {
            setAlerta({
                type: 'error',
                msg: 'Todos los campos son obligatorios!'
            })

            return;
        };

        setAlerta({});
        
        console.log(monto, entrada, salida);
        fetch(`${url}/latest?amount=${monto}&from=${entrada}&to=${salida}`)
            .then(respuesta => respuesta.json())
            .then(resultado => setResultado(resultado));
    };


    const { msg } = alerta;
    const { rates } = resultado;

    return(
        <>
            <div className="padre">
                <div className='contenedor'>
                    <form 
                        className="formulario"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <p className="title">
                                Monedas
                            </p>
                            { msg && <Alert 
                                type={alerta.type} 
                                msg={alerta.msg} 
                                />
                            }
                            <div className='ingresos'>
                                <p
                                    className="texto"
                                >Moneda actual:</p>
                                <select 
                                    id='entrada' 
                                    className='select'
                                    value={entrada}
                                    onChange={e => {
                                        setEntrada(e.target.value)
                                        setResultado({})
                                    }}
                                >
                                    <option 
                                        value=''
                                    >Seleccione una</option>
                                </select>
                            </div>

                            <div className='ingresos'>
                                <p
                                    className="texto"
                                >Moneda a convertir:</p>
                                <select 
                                    id='salida' 
                                    className='select'
                                    value={salida}
                                    onChange={e => {
                                        setSalida(e.target.value)
                                        setResultado({})
                                    }}
                                >
                                    <option
                                        value=''
                                    >Seleccione una</option>
                                </select>
                            </div>

                            <div className='ingresos'>
                                <p
                                    className="texto"
                                >Monto:</p>
                                <input 
                                    className="input"
                                    type="number"
                                    placeholder="Ingresa el monto"
                                    value={monto}
                                    onChange={e => setMonto(e.target.value)}
                                />
                            </div>
                            
                        </div>
                        <button className="button">
                            Convertir
                        </button>
                    </form>
                    <div className='parte'>
                        <p className="title">
                            Conversión
                        </p>
                        { rates
                        ? <Conversion res={resultado} entrada={entrada} salida={salida}/>
                        : <p>Completa los campos para mostrar una conversion</p>}
                    </div>
                </div>
                <Link 
                    className="link"
                    to={'/conversiones'}
                >
                    Mostrar conversiones del euro hacia todas las monedas
                </Link>
            </div>
        </>
    )
};