import { useEffect, useState } from "react"

const USER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjY2NDFmNTllYWIzMDhiMGViMWI4MiIsImlhdCI6MTcxNzk4OTEwNywiZXhwIjoxNzE4MDc1NTA3fQ.c5XVnKrBTnABW7mP_cUVYWO01NL7gKLVsXib7SiMmPY'

export function UserProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': USER_TOKEN,
                    }
                });

                const data = await response.json()
                setFirstName(data.body.firstName);
                setLastName(data.body.lastName);
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    })

    if (error) {
        console.log('Oups, il y a une erreur')
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleEdit = async () => {
        setIsEditing(!isEditing)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("On change les infos", { firstName, lastName })
        handleEdit();
    }

    return <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            <button className="edit__button" onClick={handleEdit}>Edit Name</button>
            {isEditing && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <button type="submit">Save</button>
                        <button onClick={handleEdit}>Cancel</button>
                    </form>
                </>
            )}
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