import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../coreLogic/store/initReduxStore";
import { selectAuthToken, selectIsLoggedIn, selectAuthError } from "../coreLogic/reducers/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../coreLogic/useCases/getUserToken";
import { clearError } from "../coreLogic/reducers/userProfileSlice";

export function SignIn() {
    const [authValues, setAuthValues] = useState({ email: '', password: '' })
    const error = useSelector(selectAuthError);
    const token = useSelector(selectAuthToken);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(clearError());
        try {
            await dispatch(getUserToken(authValues)).unwrap();
        } catch (err: any) {
            console.error(err)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuthValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (token && isLoggedIn) {
            navigate('/profile');
        }
    }, [token, isLoggedIn, navigate]);

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