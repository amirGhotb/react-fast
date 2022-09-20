import {ItemToStorageType} from "./Core/Interfaces";

const InitContext: object = {
    showSidebar: false,
    userInfo: {}
};

const ItemsToStorage: ItemToStorageType = {
    userInfo: 'session'
}

export {InitContext, ItemsToStorage};
