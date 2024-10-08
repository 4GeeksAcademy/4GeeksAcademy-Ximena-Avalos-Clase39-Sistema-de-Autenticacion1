const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
		},
		actions: {
			getMessage: async () => {
				try{
					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					
					return data;
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},
			login: async ({ email, password }) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email, password })
					});
			
					if (resp.ok) {  
						const data = await resp.json();
						const token = data.token;
						setStore({ token: token });
						localStorage.setItem('token', token);
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
					return false;
				}
			},
			register: async ({ firstName, lastName, email, password }) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/register`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ firstName, lastName, email, password }), 
					});
					const data = await resp.json();
			
					if (resp.ok) {
						const token = data.token;
			
						setStore({ token: token });
						localStorage.setItem('token', token);
					} else {
						console.log("Registration failed:", data.msg);
					}
				} catch (error) {
					console.log("Error during registration", error);
				}
			},
		},
	};
};

export default getState;