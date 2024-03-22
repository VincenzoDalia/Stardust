import React from 'react';
import { Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import sharing1 from '../assets/sharing1.jpg';

const Styles = styled.div`

    .jumbo {
        background: url(${sharing1}) no-repeat fixed;
        background-size: cover;
        color: #dark;
        height:600px;
        position: relative;
       
    }

    @media (max-width: 1080px){
        .jumbo{
            background: url(${sharing1}) no-repeat center; 
        -webkit-background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        -o-background-size: 100% 100%;
        background-size: 100% 100%;
        }
    }
`;


export const Jumbotron = () => (

    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <br/><br/><br/><br/><br/><br/>
            </Container>
        </Jumbo>
    </Styles>


)