import React, {useEffect, useState} from "react";
import Middleware from "../../Middlewares";
import {useNavigate} from "react-router-dom";
import {getRoutePath} from "../Routes/RouteSelf";

export default function ({children, name}: { children: JSX.Element, name: string }): JSX.Element {
    const navigate = useNavigate();
    const [condition, setCondition] = useState(true)
    useEffect(() => {
        if (Object.keys(Middleware()).includes(name)) {
            const temp = Middleware()[name].condition();
            setCondition(temp)
            if (!temp) {
                navigate(getRoutePath(Middleware()[name].redirect))
            }
        } else {
            setCondition(true)
        }
    }, [name])
    return condition ? <>{children}</> : <></>;
}
