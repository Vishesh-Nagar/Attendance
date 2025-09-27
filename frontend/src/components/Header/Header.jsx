import Logo from "./../Logo/Logo";
import Title from "./../Title/Title";
import { useEffect, useState } from 'react';
import AuthForm from '../Auth/AuthForm';

function Header() {
    const [auth, setAuth] = useState({ authenticated: false });
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('login');
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <>
            <div className="sticky top-0 w-full bg-zinc-900 shadow-md z-0 flex justify-center p-4">
                <div className="flex items-center gap-3">
                    <Logo />
                    <h1 className="text-4xl font-bold text-white">
                        <Title />
                    </h1>
                </div>

                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-1/2 -translate-y-1/2 right-4 z-10 md:hidden">
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <span className="block w-5 h-0.5 bg-white mb-1"></span>
                        <span className="block w-5 h-0.5 bg-white mb-1"></span>
                        <span className="block w-5 h-0.5 bg-white"></span>
                    </div>
                </button>

                <div className="hidden md:flex absolute top-4 right-4 z-10  items-center gap-3">
                    {auth.authenticated ? (
                        <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded shadow-lg">
                            <span className="text-white">Welcome, {auth.username}</span>
                            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => { setFormMode('login'); setShowForm(true); }} className="px-3 py-1 bg-green-500 text-white rounded">Login</button>
                            <button onClick={() => { setFormMode('signup'); setShowForm(true); }} className="px-3 py-1 bg-blue-500 text-white rounded">Sign up</button>
                        </>
                    )}
                </div>
            </div>

            <div className={`fixed inset-y-0 right-0 w-64 bg-zinc-800 shadow-lg z-20 flex flex-col p-4 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end mb-4">
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <div className="w-6 h-6 relative">
                            <span className="block absolute w-5 h-0.5 bg-white rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                            <span className="block absolute w-5 h-0.5 bg-white -rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        </div>
                    </button>
                </div>
                {auth.authenticated ? (
                    <div className="flex flex-col gap-2">
                        <span className="text-white">Welcome, {auth.username}</span>
                        <button onClick={() => { handleLogout(); setSidebarOpen(false); }} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <button onClick={() => { setFormMode('login'); setShowForm(true); setSidebarOpen(false); }} className="px-3 py-1 bg-green-500 text-white rounded">Login</button>
                        <button onClick={() => { setFormMode('signup'); setShowForm(true); setSidebarOpen(false); }} className="px-3 py-1 bg-blue-500 text-white rounded">Sign up</button>
                    </div>
                )}
            </div>

            {showForm && (
                <AuthForm
                    mode={formMode}
                    onSuccess={() => { setShowForm(false); checkAuth(); }}
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    );
}

export default Header;
