import React from "react";
import Layouts from "../../Layouts";

export default function ({children, name}: { children: JSX.Element, name: string }): JSX.Element {
    return Layouts(children)[name] ?? <>{children}</>;
}
