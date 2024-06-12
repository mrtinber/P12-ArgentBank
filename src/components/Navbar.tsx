import argentBankLogo from '../assets/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../coreLogic/reducers/userProfileSlice';
import { selectIsLoggedIn, setIsLoggedIn, setToken } from '../coreLogic/reducers/userAuthSlice';
import { AppDispatch } from '../coreLogic/store/initReduxStore';
import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
    const profile = useSelector(selectUserProfile);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch<AppDispatch>()

    const handleLogOut = () => {
        dispatch(setIsLoggedIn(false)); // Pas utile?
        dispatch(setToken('')); // si vide alors setisloggedin = false
        // localstorage 

        // Effacement des données du stockage local
        localStorage.clear();
    };

    return <>
        <nav className="nav">
            <Link className="nav__logo" to="/">
                <img
                    className="nav__logo__image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isLoggedIn ? (<>
                    <NavLink className="nav__item" to="./profile">
                        <i className="fa fa-user-circle"></i>
                        {profile.firstName}
                    </NavLink>
                    <NavLink className="nav__item" to="/" onClick={handleLogOut} >
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </NavLink>
                </>
                ) : <NavLink className="nav__item" to="./sign-in">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </NavLink>
                }
            </div>
        </nav>
    </>
}