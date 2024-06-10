export function User() {
    return <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back<br />Tony Jarvis!</h1>
            <button className="edit__button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
            <div className="account__content">
                <h3 className="account__content__title">Argent Bank Checking (x8349)</h3>
                <p className="account__content__amount">$2,082.79</p>
                <p className="account__content__amount__description">Available Balance</p>
            </div>
            <div className="account__content cta">
                <button className="transaction__button">View transactions</button>
            </div>
        </section>
        <section className="account">
            <div className="account__content">
                <h3 className="account__content__title">Argent Bank Savings (x6712)</h3>
                <p className="account__content__amount">$10,928.42</p>
                <p className="account__content__amount__description">Available Balance</p>
            </div>
            <div className="account__content cta">
                <button className="transaction__button">View transactions</button>
            </div>
        </section>
        <section className="account">
            <div className="account__content">
                <h3 className="account__content__title">Argent Bank Credit Card (x8349)</h3>
                <p className="account__content__amount">$184.30</p>
                <p className="account__content__amount__description">Current Balance</p>
            </div>
            <div className="account__content cta">
                <button className="transaction__button">View transactions</button>
            </div>
        </section>
    </main>
}