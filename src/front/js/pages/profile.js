import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');  
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);  
                } else {
                    console.log("Error fetching user data:", response.status);
                }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);  

    if (!userData) {
        return <p>Loading...</p>;  
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img 
                    className="profile-picture" 
                    src="https://via.placeholder.com/150" 
                    alt="Profile"
                />
                <h1 className="profile-name">Hello, {userData.first_name} {userData.last_name}</h1>
            </div>
            <div className="profile-details">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Bio:</strong> Esta es una breve descripción del usuario.</p>
                <p><strong>Joined:</strong> {userData.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}</p>
            </div>
        </div>
    );
};

export default Profile;