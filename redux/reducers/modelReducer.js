export const modelReducer = (state = {}, action) => {
    const modelName = action.key;
    switch (action.type) {
        case 'MODEL':
            state[modelName] = action.payload
            return state
        default:
            return state
    }
}