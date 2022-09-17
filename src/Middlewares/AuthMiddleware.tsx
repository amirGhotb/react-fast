import React from "react";
import {useNavigate} from "react-router-dom";

export function AuthMiddleware(children: JSX.Element): JSX.Element {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (true) {
    //         navigate(getRoutePath('home'))
    //     }
    // }, [])

    return <>{children}</>;
}

