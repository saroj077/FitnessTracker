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

    const [successMessage, setSuccessMessage] = useState(null); // Define success message state
    
    const [signIn, setSignIn] = useState(false); // Define signIn state
    const [mail, setMail] = useState(''); // Define mail state
    const [pw, setPw] = useState(''); // Define pw state

    const handleInputs = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setUser({ ...user, [inputName]: inputValue });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the backend endpoint '/signup'
            const response = await axios.post('http://localhost:3000/signup', user);
            console.log(response.data); // Log the response data (if needed)

            // Redirect to the sign-in page after successful signup
            navigate("/signin");
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle error
        }
    }

     // Define toggle function
     const toggle = () => {
        setSuccessMessage(null); // Reset success message state
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000');
                const data = await res.json(); // Await for JSON parsing
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error
            }
        };
        fetchData(); // Call fetchData function
    }, []); // Empty dependency array to run effect only once

    return (
        <C.Container>
            {/* Sign Up Container */}
            <C.SignUpContainer signinIn={signIn}>
                {/* Display success message if available */}
                {successMessage && (
                    <C.SuccessMessageContainer>
                        <C.SuccessMessage>{successMessage}</C.SuccessMessage>
                    </C.SuccessMessageContainer>
                )}

                <C.Form onSubmit={handleOnSubmit} >
                    <C.Title>Create Account</C.Title>
                    {/* Input fields */}
                    <C.Input type='text' name="name" value={user.name} onChange={handleInputs} placeholder='Name' />
                    <C.Input type='email' name="email" value={user.email} onChange={handleInputs} placeholder='Email' />
                    <C.Input type='password' name="password" value={user.password} onChange={handleInputs} placeholder='Password' />
                    <C.Input type='number' name='age' value={user.age} onChange={handleInputs} placeholder='Age' />
                    <C.Input type='number' name='weight' value={user.weight} onChange={handleInputs} placeholder='Weight (kg)' />
                    <C.Select name='goal' value={user.goal} onChange={handleInputs}>
                        <option value="">Select Goal</option>
                        <option value="gain">Gain Weight</option>
                        <option value="lose">Lose Fat</option>
                        <option value="maintain">Maintain Weight</option>
                    </C.Select>
                    {/* Sign up button */}
                    <C.Button type="submit" name='signup' id='signup'>Sign Up</C.Button>
                </C.Form>
            </C.SignUpContainer>

            {/* Sign In Container */}
            <C.SignInContainer signinIn={signIn}>
                <C.Form>
                    <C.Title>Sign in</C.Title>
                    {/* Input fields for sign in */}
                    <C.Input type='email' placeholder='Email' required onChange={(e) => setMail(e.target.value)} />
                    <C.Input type='password' placeholder='Password' required onChange={(e) => setPw(e.target.value)} />
                    <C.Anchor href='#'>Forgot your password?</C.Anchor>
                    {/* Sign in button */}
                    <C.Button type="submit">Sign In</C.Button>
                </C.Form>
            </C.SignInContainer>

            {/* Overlay for switching between SignUp and SignIn */}
            <C.OverlayContainer signinIn={signIn}>
                <C.Overlay signinIn={signIn}>
                    {/* Left Overlay Panel */}
                    <C.LeftOverlayPanel signinIn={signIn}>
                        <C.Title>Welcome Back!</C.Title>
                        <C.Paragraph>To keep connected with us please login with your personal info</C.Paragraph>
                        <C.GhostButton onClick={() => toggle(true)}>Sign In</C.GhostButton>
                    </C.LeftOverlayPanel>
                    {/* Right Overlay Panel */}
                    <C.RightOverlayPanel signinIn={signIn}>
                        <C.Title>Hello, Friend!</C.Title>
                        <C.Paragraph>Enter Your personal details and start journey with us</C.Paragraph>
                        <C.GhostButton onClick={() => toggle(false)}>Sign Up</C.GhostButton>
                    </C.RightOverlayPanel>
                </C.Overlay>
            </C.OverlayContainer>
        </C.Container>
    );
}

export default SignUpForm;
