export const reduxModel = (modelname, data) => {
    return {
        type: "MODEL",
        key: modelname,
        payload: data
    }
}
export const reduxGlobal = (modelname, data) => {
    return {
        type: "GLOBAL",
        key: modelname,
        payload: data
    }
}