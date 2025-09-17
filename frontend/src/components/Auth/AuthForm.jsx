import { useState } from "react";

async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function AuthForm({ mode = "login", onSuccess, onClose }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const getCsrfToken = () => {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="))
            ?.split("=")[1];
    };

    const ensureCsrfCookie = async () => {
        await fetch(`${BACKEND}/api/csrf/`, { credentials: "include" });
    };

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await ensureCsrfCookie();
            const csrfToken = getCsrfToken();

            const hashedPassword = await hashPassword(password);
            const url =
                mode === "signup"
                    ? `${BACKEND}/api/signup/`
                    : `${BACKEND}/api/login/`;
            const body =
                mode === "signup"
                    ? { email, username, password: hashedPassword }
                    : { username, password: hashedPassword };

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "",
                },
                credentials: "include",
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "Auth failed");
            }

            const data = await res.json();
            onSuccess && onSuccess(data);
            onClose && onClose();
        } catch (err) {
            setError(err.message || String(err));
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <form
                onSubmit={submit}
                className="bg-gray-800 text-white p-6 rounded shadow-lg w-80"
            >
                <h3 className="text-xl mb-3">
                    {mode === "signup" ? "Sign up" : "Log in"}
                </h3>
                {mode === "signup" && (
                    <input
                        className="w-full p-2 mb-2 text-black"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <input
                    className="w-full p-2 mb-2 text-black"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="w-full p-2 mb-2 text-black"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="text-red-400 mb-2">{error}</div>}
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 bg-gray-600 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 bg-green-500 rounded"
                    >
                        {mode === "signup" ? "Sign up" : "Log in"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
