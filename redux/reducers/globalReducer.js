export const globalReducer = (state = {}, action) => {
    const modelName = action.key;
    switch (action.type) {
        case 'GLOBAL':
            state[modelName] = action.payload
            return state
        default:
            return state
    }
}
