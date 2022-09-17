const InitContext: object = {
    showSidebar: false,
    userInfo: {}
};

const ItemsToStorage: { [key: string]: 'local' | 'session' } = {
    userInfo: 'session'
}

export {InitContext, ItemsToStorage};
