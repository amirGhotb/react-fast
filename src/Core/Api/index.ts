import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../Storage/AppContext';
import axios from 'axios';
import PreProcess from "./PreProcess";
import BodyProcess from "../../Api/BodyProcess";
import ErrorHandle from "../../Api/ErrorHandle";
import {ApiInputType} from "../Interfaces";

const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};


export default function (input: ApiInputType, watch: Array<any>) {
    const [data, setData] = useState([{}, '']);
    const context = useContext(AppContext)
    const setSpinner = (active = false) => {
        context.dispatch({
            type: 'UPDATE',
            data: {spinner: active}
        })
    }
    const api = PreProcess(input.apiName, input.entry ?? {})
    const condition = input.condition === undefined ? true : input.condition

    useEffect(() => {
        if (condition) {
            setSpinner(true)
            setData([{}, apiStates.LOADING]);
            axios(api).then((response) => {
                setData([
                    BodyProcess(response),
                    apiStates.SUCCESS]);
                if (input.onSuccess) {
                    input.onSuccess(BodyProcess(response), response);
                }
                return response.data;
            }).catch((e) => {
                if (input.onError) {
                    input.onError(e);
                }
                ErrorHandle(e)
            }).finally(() => {
                setSpinner(false)
            });
        }
    }, watch);

    return data;
}
