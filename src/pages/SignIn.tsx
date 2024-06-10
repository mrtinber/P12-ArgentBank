export function SignIn() {
    return <main className="main bg-dark">
        <section className="signin__content">
            <i className="fa fa-user-circle signin__icon"></i>
            <h1>Sign In</h1>
            <form>
                <div className="input__wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                </div>
                <div className="input__wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div className="input__remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="signin__button">Sign In</button>
            </form>
        </section>
    </main>
}