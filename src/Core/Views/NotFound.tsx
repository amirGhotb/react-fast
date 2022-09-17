import React from "react";
import logo from '../../Assets/Images/404.svg'
export default function NotFound(): JSX.Element {

    return <div>
        <img className={'not-found-img'} src={logo} alt=""/>
    </div>
}
