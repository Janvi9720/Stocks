import React, { useState, useEffect, useContext } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import { registerUser } from "./actions/auth";
import { useDispatch } from "react-redux";

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, process.env.REACT_APP_AUTH0_CALLBACK_URL);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0] = useState();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);

            if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
                const { appState } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                const accessToken = await auth0FromHook.getTokenSilently({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                });
                setUser(user);

                let profile = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : {}
                
                profile.token = accessToken;
                // profile['result'].name = user.nickname;
                localStorage.setItem("profile", JSON.stringify(profile));
                // Add User from Auth0 to our database if they don't exist yet
                dispatch(registerUser({
                    auth0Id: user.sub,
                    username: user.nickname,
                    email: user.email,
                    image: user.picture,
                    userType: user.role,
                }));
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();
        setIsAuthenticated(true);
        setUser(user);
        setLoading(false);
    };
    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client.loginWithRedirect({
                    authorizationParams: {
                        redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
                    }
                }),
                getTokenSilently: (...p) => auth0Client.getTokenSilently({
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                }),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout({
                    logoutParams: {
                        returnTo: process.env.REACT_APP_AUTH0_CALLBACK_URL,
                    }
                })
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};