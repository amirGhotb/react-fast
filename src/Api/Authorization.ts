import {useContext} from "react";
import {AppContext} from "../Core/Storage/AppContext";

export default function Authorization(): object {
    const context = useContext(AppContext);
    return {
        Authorization: context.state?.user?.token
    }
}
