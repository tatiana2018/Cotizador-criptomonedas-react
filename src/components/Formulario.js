import React, { useEffect, useState } from 'react';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import styled from '@emotion/styled';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarCripto, guardarMoneda}) => {

    const [listaCripto, guardarCriptos] = useState([]);
    const [error, guardarError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'COP', nombre: 'Peso Colombiano' }
    ]

    //utilizar hook de moneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

    //utilizar hook criptomoneda
    const [criptomoneda, SelectCripto] = useCriptoMoneda('Elige tu Criptomoneda', '', listaCripto);

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptos(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        //validar los datos

        if (moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        guardarError(false)
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);

    }


    return (

        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> :null}

            <SelectMonedas />
            <SelectCripto />

            <Boton
                type='submit'
                value='calcular'
            >
            </Boton>

        </form>
    );
}

export default Formulario;