import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../coreLogic/store/initReduxStore";
import { selectError, selectIsEditing, selectIsLoading, selectUserProfile, setIsEditing } from "../coreLogic/reducers/userProfileSlice";
import { selectIsLoggedIn } from "../coreLogic/reducers/userAuthSlice";
import { NavLink } from "react-router-dom";
import { fetchUserProfile } from "../coreLogic/useCases/fetchUserProfile";
import { updateUserProfile } from "../coreLogic/useCases/updateUserProfile";
import { AccountElement } from "../components/AccountElement";

export function UserProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(selectUserProfile);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const isEditing = useSelector(selectIsEditing);
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '' });
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        setFormValues(profile);
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

    if (!isLoggedIn) {
        return <div>Veuillez <NavLink to='/sign-in'>vous connecter</NavLink></div>
    }
    //verifier si le token est stocké dans le localstorage 

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
            <AccountElement title='Argent Bank Checking (x8349)' amount='$2,082.79' description="Available Balance" />
            <AccountElement title='Argent Bank Savings (x6712)' amount='$10,928.42' description="Available Balance" />
            <AccountElement title='Argent Bank Credit Card (x8349)' amount='$184.30' description="Current Balance" />
        </main>
    );
}
