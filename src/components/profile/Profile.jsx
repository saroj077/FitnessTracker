import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/current-user', {
                    withCredentials: true  // Include credentials (cookies)
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div className="profile">Loading...</div>;
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Profile</h1>
            </div>
            <div className="profile-card">
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Weight:</strong> {user.weight} kg</p>
                <p><strong>Age:</strong> {user.age} years</p>
                <p><strong>Goal:</strong> {user.goal}</p>
            </div>
        </div>
    );
}

export default Profile;
