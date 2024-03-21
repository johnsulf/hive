class AuthFormState {
    constructor({
        state,
        title,
        toggleStateIntro,
        toggleStateButtonText,
    }) {
        this.state = state;
        this.title = title;
        this.toggleStateIntro = toggleStateIntro;
        this.toggleStateButtonText = toggleStateButtonText;
    }
}

export const authFormStates = [
    new AuthFormState(
        {
            state: "signup",
            title: "Sign Up",
            toggleStateIntro: "Allready have an account?",
            toggleStateButtonText: "Sign In",
        }
    ),
    new AuthFormState(
        {
            state: "signin",
            title: "Sign In",
            toggleStateIntro: "Don't have an account?",
            toggleStateButtonText: "Sign Up",
        }
    ),
];