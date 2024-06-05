import argentBankLogo from '../assets/argentBankLogo.png'

export function Navbar() {
    return <>
        <nav className="nav">
            <a className="nav__logo" href="./index.html">
                <img
                    className="nav__logo__image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                <a className="nav__item" href="./sign-in.html">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </a>
            </div>
        </nav>
    </>
}