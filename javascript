import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;



const UserForm = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState(user || { name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
            />
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
            />
            <button type="submit">Submit</button>
        </form>
    );
};




import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notifyError = (message) => {
    toast.error(message);
};

axios.interceptors.response.use(
    response => response,
    error => {
        notifyError(error.message);
        return Promise.reject(error);
    }
);




import { render, screen } from '@testing-library/react';
import UserList from './UserList';

test('renders user list', () => {
    render(<UserList />);
    expect(screen.getByText(/User List/i)).toBeInTheDocument();
});
