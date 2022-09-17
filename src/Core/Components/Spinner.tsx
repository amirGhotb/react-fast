import React, {useContext} from "react";
import HashLoader from "react-spinners/HashLoader";
import {AppContext} from "../Storage/AppContext";

export default function Spinner(): JSX.Element {
    const context = useContext(AppContext)
    return <div className={`spinner-box ${context.state.spinner ? '' : 'spinner-box-disable'}`}>
        <HashLoader loading={true} cssOverride={{position: 'absolute', top: '35%', right: '46%'}} size={150}
                    color={"#ffffff"}/>
    </div>
}
