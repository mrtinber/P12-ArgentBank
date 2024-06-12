export type UserProfileState = {
    profile: UserProfile,
    isLoading: boolean,
    error: string | null,
    isEditing: boolean,
}

export type UserProfile = {
    firstName: string,
    lastName: string,
}