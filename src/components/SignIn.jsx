import React, { useState } from "react";
import * as C from './loginStyle';
import axios from 'axios';

function App() {

    const [signIn, toggle] = React.useState(true);
    const [email, setMail] = useState('');
    const [name, setName] = useState('');
    const [Pw, setPw] = useState('');
    const [weight, setWeight] = useState('');
    const [Age, setAge] = useState('');
    const [Goal, setGoal] = useState('');

    const signinUser = (e) =>{
        e.preventDefault();
        axios.get('/');
    }

    return( 
        <>
            <C.Container>
                {/* Sign Up Container */}
                <C.SignUpContainer signinIn={signIn}>
                    <C.Form action="POST">
                        <C.Title>Create Account</C.Title>
                        <C.Input type='text' placeholder='Name' required onChange={(e)=>{setName(e.target.value)}} />
                        <C.Input type='email' placeholder='Email' required onChange={(e)=>{setMail(e.target.value)}} />
                        <C.Input type='password' placeholder='Password' required onChange={(e)=>{setPw(e.target.value)}} />
                        <C.Input type='number' name='age' placeholder='Age' required onChange={(e)=>{setAge(e.target.value)}} />
                        <C.Input type='number' name='weight' placeholder='Weight (kg)' required onChange={(e)=>{setWeight(e.target.value)}} />
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
                    <C.Form>
                        <C.Title>Sign in</C.Title>
                        <C.Input type='email' placeholder='Email' required onChange={(e)=>{setMail(e.target.value)}} />
                        <C.Input type='password' placeholder='Password' required onChange={(e)=>{setPw(e.target.value)}} />
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
