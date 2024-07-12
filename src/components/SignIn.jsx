import React, { useState } from "react";
import * as C from './loginStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use this for navigation

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [goal, setGoal] = useState('');
    const [signIn, setSignIn] = useState(true); // Define signIn state
    const navigate = useNavigate(); // Initialize useNavigate hook

    // const handleSignIn = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Make a POST request to the backend endpoint for signing in
    //         const response = await axios.post('http://localhost:3000/signin', { email, password });
    //         console.log(response.data); // Log the response data (if needed)
    //         // Redirect to the dashboard page after successful sign in
    //         if (response.data.success) {
    //             navigate('/dashboard');
    //         }
    //     } catch (error) {
    //         console.error("Error signing in:", error);
    //         // Handle error
    //     }
    // }

    const handleSignIn = async (event) => {

        navigate('/dashboard');
        event.preventDefault();
      
       
      
          // form data is extracted from the state
        //   const { email, password } = values;
      
          try {
            const { data } = await axios.post('http://localhost:5000/signin', {
                email
            });
      
          
             
             if (data.status == true) {
              localStorage.setItem('AppUser', JSON.stringify(data.item));

             
            }
          } catch (error) {
            console.error("Login Error:", error);
            
          }

      };


      const handleSignUp = async (event) => {
        event.preventDefault();
      
        try {
            // Validate form fields before sending the request
            if (!name || !email || !password || !age || !weight || !height || !goal) {
                throw new Error('All fields are required.');
            }
    
            // Send a POST request to the backend with the form data
            const response = await axios.post('http://localhost:5000/signup', {
                name,
                email,
                password,
                age,
                weight,
                height,
                goal
            });
    
            // Check the response and handle success or error
            if (response.data.status === true) {
                // Navigate to Sign In page on successful sign-up
                navigate('/signin');
            } else {
                throw new Error(response.data.message || 'Sign Up failed');
            }
        } catch (error) {
            console.error('Sign Up Error:', error);
            alert(`Sign Up Error: ${error.message}`);
        }
    };
    
    

    

    const toggle = () => {
        setSignIn(!signIn);
    }

    return (
        <>
            <C.Container>
                {/* Sign Up Container */}
                <C.SignUpContainer signinIn={signIn}>
                    <C.Form onSubmit={handleSignUp}>
                        <C.Title>Create Account</C.Title>
                        <C.Input type='text' placeholder='Name' required onChange={(e)=>{setName(e.target.value)}} />
                        <C.Input type='email' placeholder='Email' required onChange={(e)=>{setEmail(e.target.value)}} />
                        <C.Input type='password' placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}} />
                        <C.Input type='number' name='age' placeholder='Age' required onChange={(e)=>{setAge(e.target.value)}} />
                        <C.Input type='number' name='weight' placeholder='Weight (kg)' required onChange={(e)=>{setWeight(e.target.value)}} />
                        <C.Input type='number' name='height' placeholder='height(cm)' required onChange={(e)=>{setHeight(e.target.value)}} />
                        <C.Select name='goal' onChange={(e)=>{setGoal(e.target.value)}} >
                            <option value="">Select Goal</option>
                            <option value="gain">Gain Weight</option>
                            <option value="lose">Lose Fat</option>
                            <option value="maintain">Maintain Weight</option>
                        </C.Select>
                        <C.Button type="submit">Sign Up</C.Button>
                    </C.Form>
                </C.SignUpContainer>

                {/* Sign In Container */}
                <C.SignInContainer signinIn={signIn}>
                    <C.Form onSubmit={handleSignIn}>
                        <C.Title>Sign in</C.Title>
                        <C.Input type='email' placeholder='Email' required onChange={(e)=>{setEmail(e.target.value)}} />
                        <C.Input type='password' placeholder='Password' required onChange={(e)=>{setPassword(e.target.value)}} />
                        <C.Anchor href='#'>Forgot your password?</C.Anchor>
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
        </>
    );
}

export default App;
