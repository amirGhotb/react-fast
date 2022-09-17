import {ItemsToStorage} from "../../InitContext";
import Store from "./Store";

function deleteF(prevState: { [key: string]: any }, data: Array<string>): object {
    data.forEach(item => {
        delete prevState[item];
    })
    return {...prevState}
}

export interface DispatchTypeInitFromStorage {
    type: 'INIT_FROM_STORAGE',
}

export interface DispatchTypeUpdate {
    type: 'UPDATE',
    data: { [key: string]: any }
}

export interface DispatchTypeDelete {
    type: 'DELETE',
    data: Array<string>
}

export default function AppReducer(prevState: { [key: string]: any },
                                   action: DispatchTypeInitFromStorage | DispatchTypeUpdate |
                                       DispatchTypeDelete) {

    const itemsToStorage = ItemsToStorage;
    const itemsToStorageKeys = Object.keys(itemsToStorage)
    const dataStorageLocal: { [key: string]: any } = (new Store('local')).get('data');
    const dataStorageSession: { [key: string]: any } = (new Store('session')).get('data');

    function storeToStorage() {
        (new Store('local')).store('data', dataStorageLocal).then();
        (new Store('session')).store('data', dataStorageSession).then();
    }

    switch (action.type) {
        case 'INIT_FROM_STORAGE': {
            return {...prevState, ...dataStorageLocal, ...dataStorageSession}
        }

        case 'UPDATE': {
            const keysToStore = Object.keys(action.data).filter(item => itemsToStorageKeys.findIndex(i => i == item) !== -1);
            keysToStore.forEach(item => {
                if (itemsToStorage[item] === 'local') {
                    dataStorageLocal[item] = action.data[item];
                }
                if (itemsToStorage[item] === 'session') {
                    dataStorageSession[item] = action.data[item];
                }
            });
            storeToStorage();
            return {...prevState, ...action.data}
        }
        case 'DELETE': {
            const keysToStore = action.data.filter(item => itemsToStorageKeys.findIndex(i => i == item) !== -1);
            keysToStore.forEach(item => {
                if (itemsToStorage[item] === 'local') {
                    delete dataStorageLocal[item];
                }
                if (itemsToStorage[item] === 'session') {
                    delete dataStorageSession[item];
                }

            });
            storeToStorage();
            return deleteF(prevState, action.data)
        }
    }
}
