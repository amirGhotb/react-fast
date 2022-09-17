import React, {createContext, useReducer, Dispatch, useEffect} from 'react';
import AppReducer, {DispatchTypeDelete, DispatchTypeUpdate} from "./AppReducer";
import {InitContext} from "../../InitContext";

const systemItems: object = {
    spinner: false,
    alerts: []
}

export interface AppContextType {
    state: { [key: string]: any };
    dispatch: Dispatch<DispatchTypeUpdate | DispatchTypeDelete>;
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
