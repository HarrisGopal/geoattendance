/*!
 * OreOPS Mobile library v1.0.0
 * (c) - http://oreops.com/
 * License:(http://oreops.com)
 * Created Date :04-03-2020
 */
import { OreAlert } from 'react-native-oreopscomponent/components/OreAlert';
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import { getModel } from 'react-native-device-info';
import OreApibinding from './Ore_Databinding';
import { Platform } from 'react-native'
//Global name from IDE for each controls
const OreControlType = {
    OreTextBox: "Textarea",
    OreButton: "Button",
    OreCheckBox: "checkbox",
    OreSwitch: "switch",
    OreDatePicker: "date",
    OreText: "h1",
    OreHeader: "Header",
    OreFooter: "",
    OreImage: "IMG",
    OreIcon: "icon",
    OreRadioButton: "radio",
    OreListview: "listview",
    OreCardView: "",
    OrePicker: "Picker",
    OreAlert: "",
    OreFilePicker: "FilePicker",
    OreDrawer: "",
    OreQrCode: "qrcode",
    OreMap: "map",
    OreVideo: "video",
    OreHtml: "htmlviewer",
    OreFlat: "Flat",
    OreChart: "chart",
    OreYoutube: "youtubecontrol",
    OreCalendar: "Calendar"
}

