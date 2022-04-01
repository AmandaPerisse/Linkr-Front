import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 30px;
    margin-bottom: -20px;
    border: none;
    cursor: pointer;
    display: ${props => props.isHidden};
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

const Texto = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: white;
`;


export {
    Button, Texto
}