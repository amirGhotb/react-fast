import React, {useContext, useState} from "react";
import {AppContext} from "../../Core/Storage/AppContext";
import Api from "../../Core/Api";
import {useToast} from "../../Core/Components/Toast";
import reactFastLogo from '../../Assets/Images/reactFast.png';
import {useNavigate} from "react-router-dom";
import {getRoutePath} from "../../Core/Routes/RouteSelf";

export default function Home(): JSX.Element {
    const {state, dispatch} = useContext(AppContext);
    const [flag, setFlag] = useState(false);
    const context = useContext(AppContext)
    const toast = useToast();
    const navigate = useNavigate();
    Api({
            apiName: 'employees',
            onSuccess: (body, response) => {
                console.log(body, response);
            },
            condition: flag
        }, [flag]
    )

    return (
        <div>
            <img className={'react-fast-logo'} src={reactFastLogo} alt=""/>
            <button onClick={() => {
                navigate(getRoutePath('panelHome'))
            }}>
                click
            </button>
            <button onClick={() => {
                toast.show({text: 'hello', type: 'warning'})
            }}>
                click
            </button>
            <button onClick={() => {
                toast.show({text: 'hello', type: 'danger'})
            }}>
                click
            </button>
            {state.spinner}
        </div>
    )
}
