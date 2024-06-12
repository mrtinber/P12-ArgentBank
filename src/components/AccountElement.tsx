type AccountElementProps = {
    title: string, 
    amount: string, 
    description: string,
}

export const AccountElement = ({title, amount, description} : AccountElementProps ) => {
    return <section className="account">
        <div className="account__content">
            <h3 className="account__content__title">{title}</h3>
            <p className="account__content__amount">{amount}</p>
            <p className="account__content__amount__description">{description}</p>
        </div>
        <div className="account__content cta">
            <button className="transaction__button">View transactions</button>
        </div>
    </section>
}