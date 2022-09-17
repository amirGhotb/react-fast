import {useContext} from "react";
import {AppContext} from "../Core/Storage/AppContext";
import {AuthorizationType} from "../Core/Api";

export default function Authorization(): AuthorizationType {
    const context = useContext(AppContext);
    return {
        Authorization: context.state?.user?.token
    }
}
