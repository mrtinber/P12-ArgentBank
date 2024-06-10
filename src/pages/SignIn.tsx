import { useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submitted");
        let token = '';

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.body.token);
                token = data.body.token;
                window.location.href = '/profile';
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('Oups')
        } finally {
            console.log("Token:", token)
        }
    }

    return <main className="main bg-dark">
        <section className="signin__content">
            <i className="fa fa-user-circle signin__icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input__wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input__wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input__remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="signin__button">Sign In</button>
            </form>
        </section>
    </main>
}