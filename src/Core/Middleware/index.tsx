import React from "react";
import Middleware from "../../Middlewares";

export default function ({children, name}: { children: JSX.Element, name: string }): JSX.Element {
    return Object.keys(Middleware).includes(name) ? <>{Middleware[name](children)}</> : <>{children}</>;
}
