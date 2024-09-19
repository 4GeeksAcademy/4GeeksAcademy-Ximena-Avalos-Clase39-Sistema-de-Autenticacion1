import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');  // Obtener el token desde el localStorage
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Pasar el token en el header
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);  // Guardar los datos del usuario en el estado
                } else {
                    console.log("Error fetching user data:", response.status);
                }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);  // El arreglo vacío asegura que la llamada a la API solo se haga una vez al montar el componente

    if (!userData) {
        return <p>Loading...</p>;  // Mostrar un mensaje de carga mientras se obtienen los datos
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