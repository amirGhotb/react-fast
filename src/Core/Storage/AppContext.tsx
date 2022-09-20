import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from "./AppReducer";
import {InitContext} from "../../InitContext";
import {AppContextType} from "../Interfaces";

const systemItems: object = {
    spinner: false,
    alerts: []
}


const AppContext = createContext<AppContextType>({
    state: {...InitContext, ...systemItems},
    dispatch: () => null
});

function AppProvider({children}: { children: React.ReactElement }) {
    const [state, dispatch] = useReducer(AppReducer, {...InitContext, ...systemItems});

    useEffect(() => {
        dispatch({
            type: 'INIT_FROM_STORAGE',
        })
    }, [])

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider};
