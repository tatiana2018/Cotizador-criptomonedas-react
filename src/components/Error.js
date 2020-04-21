import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 0.5rem;
    color: #FFF;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'calibri', cursive;
`;

const Error = ({ mensaje }) => (
    <MensajeError>{mensaje}</MensajeError>
)

export default Error;