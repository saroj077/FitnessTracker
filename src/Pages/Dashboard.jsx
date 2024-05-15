import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const WelcomeMessage = styled.h1`
    font-size: 2rem;
    color: #333;
`;

const Dashboard = () => {
    const location = useLocation();
    const { username } = location.state || { username: 'User' }; // Default to 'User' if username is not provided

    return (
        <Container>
            <WelcomeMessage>Welcome, {username}!</WelcomeMessage>
        </Container>
    );
};

export default Dashboard;
