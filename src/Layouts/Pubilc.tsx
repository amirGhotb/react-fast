import React from "react";
import Spinner from "../Core/Components/Spinner";

export function Public(children: JSX.Element): JSX.Element {
    return <>
        <Spinner/>
        {children}
    </>
}

