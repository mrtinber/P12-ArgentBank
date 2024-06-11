import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchUserProfile, selectError, selectIsEditing, selectIsLoading, selectUserProfile, setIsEditing, updateUserProfile } from "../features/userProfile/userProfileSlice";

export function UserProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectUserProfile);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const isEditing = useSelector(selectIsEditing);
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        dispatch(fetchUserProfile());
        console.log(profile);
    }, [dispatch]);

    useEffect(() => {
        setFormValues(profile);
        console.log(formValues)
    }, [profile]);

    const handleEdit = () => {
        dispatch(setIsEditing(!isEditing));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateUserProfile(formValues))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    if (error) {
        console.log('Oups, il y a une erreur');
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
                {isEditing ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="form__row">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder={formValues.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder={formValues.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form__row">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleEdit}>Cancel</button>
                            </div>
                        </form>
                    </>
                ) : <button className="edit__button" onClick={handleEdit}>Edit Name</button>
                }
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
    );
}
