import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { getUserToken, selectAuthToken } from "../features/userAuth/userAuthSlice";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const [authValues, setAuthValues] = useState({email:'', password:''})
    const [error, setError] = useState<string | null>(null);
    const token = useSelector(selectAuthToken);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getUserToken(authValues));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuthValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (token) {
            navigate('/profile');
        }
    }, [token, navigate]);

    return <main className="main bg-dark">
        <section className="signin__content">
            <i className="fa fa-user-circle signin__icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input__wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name='email' value={authValues.email} onChange={handleChange} />
                </div>
                <div className="input__wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name='password' value={authValues.password} onChange={handleChange} />
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