import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as C from './loginStyle';
import axios from 'axios';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        weight: "",
        age: "",
        goal: ""
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [signIn, setSignIn] = useState(false);
    const [mail, setMail] = useState('');
    const [pw, setPw] = useState('');

    const handleInputs = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setUser({ ...user, [inputName]: inputValue });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', user);
            console.log(response.data);
            navigate("/signin");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signin', { email: mail, password: pw });
            console.log(response.data);
            if (response.data.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }

    const toggle = () => {
        setSuccessMessage(null);
        setSignIn(!signIn);
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3000');
    //             const data = await res.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <C.Container>
            <C.SignUpContainer signinIn={signIn}>
                {successMessage && (
                    <C.SuccessMessageContainer>
                        <C.SuccessMessage>{successMessage}</C.SuccessMessage>
                    </C.SuccessMessageContainer>
                )}
                <C.Form onSubmit={handleOnSubmit}>
                    <C.Title>Create Account</C.Title>
                    <C.Input type='text' name="name" value={user.name} onChange={handleInputs} placeholder='Name' />
                    <C.Input type='email' name="email" value={user.email} onChange={handleInputs} placeholder='Email' />
                    <C.Input type='password' name="password" value={user.password} onChange={handleInputs} placeholder='Password' />
                    <C.Input type='number' name='age' value={user.age} onChange={handleInputs} placeholder='Age' />
                    <C.Input type='number' name='weight' value={user.weight} onChange={handleInputs} placeholder='Weight (kg)' />
                    <C.Input type='number' name='height' value={user.height} onChange={handleInputs} placeholder='height (cm)' />
                    <C.Select name='goal' value={user.goal} onChange={handleInputs}>
                        <option value="">Select Goal</option>
                        <option value="gain">Gain Weight</option>
                        <option value="lose">Lose Fat</option>
                        <option value="maintain">Maintain Weight</option>
                    </C.Select>
                    <C.Button type="submit" name='signup' id='signup'>Sign Up</C.Button>
                </C.Form>
            </C.SignUpContainer>

            <C.SignInContainer signinIn={signIn}>
                <C.Form onSubmit={handleSignIn}>
                    <C.Title>Sign in</C.Title>
                    <C.Input type='email' placeholder='Email' required onChange={(e) => setMail(e.target.value)} />
                    <C.Input type='password' placeholder='Password' required onChange={(e) => setPw(e.target.value)} />
                    <C.Anchor href='#'>Forgot your password?</C.Anchor>
                    <C.Button type="submit">Sign In</C.Button>
                </C.Form>
            </C.SignInContainer>

            <C.OverlayContainer signinIn={signIn}>
                <C.Overlay signinIn={signIn}>
                    <C.LeftOverlayPanel signinIn={signIn}>
                        <C.Title>Welcome Back!</C.Title>
                        <C.Paragraph>To keep connected with us please login with your personal info</C.Paragraph>
                        <C.GhostButton onClick={toggle}>Sign In</C.GhostButton>
                    </C.LeftOverlayPanel>
                    <C.RightOverlayPanel signinIn={signIn}>
                        <C.Title>Hello, Friend!</C.Title>
                        <C.Paragraph>Enter Your personal details and start journey with us</C.Paragraph>
                        <C.GhostButton onClick={toggle}>Sign Up</C.GhostButton>
                    </C.RightOverlayPanel>
                </C.Overlay>
            </C.OverlayContainer>
        </C.Container>
    );
}

export default SignUpForm;
