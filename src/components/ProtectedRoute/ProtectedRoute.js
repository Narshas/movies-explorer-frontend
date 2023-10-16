// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ loggedIn, children }) {
    const navigate = useNavigate();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!loggedIn && !shouldRedirect) {
            console.log("Not logged in. Redirecting...");
            setShouldRedirect(true);
            navigate('/', { replace: true });
        }
    }, [loggedIn, navigate, shouldRedirect]);

    if (!loggedIn && !shouldRedirect) {
        console.log("Not logged in. Returning null.");
        return null;
    }

    console.log("Logged in. Displaying children...");
    return children;
}
