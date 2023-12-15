/**
 * Copyright (c) 2021 @ OreOPS Framework Private Limited
 *
 * @summary OreOPS firebase for FireStore and Storage and Push Notification
 * @author Sathishkumar.K <sathish.k@oreops.com>
 * Created at     : 2021-01-01 00:00:00
 * Last modified  : 2021-04-01 00:00:00
 * 
 */

import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import { AsyncStorage } from 'react-native'

const MESSAGE = {
    SUCCESS: "Success",
    FAILURE: "Failed",
    ERROR: "Error",
    WARNING: "Warning",
    UNKNOWN: "Unknown",
    INVALID: "Invalid firebase config data",
    COLLECTIONNAMEREQUIRED: "Collection name required",
    ADDED: "added",
    MODIFIED: "modified",
    REMOVED: "removed"
}

const STATUS = {
    TRUE: true,
    FALSE: false
}

const TYPEOF = {
    UNDEFINED: "undefined",
    OBJECT: "object",
    ARRAY: "array",
    BOOLEAN: "boolean",
    NUMBER: "number",
    STRING: "string",
    FUNCTION: "function"
}

const DATA = {
    COLLECTIONNAME: "token"
}

export class FireStore {
    addCollection = (collectionName, data, docName) => {
        return new Promise((resolve, reject) => {
            try {
                if (!collectionName) {
                    resolve(this.result(STATUS.FALSE, MESSAGE.COLLECTIONREQUIRED));
                }
                var docId = data[docName];
                if (docName && docId) {
                    docId = docId.toString();
                    firestore().collection(collectionName).doc(docId).set(data).then(() => {
                        resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS));
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
                else {

                    firestore().collection(collectionName).doc(docName).set(data).then(() => {
                        resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS));
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
            } catch (error) {
                resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
            }
        });
    }

    deleteDocument = async (collectionName, documentName) => {
        try {
            return new Promise((resolve, reject) => {
                try {
                    firestore().collection(collectionName).doc(documentName).delete().then(() => {
                        resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, ""));
                    }).catch((error) => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                } catch (error) {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                }
            });
        } catch (error) {
            alert(error.toString());
        }

    }
    getDocuments = (collectionName) => {
        return new Promise((resolve, reject) => {
            try {
                firestore().collection(collectionName).get().then((snapshot) => {
                    let data = snapshot.docs.map(doc => doc.data());
                    resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data));
                }).catch(error => {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                });
            } catch (error) {
                resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
            }
        });
    }
    result = (status, message, data, error = "") => {
        return { status: status, message: message, data: data, error: error };
    }
    getDocumentSnapshots = (collectionName, documentName) => {
        try {
            firestore().collection(collectionName).doc(documentName).onSnapshot((doc) => {
                return this.result(STATUS.TRUE, MESSAGE.SUCCESS, doc.data());
            });
        } catch (error) {
            return this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString());
        }
    }
    getCollectionSnapshots = (collectionName, keyName, keyValue, callBackfunction) => {
        try {
            firestore().collection(collectionName).where(keyName, "==", keyValue).onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let result = null;
                    if (change.type === "added") {
                        result = this.result(STATUS.TRUE, MESSAGE.ADDED, change.doc.data());
                    }
                    if (change.type === "modified") {
                        result = this.result(STATUS.TRUE, MESSAGE.MODIFIED, change.doc.data());
                    }
                    if (change.type === "removed") {
                        result = this.result(STATUS.TRUE, MESSAGE.REMOVED, change.doc.data());
                    }

                    if (typeof window[callBackfunction] == 'function') {
                        window[callBackfunction](result);
                    }
                    else {
                        console.log(callBackfunction + " function not available in window component")
                    }
                });
            });
        } catch (error) {
            return this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString());
        }
    }
    getDocumentById = (collectionName, docId) => {
        return new Promise((resolve, reject) => {
            try {
                if (docId) {
                    firestore().collection(collectionName).doc(docId.toString()).get().then((docRef) => {
                        if (docRef.data()) {
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, docRef.data(), ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, docRef.data(), "No records found"));
                        }

                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
                else {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, "docId required", "docId required"));
                }
            } catch (error) {
                resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
            }
        });
    }
    getDocumentByFilter = (collectionName, filter) => {
        return new Promise((resolve, reject) => {
            try {
                var data = [];
                var collectionRef = firestore().collection(collectionName); 
                if(filter.length === 1){
                    collectionRef.where(filter[0].field, filter[0].operator, filter[0].value).get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                data.push(doc.data());
                            });
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data, ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, data, "No records found"));
                        }
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }               
                else if(filter.length === 2){
                    collectionRef.where(filter[0].field, filter[0].operator, filter[0].value).where(filter[1].field, filter[1].operator, filter[1].value).get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                data.push(doc.data());
                            });
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data, ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, data, "No records found"));
                        }
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
                else if(filter.length === 3){
                    collectionRef.where(filter[0].field, filter[0].operator, filter[0].value).where(filter[1].field, filter[1].operator, filter[1].value).where(filter[2].field, filter[2].operator, filter[2].value).get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                data.push(doc.data());
                            });
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data, ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, data, "No records found"));
                        }
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
                else if(filter.length === 4){
                    collectionRef.where(filter[0].field, filter[0].operator, filter[0].value).where(filter[1].field, filter[1].operator, filter[1].value).where(filter[2].field, filter[2].operator, filter[2].value).where(filter[3].field, filter[3].operator, filter[3].value).get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                data.push(doc.data());
                            });
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data, ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, data, "No records found"));
                        }
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
                else if(filter.length === 5){
                    collectionRef.where(filter[0].field, filter[0].operator, filter[0].value).where(filter[1].field, filter[1].operator, filter[1].value).where(filter[2].field, filter[2].operator, filter[2].value).where(filter[3].field, filter[3].operator, filter[3].value).where(filter[4].field, filter[4].operator, filter[4].value).get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                data.push(doc.data());
                            });
                            resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS, data, ""));
                        }
                        else {
                            resolve(this.result(STATUS.FALSE, MESSAGE.WARNING, data, "No records found"));
                        }
                    }).catch(error => {
                        resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                    });
                }
            } catch (error) {
                resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
            }
        });
    }
    addCollections = (collectionName, data, docName = "") => {
        return new Promise((resolve, reject) => {
            try {
                if (!collectionName) {
                    resolve(this.result(STATUS.FALSE, MESSAGE.COLLECTIONREQUIRED));
                }
                if (typeof data === TYPEOF.OBJECT && !Array.isArray(data)) {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ARRAYREQUIRED));
                }
                if (data.length === 0) {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ATLEASETONEREQUIRED));
                }
                var batch = this._db.batch();
                var docRef = null;
                var docId = null;
                data.forEach(doc => {
                    if (docName) {
                        docId = doc[docName].toString();
                        docRef = this._db.collection(collectionName).doc(docId);
                        batch.set(docRef, doc);
                    }
                    else {
                        docRef = this._db.collection(collectionName).doc();
                        batch.set(docRef, doc);
                    }
                });
                batch.commit().then(() => {
                    resolve(this.result(STATUS.TRUE, MESSAGE.SUCCESS));
                }).catch(error => {
                    resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
                });
            } catch (error) {
                resolve(this.result(STATUS.FALSE, MESSAGE.ERROR, error.message, error.toString()));
            }
        });
    }
}

export class FireStorage {

}

export class PushNotification {
    fcm = async () => {
        if (await AsyncStorage.getItem(DATA.COLLECTIONNAME) === "" || await AsyncStorage.getItem(DATA.COLLECTIONNAME) === undefined || await AsyncStorage.getItem(DATA.COLLECTIONNAME) === null) {
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            const Token = token
            // Send token to firestore database
            firestore().collection(DATA.COLLECTIONNAME).doc().set({ Token })
            AsyncStorage.setItem(DATA.COLLECTIONNAME, token)
        } else {
            //Nothing To Do
        }
    }
}