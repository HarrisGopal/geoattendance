/**
 * Copyright (c) 2022 @ OreOPS Framework Private Limited
 *
 * @summary OreOPS Model Handler for Model Operations
 * @author YOGESH G <yogesh.g@oreops.com>
 * Created at     : 2022-07-28 00:00:00
 * Last modified  : 2022-07-28 00:00:00
 * 
 */

import OreApibinding from "./Ore_Databinding";
import OreControlbinding from './Ore_Controlbinding';

const OreModelHandler = {
    //To Push values from one model to another model
    async ModelPush(State, data, destmodel) {
        var modelname = OreApibinding.GetModelName(destmodel);
        var modelprop = OreApibinding.GetModelProperty(destmodel);
        var modeldata = OreApibinding.GetModelData(State, destmodel);
        if (data) {
            data = JSON.parse(JSON.stringify(data));
            if (modeldata) {
                var lsuniquekey = modelprop[0].uniquekey;
                if (!Array.isArray(modeldata[0])) {
                    var cnt = 0
                    for (var key in modeldata[0]) {
                        if (modeldata[0][key]) {
                            cnt = cnt + 1;
                            break;
                        }
                    }
                    if (cnt == 0) {
                        modeldata.pop();
                    }
                }
                if (lsuniquekey) {
                    if (Array.isArray(data)) {
                        var temp = data;
                        for (i = 0; i < temp.length; i++) {
                            var lsval = temp[i][lsuniquekey];
                            if (lsval != undefined)
                                var objIndex = modeldata.findIndex((obj => obj[lsuniquekey] == lsval));
                            if (objIndex != undefined && objIndex >= 0) {
                                modeldata[objIndex] = temp[i];
                                data = data.filter(function (item) {
                                    return item[lsuniquekey] != temp[i][lsuniquekey];
                                });
                            }
                        }
                        modeldata = await this.PushMethod(modeldata, data);
                    }
                    else {
                        var lsval = data[lsuniquekey];
                        if (lsval != undefined)
                            var objIndex = modeldata.findIndex((obj => obj[lsuniquekey] == lsval));
                        if (objIndex != undefined && objIndex >= 0) {
                            modeldata[objIndex] = data;
                        }
                        else {
                            modeldata.push(data);
                        }

                    }
                }
                else {
                    modeldata = await this.PushMethod(modeldata, data);
                }
            }
            else {
                modeldata = await this.PushMethod(modeldata, data);
            }
            State.state.datamodal.models[modelname] = modeldata;
            OreControlbinding.setDataModelsNew(State, modelname);
            await OreApibinding.HandleMobileStorage(destmodel, modeldata);
            return { status: true, message: '', data: '' };
        }
        else {
            return { status: false, message: 'No Input Data', data: data };
        }
    },
    async PushMethod(destination, source) {
        if (Array.isArray(source)) {
            destination.push(...source);
        }
        else {
            destination.push(source);
        }
        return destination;
    },
    /* For Model Insert, Update and Update all use Model Push */

    // Model Insert
    async ModelInsert(State, source, destination) {
        var modelsrcdata = OreApibinding.GetModelData(State, source);
        var modelname = OreApibinding.GetModelName(destination);

        if (modelsrcdata) {
            if (modelname) {
                return await OreApibinding.ModelPush(State, modelsrcdata, destination)
            } else {
                return { status: false, message: 'Destination Model Not Found', data: destination };
            }
        } else {
            return { status: false, message: 'No Data in Source Model', data: modelsrcdata };
        }
    },
    // Model Insert
    async ModelUpdate(State, source, destination) {
        var modelsrcdata = OreApibinding.GetModelData(State, source);
        var modelname = OreApibinding.GetModelName(destination);

        if (modelsrcdata) {
            if (modelname) {
                return await OreApibinding.ModelPush(State, modelsrcdata, destination)
            } else {
                return { status: false, message: 'Destination Model Not Found', data: destination };
            }
        } else {
            return { status: false, message: 'No Data in Source Model', data: modelsrcdata };
        }
    },
    // Model Insert
    async ModelUpdateall(State, source, destination) {
        var modelsrcdata = OreApibinding.GetModelData(State, source);
        var modelname = OreApibinding.GetModelName(destination);

        if (modelsrcdata) {
            if (modelname) {
                return await OreApibinding.ModelPush(State, modelsrcdata, destination)
            } else {
                return { status: false, message: 'Destination Model Not Found', data: destination };
            }
        } else {
            return { status: false, message: 'No Data in Source Model', data: modelsrcdata };
        }
    },
    // Model Truncate
    async ModelTruncate(State, model) {
        var modeldata = OreApibinding.GetModelData(State, model);
        var modelname = OreApibinding.GetModelName(model);
        if (modeldata) {
            State.state.datamodal.models[modelname] = [];
            await OreApibinding.HandleMobileStorage(model, []);
            OreControlbinding.setDataModelsNew(State, modelname);
            return { status: true, message: 'Successfully Truncated', data: State.state.datamodal.models[modelname] };
        } else {
            return { status: false, message: 'Model not found', data: modeldata };
        }
    },
    // Model Delete
    async ModelDelete(State, modelcode, isuniquekey, fieldvalue) {
        var modelprop = OreApibinding.GetModelProperty(modelcode);
        var modelname = OreApibinding.GetModelName(modelcode);
        if (modelname) {
            var ldata = State.state.datamodal.models[modelname];
            var uniquekey = modelprop[0].uniquekey;
        } else {
            return { status: false, message: 'Model not found' };
        }
        var removeByAttr = function (arr, attr, value) {
            var i = arr.length;
            while (i--) {
                if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {

                    arr.splice(i, 1);

                }
            }
            return arr;
        }
        if (isuniquekey) {
            var lsdatatype = typeof (fieldvalue);
            if (lsdatatype === "number") {
                lsdatatype = "Integer";
            }
            if (uniquekey) {
                var datatype = OreApibinding.GetModelFieldDataType(modelcode, uniquekey);
                if (datatype.data === lsdatatype) {
                    let obj = ldata.find(o => o[uniquekey] === fieldvalue);
                    if (obj != undefined) {
                        State.state.datamodal.models[modelname] = removeByAttr(ldata, uniquekey, fieldvalue);
                        await OreApibinding.HandleMobileStorage(modelcode, State.state.datamodal.models[modelname]);
                        OreControlbinding.setDataModelsNew(State, modelname);
                        return { status: true, message: 'Successfully Deleted by field name', data: State.state.datamodal.models[modelname] };
                    } else {
                        return { status: false, message: "Condition Not Satisfied" };
                    }
                } else {
                    return { status: false, message: `Datatype Mismatch in uniquekey :${datatype.data} condition : ${lsdatatype} ` };
                }
            } else {
                return { status: false, message: 'Uniquekey not found' };
            }
        } else {
            /*  */
            var la = [];
            var data = ldata.filter(function (item) {
                window.item = item;
                return eval(fieldvalue);
            });
            if (data && data.length > 0) {
                // for (var i = 0; i < data.length; i++) {
                //   la = removeByAttr(ldata, uniquekey, data[i][uniquekey]);
                // }
                State.state.datamodal.models[modelname] = data;
                await OreApibinding.HandleMobileStorage(modelcode, data);
                OreControlbinding.setDataModelsNew(State, modelname);
                return { status: true, message: 'Successfully Deleted by field name', data: State.state.datamodal.models[modelname] };
            } else {
                return { status: false, message: "Condition Not Satisfied" };
            }

        }

    },
    // Model Copy
    async ModelCopy(State, source, destination) {
        var modelsrcprop = OreApibinding.GetModelProperty(source);
        var modelsrcdata = OreApibinding.GetModelData(State, source);
        var modeldesprop = OreApibinding.GetModelProperty(destination);
        var modeldesdata = OreApibinding.GetModelData(State, destination);

        if (modelsrcdata) {
            if (modeldesdata) {
                var modelname = OreApibinding.GetModelName(destination);
                modeldesprop = modelsrcprop;
                modeldesdata = modelsrcdata;

                State.state.datamodal.models[modelname] = modeldesdata;
                OreControlbinding.setDataModelsNew(State, modelname);
                await OreApibinding.HandleMobileStorage(destination, modeldesdata);
                return { status: true, message: 'Successfully Copied' };
            } else {
                return { status: false, message: 'No Data in Destination Model' };
            }
        } else {
            return { status: false, message: 'No Data in Source Model' };
        }
    },
    // Model Clone
    async ModelClone(State, source, destination) {
        var modelsrcprop = OreApibinding.GetModelProperty(source);
        var modelsrcdata = OreApibinding.GetModelData(State, source);
        var modeldesprop = OreApibinding.GetModelProperty(destination);
        var modeldesdata = OreApibinding.GetModelData(State, destination);

        if (modelsrcdata) {
            if (modeldesdata) {
                var modelname = OreApibinding.GetModelName(destination);
                modeldesprop = modelsrcprop;
                if (Array.isArray(modelsrcdata) && Array.isArray(modeldesdata)) {
                    modeldesdata = [...modelsrcdata];
                }
                else {
                    modeldesdata = { ...modelsrcdata };
                }
                State.state.datamodal.models[modelname] = modeldesdata;
                OreControlbinding.setDataModelsNew(State, modelname);
                await OreApibinding.HandleMobileStorage(destination, modeldesdata);
                return { status: true, message: 'Successfully Cloned' };
            } else {
                return { status: false, message: 'No Data in Destination Model' };
            }
        } else {
            return { status: false, message: 'No Data in Source Model' };
        }
    },
}

export default OreModelHandler;