//Global Methods 
const OreDatabinding = {
    getValue(stateval) {
        try {
            if (stateval.state.datamodal.controls != undefined && stateval.state.datamodal.controls != 'undefined'
                && stateval.state.datamodal.controls != '' && stateval.state.datamodal.controls.length > 0) {
                //console.log(stateval.state.datamodal.controls.length);
                for (let i = 0; i < stateval.state.datamodal.controls.length; i++) {
                    const controlname = stateval.state.datamodal.controls[i]
                    //alert(controlname)
                    if (stateval.state.orepageproperty[controlname]['Property']['datafield'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'].includes('#')) {
                        var datagroup = this.getDataGroup(stateval, controlname);

                        //Redux changes on 04-04-2023 By ORE036
                        var datagroupcode = this.getDataGroupCode(stateval, controlname);
                        let modelprop = OreApibinding.GetModelProperty(datagroupcode);
                        //------------

                        var datafield = this.getDataField(stateval, controlname);
                        var controltype = Orefuncs.GetControlType(controlname, stateval.state);
                        //Need a provision save a control value in collection [OLS-I626 21-06-2022 ORE025]                       
                        datafield = this.changeasyncmultiplevalueDir(datafield)
                        //End [OLS-I626 21-06-2022 ORE025]
                        //console.log(datafield);
                        switch (controltype) {
                            case OreControlType.OreTextBox:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OrePicker:
                                //console.log("pickerval:" + Orefuncs.GetValue(controlname, stateval.state));
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreCheckBox:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreRadioButton:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreText:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreButton:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreSwitch:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreImage:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreQrCode:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreHeader:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreHtml:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreDatePicker:
                                //console.log("OreDatePicker:" + Orefuncs.GetValue(controlname, stateval.state));                            
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreIcon:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreFilePicker:
                                //stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                // Fileupload start-21-05-2022 by kathir
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state, stateval.state.orepageproperty[controlname]['Property']['uploadable']))
                                //End
                                break;
                            case OreControlType.OreYoutube:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                            case OreControlType.OreCalendar:
                                stateval.state.datamodal.models[datagroup] = OreApibinding.SetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield, Orefuncs.GetValue(controlname, stateval.state))
                                break;
                        }
                        //Redux changes on 04-04-2023 By ORE036
                        try {
                            if (stateval.state.orepageproperty[controlname]['Property']['modelsync'] == true && modelprop[0].reduxstorage == true) {
                                this.modelSync(stateval, datagroupcode, datafield, datagroup)
                            }
                        } catch (error) {
                            console.log("getValue:Model Sync Error:" + controlname + '- ' + error)
                        }
                        //---------
                    } else {
                        console.log("getValue: datafield is empty for " + controlname);
                    }
                }
                //console.log("get value" + JSON.stringify(stateval.state.datamodal.models["SenderEmailsRequst"]))
                stateval.setState({
                    datamodal: stateval.state.datamodal
                });
            }
        } catch (e) {
            console.error(e)
        }
    },
    setValue(stateval, modelcode) {
        try {
            //Live-Safety-Preview error occur while navigate from home page,unable to continue the app execution.OLS-I365-On 22-04-2022 by ORE034
            if (stateval == "" || stateval == undefined || stateval == "undefined") {
                stateval = window["Page_01"].state;
            }
            //End OLS-I365-On 22-04-2022 by ORE034
            if (stateval.state.datamodal.controls != undefined && stateval.state.datamodal.controls != 'undefined'
                && stateval.state.datamodal.controls != '' && stateval.state.datamodal.controls.length > 0) {
                for (let i = 0; i < stateval.state.datamodal.controls.length; i++) {
                    const controlname = stateval.state.datamodal.controls[i];
                    //console.log(JSON.stringify(stateval.state.orepageproperty[controlname]));
                    if (stateval.state.orepageproperty[controlname]['Property']['datafield'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'].includes('#')) {
                        var datagroup = this.getDataGroup(stateval, controlname);
                        var datafield = this.getDataField(stateval, controlname);
                        var datafieldvalue;
                        //Need a provision save a control value in collection [OLS-I626 21-06-2022 ORE025]
                        datafield = this.changeasyncmultiplevalueDir(datafield)
                        if (Array.isArray(stateval.state.datamodal.models[datagroup])) {
                            if (datafield && datafield.includes("[") && datafield.includes("]")) {
                                datafieldvalue = Orefuncs.getdatafromobjectorarrayusingstringpath(stateval.state.datamodal.models[datagroup], datafield);
                            } else {
                                datafieldvalue = OreApibinding.GetObjectFieldValue(stateval.state.datamodal.models[datagroup], [0].datafield);
                            }
                        } else {
                            datafieldvalue = OreApibinding.GetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield);
                        }
                        //End[OLS-I626 21-06-2022 ORE025]
                        //console.log("controlname: " + controlname + " , datafield: " + datafield + ", value: " + datafieldvalue);
                        var cmodelcode = stateval.state.orepageproperty[controlname]['Property']['datamodel'].split('#')[0];
                        //console.log("PROPMODELCODE: "+ cmodelcode + ", MODELCODE: " + modelcode);                        
                        if (cmodelcode === modelcode) {
                            var controltype = Orefuncs.GetControlType(controlname, stateval.state);
                            //console.log(controltype);
                            switch (controltype) {
                                case OreControlType.OreTextBox:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OrePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreCheckBox:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreRadioButton:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreText:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreButton:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreSwitch:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreImage:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreQrCode:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreHeader:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreHtml:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreDatePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreIcon:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreFilePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreYoutube:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                            }
                        }
                    } else {
                        console.log("setValue: datafield is empty for " + controlname + " and datafield " + stateval.state.orepageproperty[controlname]['Property']['datafield']);
                    }
                }
            }
        } catch (e) {
            console.error(e)
        }
    },
    setValueField(stateval, modelcode, modelfield) {
        try {
            if (stateval.state.datamodal.controls != undefined && stateval.state.datamodal.controls != 'undefined'
                && stateval.state.datamodal.controls != '' && stateval.state.datamodal.controls.length > 0) {
                for (let i = 0; i < stateval.state.datamodal.controls.length; i++) {
                    const controlname = stateval.state.datamodal.controls[i];
                    //console.log(JSON.stringify(stateval.state.orepageproperty[controlname]));
                    if (stateval.state.orepageproperty[controlname]['Property']['datafield'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'] &&
                        stateval.state.orepageproperty[controlname]['Property']['datamodel'].includes('#')) {
                        var datafield = this.getDataField(stateval, controlname);
                        var datagroup = this.getDataGroup(stateval, controlname);
                        var cmodelcode = stateval.state.orepageproperty[controlname]['Property']['datamodel'].split('#')[0];
                        //console.log("modelsetvalue: " + datafield, modelfield);
                        if (cmodelcode === modelcode && (datafield === modelfield || datafield == ("[0]." + modelfield))) {
                            var controltype = Orefuncs.GetControlType(controlname, stateval.state);
                            // var datafieldvalue = OreApibinding.GetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield);
                            var datafieldvalue;
                            //console.log(controltype);
                            //to find datafield value On 15-03-2022 ORE025
                            if (Array.isArray(stateval.state.datamodal.models[datagroup])) {
                                if (datafield && datafield.includes("[0]")) {
                                    datafieldvalue = Orefuncs.getdatafromobjectorarrayusingstringpath(stateval.state.datamodal.models[datagroup], datafield);
                                } else {
                                    datafieldvalue = OreApibinding.GetObjectFieldValue(stateval.state.datamodal.models[datagroup], [0].datafield);
                                }
                            } else {
                                datafieldvalue = OreApibinding.GetObjectFieldValue(stateval.state.datamodal.models[datagroup], datafield);
                            }
                            //End On 15-03-2022 ORE025
                            switch (controltype) {
                                case OreControlType.OreTextBox:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OrePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreCheckBox:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreRadioButton:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreText:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreButton:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreSwitch:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreImage:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreQrCode:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreHeader:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreHtml:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreDatePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreIcon:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreFilePicker:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                                case OreControlType.OreYoutube:
                                    Orefuncs.SetValue(controlname, stateval.state, datafieldvalue);
                                    break;
                            }
                        }
                    } else {
                        console.log("setValueField: datafield is empty for " + controlname + " and datafield " + stateval.state.orepageproperty[controlname]['Property']['datafield']);
                    }
                }
            }
        } catch (e) {
            console.error(e)
        }
    },
    setDataModels(stateval) {
        try {
            //console.log(stateval.state);
            //console.log(stateval.state.datasource);
            if (stateval.state.datamodal.controls != undefined && stateval.state.datamodal.controls != 'undefined'
                && stateval.state.datamodal.controls != '' && stateval.state.datamodal.controls.length > 0) {
                for (let i = 0; i < stateval.state.datamodal.controls.length; i++) {
                    const controlname = stateval.state.datamodal.controls[i];
                    var modelname = OreApibinding.GetModelNameByControlName(stateval, controlname);
                    if (modelname) {
                        if (stateval.state.datamodal.models[modelname]) {
                            switch (Orefuncs.GetControlType(controlname, stateval.state)) {
                                case OreControlType.OrePicker:
                                    if (Platform.OS == 'ios' && stateval.state.datamodal.models[modelname]) {
                                        var res = stateval.state.datamodal.models[modelname].map(obj => {
                                            obj["value"] = obj[stateval.state.orepageproperty[controlname]['Property']['valueField']];
                                            obj["label"] = obj[stateval.state.orepageproperty[controlname]['Property']['nameField']];
                                            return obj;
                                        });
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = res
                                    } else {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    }
                                    break
                                case OreControlType.OreCheckBox:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreRadioButton:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreListview:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = [];
                                    setTimeout(() => {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    }, 1000)
                                    break;
                                case OreControlType.OreFlat:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = [];
                                    setTimeout(() => {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                    }, 1000)
                                    break;
                                case OreControlType.OreChart:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreMap:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                            }
                        }
                    } else {
                        //console.log("setDataModels: Data model not found for " + controlname);
                    }
                }

                stateval.setState({
                    orepageproperty: stateval.state.orepageproperty
                })
            }
        } catch (e) {
            console.log(e)
        }
    },
    setDataModelsNew(stateval, modelcode) {
        try {
            if (stateval.state.datamodal.controls != undefined && stateval.state.datamodal.controls != 'undefined'
                && stateval.state.datamodal.controls != '' && stateval.state.datamodal.controls.length > 0) {
                for (let i = 0; i < stateval.state.datamodal.controls.length; i++) {
                    const controlname = stateval.state.datamodal.controls[i];
                    var modelname = OreApibinding.GetModelNameByControlName(stateval, controlname);
                    if (modelname == modelcode) {
                        if (stateval.state.datamodal.models[modelname]) {
                            switch (Orefuncs.GetControlType(controlname, stateval.state)) {
                                case OreControlType.OrePicker:
                                    if (Platform.OS == 'ios' && stateval.state.datamodal.models[modelname]) {
                                        var res = stateval.state.datamodal.models[modelname].map(obj => {
                                            obj["value"] = obj[stateval.state.orepageproperty[controlname]['Property']['valueField']];
                                            obj["label"] = obj[stateval.state.orepageproperty[controlname]['Property']['nameField']];
                                            return obj;
                                        });
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = res
                                    } else {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    }
                                    break
                                case OreControlType.OreCheckBox:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreRadioButton:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreListview:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = [];
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreFlat:
                                    if (stateval.state.orepageproperty[controlname]['Property']['onDemandLoading'] && !stateval.state.orepageproperty[controlname]['Property']['fromApi']) {
                                        if (stateval.state.datamodal.models[modelname] == undefined || stateval.state.datamodal.models[modelname].length == 0) {
                                            stateval.state.orepageproperty[controlname]['Property']['scrollComplete'] = true
                                            stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        } else {
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                            const datatest = stateval.state.orepageproperty[controlname]['Property']['data1'].slice((stateval.state.orepageproperty[controlname]['Property']['offset'] * stateval.state.orepageproperty[controlname]['Property']['load']), ((stateval.state.orepageproperty[controlname]['Property']['offset'] + 1) * stateval.state.orepageproperty[controlname]['Property']['load']))
                                            stateval.state.orepageproperty[controlname]["Property"]["data"] = [...datatest]
                                            stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                            stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        }
                                        stateval.setState({
                                            orepageproperty: stateval.state.orepageproperty
                                        })
                                    } else if (stateval.state.orepageproperty[controlname]['Property']['onDemandLoading'] && stateval.state.orepageproperty[controlname]['Property']['fromApi']) {
                                        if (stateval.state.datamodal.models[modelname] == undefined || stateval.state.datamodal.models[modelname].length == 0) {
                                            stateval.state.orepageproperty[controlname]['Property']['scrollComplete'] = true
                                            stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        }
                                        if (stateval.state.orepageproperty[controlname]['Property']['offset'] == 1) {
                                            stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                            stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                            stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                            stateval.setState({
                                                orepageproperty: stateval.state.orepageproperty
                                            })
                                        } else {
                                            console.log(JSON.stringify(stateval.state.datamodal.models[modelname]))
                                            stateval.state.orepageproperty[controlname]['Property']['data'] = [...stateval.state.orepageproperty[controlname]["Property"]["data"], ...stateval.state.datamodal.models[modelname]];
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = [...stateval.state.orepageproperty[controlname]["Property"]["data1"], ...stateval.state.datamodal.models[modelname]];
                                            stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                            stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                            stateval.setState({
                                                orepageproperty: stateval.state.orepageproperty
                                            })
                                        }

                                    } else {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                        stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        stateval.setState({
                                            orepageproperty: stateval.state.orepageproperty
                                        })
                                    }
                                    break;
                                case OreControlType.OreChart:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                                case OreControlType.OreMap:
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                    break;
                            }
                        }
                    } else {
                    }
                }
                stateval.setState({
                    orepageproperty: stateval.state.orepageproperty
                })
            }
        } catch (e) {
            console.log(e)
        }
    },
    getDataModels(stateval) {
        try {
            if (stateval.state.datasource.controls != undefined && stateval.state.datasource.controls != 'undefined'
                && stateval.state.datasource.controls != '' && stateval.state.datasource.controls.length > 0) {
                for (let i = 0; i < stateval.state.datasource.controls.length; i++) {
                    const controlname = stateval.state.datasource.controls[i]
                    if (stateval.state.orepageproperty[controlname]['Property']['datasource']) {
                        var datasource = stateval.state.orepageproperty[controlname]['Property']['datasource'];
                        if (stateval.state.datasource.models[datasource]) {
                            switch (Orefuncs.GetControlType(controlname, stateval.state)) {
                                case OreControlType.OrePicker:
                                    stateval.state.datasource.models[datasource] = stateval.state.orepageproperty[controlname]['Property']['name'];
                                    break;
                            }
                        }
                    } else {
                        console.log("Data model not found")
                    }
                }
                stateval.setState({
                    datasource: stateval.state.datasource
                })
            }
        } catch (e) {
            console.log(e)
        }
    },

    setDataModel(stateval, controlname, modelname) {
        try {
            //console.log(controlname,modelname);
            //console.log(stateval.state.datamodal.models[modelname]);
            //console.log("control:" +JSON.stringify(stateval.state.orepageproperty[controlname])+"\n\n\n");

            //console.log("datasource:" +JSON.stringify(stateval.state.orepageproperty[controlname]['Property']));
            //console.log(stateval.state.orepageproperty);
            //console.log("first: " +JSON.stringify(stateval.state.orepageproperty["TextBox_1"]));
            if (stateval && controlname && modelname) {
                if (stateval.state.orepageproperty[controlname]['Property']['datasource']) {
                    if (stateval.state.datamodal.models[modelname] != undefined && stateval.state.datamodal.models[modelname] != null) {
                        switch (Orefuncs.GetControlType(controlname, stateval.state)) {
                            case OreControlType.OrePicker:
                                if (Platform.OS == 'ios' && stateval.state.datamodal.models[modelname]) {
                                    var res = stateval.state.datamodal.models[modelname].map(obj => {
                                        obj["value"] = obj[stateval.state.orepageproperty[controlname]['Property']['valueField']];
                                        obj["label"] = obj[stateval.state.orepageproperty[controlname]['Property']['nameField']];
                                        return obj;
                                    });
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = res
                                } else {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['selected'] = stateval.state.datamodal.models[modelname][0][stateval.state.orepageproperty[controlname]['Property']['valueField']];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                break;
                            case OreControlType.OreFlat:
                                if (stateval.state.orepageproperty[controlname]['Property']['onDemandLoading'] && !stateval.state.orepageproperty[controlname]['Property']['fromApi']) {
                                    if (stateval.state.datamodal.models[modelname] == undefined || stateval.state.datamodal.models[modelname].length == 0) {
                                        stateval.state.orepageproperty[controlname]['Property']['scrollComplete'] = true
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                    } else {
                                        stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                        const datatest = stateval.state.orepageproperty[controlname]['Property']['data1'].slice((stateval.state.orepageproperty[controlname]['Property']['offset'] * stateval.state.orepageproperty[controlname]['Property']['load']), ((stateval.state.orepageproperty[controlname]['Property']['offset'] + 1) * stateval.state.orepageproperty[controlname]['Property']['load']))
                                        stateval.state.orepageproperty[controlname]["Property"]["data"] = [...datatest]
                                        stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                    }
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                } else if (stateval.state.orepageproperty[controlname]['Property']['onDemandLoading'] && stateval.state.orepageproperty[controlname]['Property']['fromApi']) {
                                    if (stateval.state.datamodal.models[modelname] == undefined || stateval.state.datamodal.models[modelname].length == 0) {
                                        stateval.state.orepageproperty[controlname]['Property']['scrollComplete'] = true
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                    }
                                    if (stateval.state.orepageproperty[controlname]['Property']['offset'] == 1) {
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                        stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                        stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        stateval.setState({
                                            orepageproperty: stateval.state.orepageproperty
                                        })
                                    } else {
                                        console.log(JSON.stringify(stateval.state.datamodal.models[modelname]))
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = [...stateval.state.orepageproperty[controlname]["Property"]["data"], ...stateval.state.datamodal.models[modelname]];
                                        stateval.state.orepageproperty[controlname]['Property']['data1'] = [...stateval.state.orepageproperty[controlname]["Property"]["data1"], ...stateval.state.datamodal.models[modelname]];
                                        stateval.state.orepageproperty[controlname]['Property']['offset'] = stateval.state.orepageproperty[controlname]['Property']['offset'] + 1;
                                        stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                        stateval.setState({
                                            orepageproperty: stateval.state.orepageproperty
                                        })
                                    }
                                } else {

                                    //Flat List - Search Filter  Issue while Coming back after Navigation.OLS-I298-On 21-03-2022 by ORE034
                                    if (stateval.state.orepageproperty[controlname]["Property"]["searchValue"].length > 0) {
                                        const datatest = stateval.state.orepageproperty[controlname]["Property"]["data1"].filter(item => {
                                            return Object.keys(item).some(key =>
                                                //Live-Flatlist-Preview- Serach value not get clear while open the Flatlist and filter condition also applied to Flatlist OLS-I708 on 08-08-2022 by ORE034
                                                // JSON.stringify(item).toString().toLowerCase().includes(stateval.state.orepageproperty[controlname]["Property"]["searchValue"])
                                                JSON.stringify(item).toString().toLowerCase().includes(stateval.state.orepageproperty[controlname]["Property"]["searchValue"].toLowerCase())
                                                //End OLS-I708 on 08-08-2022 by ORE034
                                            );
                                        });
                                        stateval.state.orepageproperty[controlname]['Property']['data'] = datatest
                                        //stateval.state.orepageproperty[controlname]['Property']['data1'] = datatest
                                    }
                                    //End OLS-I298-On 21-03-2022 by ORE034
                                    else {
                                        var modeltype=Array.isArray(stateval.state.datamodal.models[modelname])
                                        //Tactive -iOS-App crash while enter the value in message list search option[OLS-I1035 10/01/2023 ORE050]
                                        //OLS-I1233 Usecase - Issue Tracker - Notification Box - After page loaded, App getting crashed.by Ore049
                                        //if (stateval.state.datamodal.models[modelname] == "" ) {
                                            if (stateval.state.datamodal.models[modelname] == "") {  
                                            stateval.state.orepageproperty[controlname]['Property']['data'] = [];
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = [];
                                            
                                           
                                        }
                                        else if(modeltype!=true){
                                            stateval.state.orepageproperty[controlname]['Property']['data'] = [];
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = [];
                                        }
                                        //End [OLS-I1035 10/01/2023 ORE050]
                                        else {
                                            stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                            stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname]
                                        }
                                        //Flat list - Item Multiple select is not get removed on the page navigation.[OLS-I859 ORE025 12-10-22]
                                        stateval.state.orepageproperty[controlname]['Property']["selectcount"] = '';
                                        stateval.state.orepageproperty[controlname]["Property"]["selectedItem"] = [];
                                        stateval.state.orepageproperty[controlname]["Property"]["selectedKeys"] = [];
                                        //End[OLS-I859 ORE025 12-10-22]


                                    }
                                    stateval.state.orepageproperty[controlname]['Property']['contentLoader'] = "none";
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                break;

                            case OreControlType.OreListview:
                                if (stateval.state.orepageproperty[controlname]['Property']['listStyle'] === "style1") {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                else if (stateval.state.orepageproperty[controlname]['Property']['listStyle'] === "style2") {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.DATA = stateval.state.datamodal.models[modelname];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                else if (stateval.state.orepageproperty[controlname]['Property']['listStyle'] === "style3") {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.DATA = stateval.state.datamodal.models[modelname];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                else if (stateval.state.orepageproperty[controlname]['Property']['listStyle'] === "style4") {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.DATA = stateval.state.datamodal.models[modelname];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                else if (stateval.state.orepageproperty[controlname]['Property']['listStyle'] === "style5") {
                                    stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.orepageproperty[controlname]['Property']['data1'] = stateval.state.datamodal.models[modelname];
                                    stateval.state.DATA = stateval.state.datamodal.models[modelname];
                                    stateval.setState({
                                        orepageproperty: stateval.state.orepageproperty
                                    })
                                }
                                break;
                            case OreControlType.OreCheckBox:
                                //console.log("Hi")
                                //console.log(stateval.state.datasource.models[datasource])
                                //console.log(stateval.state.orepageproperty[controlname]['Property']['data'])                                 
                                stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                stateval.setState({
                                    orepageproperty: stateval.state.orepageproperty
                                })
                                break;
                            case OreControlType.OreRadioButton:
                                stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                stateval.setState({
                                    orepageproperty: stateval.state.orepageproperty
                                })
                                break;
                            case OreControlType.OreChart:
                                stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                stateval.setState({
                                    orepageproperty: stateval.state.orepageproperty
                                })
                                break;
                            case OreControlType.OreMap:
                                stateval.state.orepageproperty[controlname]['Property']['data'] = stateval.state.datamodal.models[modelname]
                                stateval.setState({
                                    orepageproperty: stateval.state.orepageproperty
                                })
                                break;
                        }
                    } else {
                        console.log("Data model not found")
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    getDataModel(stateval, controlname) {
        try {
            if (stateval && controlname) {
                if (stateval.state.orepageproperty[controlname]['Property']['datasource']) {
                    var datasource = stateval.state.orepageproperty[controlname]['Property']['datasource'];
                    if (stateval.state.datasource.models[datasource]) {
                        switch (Orefuncs.GetControlType(controlname, stateval.state)) {
                            case OreControlType.OrePicker:
                                stateval.state.datasource.models[datasource] = stateval.state.orepageproperty[controlname]['Property']['name']
                                stateval.setState({
                                    datasource: stateval.state.datasource
                                })
                        }
                    } else {
                        console.log("Data model not found")
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    getDataGroup(stateval, controlname) {
        try {
            return stateval.state.orepageproperty[controlname]['Property']['datamodel'].split("#")[1];
        } catch (e) {
            console.log(e)
        }
    },
    //Redux changes on 04-04-2023 By ORE036
    getDataGroupCode(stateval, controlname) {
        try {
            return stateval.state.orepageproperty[controlname]['Property']['datamodel'].split("#")[0];
        } catch (e) {
            console.log(e)
        }
    },
    //----------

    getDataField(stateval, controlname) {
        try {
            return stateval.state.orepageproperty[controlname]['Property']['datafield']
        } catch (e) {
            console.log(e)
        }
    },

    getModel(stateval, modelName) {
        if (stateval && modelName && stateval.state.datamodal.models && stateval.state.datamodal.models[modelName]) {
            return stateval.state.datamodal.models[modelName]
        } else {
            console.log("Model Not found")
            return undefined
        }
    },

    getAllModel(stateval) {
        if (stateval && stateval.state.datamodal.models && stateval.state.datamodal.models) {
            return stateval.state.datamodal.models
        } else {
            console.log("All Models Not found")
            return undefined
        }
    },
    //Need a provision save a control value in collection [OLS-I626 21-06-2022 ORE025]
    changeasyncmultiplevalueDir(lstosubject) {
        try {
            if (lstosubject.indexOf(".") != -1) {
                try {

                    var regexvar = /\%(.*?)\%/gi;
                    var resultMatchGroupvar = lstosubject.match(regexvar);
                    if (resultMatchGroupvar != null) {
                        var desiredResvar = resultMatchGroupvar.map(match => match.replace(regexvar, "$1"))
                        for (var i = 0; i <= desiredResvar.length - 1; i++) {
                            var hs = desiredResvar[i];

                            var lsval = "";
                            var lsobjcode = hs.split(".");
                            var lsfieldname = lsobjcode[1];

                            //Get Model inner Variable Value
                            var chkvar = lsobjcode[0].includes("#")
                            var ivar = lsobjcode[0];
                            if (chkvar) {
                                var res = lsobjcode[0].split("[");
                                lsobjcode[0] = res[0];
                                // var res = await OreApibind.GetModelData(gractivepage, lsobjcode[0]);


                                var regexvar = /\#(.*?)\#/gi;
                                var resultMatchGroupvar = ivar.match(regexvar);
                                if (resultMatchGroupvar != null) {
                                    var desiredResvar = resultMatchGroupvar.map(match => match.replace(regexvar, "$1"))
                                    for (var i = 0; i <= desiredResvar.length - 1; i++) {
                                        var hs = desiredResvar[i]
                                        console.log("1st" + hs)
                                        var lsval = gractivepage.state[hs];
                                        if (lsval == undefined) {
                                            var lsobjcode = hs.split(".");
                                            if (lsobjcode.length > 1) {
                                                lsval = gractivepage.state[ivar]
                                                lsval = lsval[ivar]
                                            }
                                        }
                                        hs = "#" + hs + "#";
                                        // lsobjcode[0] = ivar.replace(hs, lsval)
                                    }
                                }
                                var result = OreApibind.GetModelData(gractivepage, lsobjcode[0]);
                                if (result) {
                                    lstosubject = result[lsval][lsfieldname]
                                    return lstosubject;
                                }
                            } else {



                                lsobjcode = lsobjcode[0];

                                var res = OreApibind.GetDataModalFieldData(gractivepage, lsobjcode, lsfieldname);

                                if (res.status) {
                                    lsval = res.data;


                                }
                                else {

                                    lsval = "";
                                }
                                hs = "%" + hs + "%";
                                lstosubject = lstosubject.replace(hs, lsval);
                            }
                        }
                    }
                }
                catch {

                    return "";

                }
            }

            //else if (lstosubject.indexOf("=") == -1) {
            var regexvar = /\#(.*?)\#/gi;
            var resultMatchGroupvar = lstosubject.match(regexvar);
            if (resultMatchGroupvar != null) {
                var desiredResvar = resultMatchGroupvar.map(match => match.replace(regexvar, "$1"))
                for (var i = 0; i <= desiredResvar.length - 1; i++) {
                    var hs = desiredResvar[i]
                    console.log("1st" + hs)
                    var lsval = gractivepage.state[hs];
                    if (lsval == undefined) {
                        var lsobjcode = hs.split(".");
                        if (lsobjcode.length > 1) {
                            lsval = gractivepage.state[lsobjcode[0]]
                            lsval = lsval[lsobjcode[1]]
                        }
                    }
                    hs = "#" + hs + "#";
                    lstosubject = lstosubject.replace(hs, lsval)
                }
            }
            var regexcontrol = /\$(.*?)\$/gi;
            var resultMatchGroupcontrol = lstosubject.match(regexcontrol); // [ '[more or less]', '[more]', '[less]' ]
            if (resultMatchGroupcontrol != null) {
                var desiredRescontrol = resultMatchGroupcontrol.map(match => match.replace(regexcontrol, "$1"))
                var s; for (var i = 0; i <= desiredRescontrol.length - 1; i++) {
                    var hs = desiredRescontrol[i];
                    var lsval = Orefuncs.GetValue(hs, activestate)
                    hs = "$" + hs + "$";
                    lstosubject = lstosubject.replace(hs, lsval);
                }
            }
            return lstosubject;
        }
        catch
        {

            return "";
        }
    },
    ////End [OLS-I626 21-06-2022 ORE025]

    //Redux changes on 04-04-2023 By ORe036
    async modelSync(stateval, datagroupcode, datafield, datagroup) {
        stateval.setState({
            datamodal: stateval.state.datamodal
        });
        this.setValueField(stateval, datagroupcode, datafield);
        Orefuncs.setRedux(datagroup, stateval.state.datamodal.models[datagroup], true)
    }
    //--------

}
//#endregion
export default OreDatabinding;