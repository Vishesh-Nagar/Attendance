import Logo from "./../Logo/Logo";
import Title from "./../Title/Title";
import { useEffect, useState } from 'react';
import AuthForm from '../Auth/AuthForm';

function Header() {
    const [auth, setAuth] = useState({ authenticated: false });
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('login');

    const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

    const checkAuth = async () => {
        try {
            const res = await fetch(`${BACKEND}/api/me/`, { credentials: 'include' });
            if (!res.ok) return setAuth({ authenticated: false });
            const data = await res.json();
            setAuth(data);
            try { window.dispatchEvent(new CustomEvent('authChanged', { detail: data })); } catch (e) {}
        } catch (e) {
            setAuth({ authenticated: false });
        }
    };

    useEffect(() => { checkAuth(); }, []);

    const handleLogout = async () => {
        await fetch(`${BACKEND}/api/logout/`, { method: 'POST', credentials: 'include' });
        const data = { authenticated: false };
        setAuth(data);
        try { window.dispatchEvent(new CustomEvent('authChanged', { detail: data })); } catch (e) {}
    };

    return (
        <div className="sticky top-0 w-full bg-zinc-900 shadow-md z-50 flex items-center justify-between p-4">
            {/* Left Spacer */}
            <div className="w-24"></div>

            {/* Center: Logo + Title */}
            <div className="flex items-center gap-3">
                <Logo />
                <h1 className="text-4xl font-bold text-white">
                    <Title />
                </h1>
            </div>

            {/* Right: Auth Buttons */}
            <div className="flex items-center gap-3">
                {auth.authenticated ? (
                    <>
                        <div className="text-white">{auth.username}</div>
                        <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => { setFormMode('login'); setShowForm(true); }} className="px-3 py-1 bg-green-500 text-white rounded">Login</button>
                        <button onClick={() => { setFormMode('signup'); setShowForm(true); }} className="px-3 py-1 bg-blue-500 text-white rounded">Sign up</button>
                    </>
                )}
            </div>

            {showForm && (
                <AuthForm
                    mode={formMode}
                    onSuccess={() => { setShowForm(false); checkAuth(); }}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
}

export default Header;
