import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function AuthForm({ mode = "login", onSuccess, onClose }) {
    const [currentMode, setCurrentMode] = useState(mode);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const submit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation checks
        if (currentMode === "signup" && !email.endsWith("@gmail.com")) {
            setError("Email must end with @gmail.com");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            const hashedPassword = await hashPassword(password);
            const url =
                currentMode === "signup"
                    ? `${BACKEND}/api/signup/`
                    : `${BACKEND}/api/login/`;
            const body =
                currentMode === "signup"
                    ? { email, username, password: hashedPassword }
                    : { username, password: hashedPassword };

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 text-center">
            <form
                onSubmit={submit}
                className="bg-gray-800 text-white p-6 rounded shadow-lg w-auto"
            >
                <h3 className="text-xl mb-3">
                    {currentMode === "signup" ? "Sign up" : "Log in"}
                </h3>
                {currentMode === "signup" && (
                    <input
                        className="w-full p-2 mb-2 text-black"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <br />
                <input
                    className="w-full p-2 mb-2 text-black"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <div className="relative mb-2">
                    <input
                        className="w-full p-2 pr-10 text-black"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {error && <div className="text-red-400 mb-2">{error}</div>}
                <div className="flex justify-center mt-2 gap-2 items-center text-center">
                    <button
                        type="submit"
                        className="px-3 py-1 bg-green-500 rounded"
                    >
                        {currentMode === "signup" ? "Sign up" : "Log in"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 bg-gray-600 rounded"
                    >
                        Cancel
                    </button>
                </div>
                <div className="mt-2 text-center">
                    {currentMode === "signup" ? (
                        <p>
                            Have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setCurrentMode("login")}
                                className="text-blue-400 underline hover:text-blue-300"
                            >
                                Login
                            </button>
                        </p>
                    ) : (
                        <p>
                            New here?{" "}
                            <button
                                type="button"
                                onClick={() => setCurrentMode("signup")}
                                className="text-blue-400 underline hover:text-blue-300"
                            >
                                Sign up
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AuthForm;
