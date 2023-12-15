/*!
 * OreOPS Mobile library v1.0.0
 * (c) - http://oreops.com/
 * License:(http://oreops.com)
 * Created Date :01-01-2021
 */

import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
//Live-Preview-Tactive 3 app-Getting alert as "cannot read property of undefined" while open the Entry screen.OLS-I801-On 19-02-2022 by ORE034
//import OreAlert from 'react-native-oreopscomponent/components/OreAlert';
import { OreAlert } from 'react-native-oreopscomponent/components/OreAlert';
//End OLS-I801-On 19-02-2022 by ORE034
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import ModelEngine from 'react-native-oreopscore/components/OreOPS/general/Ore_ModelEngine';
import appconfig from '../AppConfig.json';
import assets from '../assets/Library/Script/mappingdata';
import conndata from '../connector/Ore_Connections';
import modeldata from '../connector/ore_model';
import ore_json from '../connector/ore_json';
import ore_api from '../connector/ore_api';
import ore_firestore from '../connector/ore_firestore';
import sqlmodeldata from '../connector/Ore_SqlModel';
import OreControlbinding from './Ore_Controlbinding';
import { FireStore, PushNotification } from './Ore_FirebaseEngine';
import Sqliteengine from './Ore_SqliteEngine';
import Snackbar from 'react-native-snackbar';
import { decode as atob, encode as btoa } from 'base-64'
const firestore = new FireStore();

const BindType = {
  LOCAL: 'LOCAL',
  API: 'API',
  SQLITE: 'SQLITE',
  REALM: 'REALM',
  FIRESTORE: 'FIRESTORE',
  FIREBASE: 'FIREBASE',
};

const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const OreApibinding = {
  GetScreenModelData(screenmodels) {
    var object = screenmodels.models;
    var controls = screenmodels.controls;
    try {
      if (object.length > 0) {
        if (Object.keys(object[0]).length === 0 && object[0].constructor === Object) {
          return { models: {}, controls: controls };
        } else {
          var models = {};
          for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
              const element = object[key];
              let modelinfo = OreApibinding.GetModelInfo(element.modelcode);
              models[modelinfo.modelname] = modelinfo.modelstate;
            }
          }
          return { models: models, controls: controls };
        }
      } else {
        return { models: {}, controls: controls };
      }
    } catch (error) {
      Alert.alert('GetScreenModelData Error', error.toString())
      return { models: {}, controls: [] };
    }
  },
  async GetScreenModelDataNew(State, screenmodels) {
    var object = screenmodels.models;
    var controls = screenmodels.controls;

    try {
      if (object.length > 0) {

        if (Object.keys(object[0]).length === 0 && object[0].constructor === Object) {

          return { models: {}, controls: controls };
        } else {
          var models = {};
          for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
              const element = object[key];
              let modelinfo = OreApibinding.GetModelInfo(element.modelcode);
              models[modelinfo.modelname] = modelinfo.modelstate;
              //if (modelinfo.modelprop[0].localstorage == true || modelinfo.modelprop[0].sessionstorage == true || modelinfo.modelprop[0].reduxstorage == true) {
              if (modelinfo.modelprop[0].localstorage == true || modelinfo.modelprop[0].sessionstorage == true) {
                var value = await OreApibinding.GetDataModalData(State, element.modelcode);
                if (value.status) {
                  var modelname = OreApibinding.GetModelName(element.modelcode);
                  State.state.datamodal.models[modelname] = value.data;
                  OreApibinding.SetValue(State, element.modelcode)
                }
              }
              //Redux Changes on 04-04-2023 By ORE036
              if (modelinfo.modelprop[0].reduxstorage == true) {
                var modelname = OreApibinding.GetModelName(element.modelcode);
                var value = await Orefuncs.getRedux(modelname, true)
                if (value != undefined) {
                  State.state.datamodal.models[modelname] = value;
                  OreApibinding.SetValue(State, element.modelcode)
                }
              }
              //-----------

            }
          }
          return { models: models, controls: controls };
        }
      } else {
        return { models: {}, controls: controls };
      }
    } catch (error) {
      Alert.alert('GetScreenModelData Error', error.toString())
      return { models: {}, controls: [] };
    }
  },
  //Control to Model
  GetValue(State) {
    OreControlbinding.getValue(State);
  },
  //Model to Control
  SetValue(State, modelcode) {
    //Live-Safety-Preview error occur while navigate from home page,unable to continue the app execution.OLS-I365-On 22-04-2022 by ORE034
    State = window["Page_01"];
    //End OLS-I365-On 22-04-2022 by ORE034
    OreControlbinding.setValue(State, modelcode);
  },
  SetValueField(State, modelcode, modelfield) {
    OreControlbinding.setValueField(State, modelcode, modelfield);
  },
  GetObjectFieldValue(o, s) {
    try {
      s = s.replace(/\[(\w+)\]/g, '.$1');
      s = s.replace(/^\./, '');
      var a = s.split('.');
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
          o = o[k];
        } else {
          return "";
        }
      }
    } catch (error) {
      return "";
    }

    return o;
  },
  //Need a provision save a control value in collection [OLS-I626 22-06-2022 ORE025]
  InitializeVariable(State, Variables) {
    if (Variables && Variables.length != 0) {
      for (i = 0; i < Variables.length; i++) {
        State.setState({ [Variables[i]]: 0 })
      }
    }
  },
  //End [OLS-I626 22-06-2022 ORE025]


  //SetObjectFieldValue method is changed for working File Upload - ORE036 on 10-06-2022
  // SetObjectFieldValue(obj, path, value) {
  //   if (Object(obj) !== obj) return obj;
  //   if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  //   path.slice(0, -1).reduce((a, c, i) =>
  //     Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
  //   return { ...obj }
  // },
  // SetObjectFieldValue(obj, path, value) {
  //   var isArray = false
  //   if (Array.isArray(obj)) {
  //     obj = obj[0]
  //     isArray = true
  //   }
  //   if (Object(obj) !== obj) return obj;
  //   if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  //   path.slice(0, -1).reduce((a, c, i) =>
  //     Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
  //   if (isArray) {
  //     return [obj]
  //   } else {
  //     return { ...obj }
  //   }
  // },
  //End ORE036 on 10-06-2022
  //Need a provision save a control value in collection [OLS-I626 21-06-2022 ORE025]
  // SetObjectFieldValue(obj, path, value) {
  //   var isArray = false
  //   temp = obj
  //   if (Array.isArray(obj)) {
  //     if (obj.length > 1) {
  //       temp = obj
  //       var fields = path.split('.')

  //       for (var i = 0; i < fields.length; i++) {
  //         if ((fields.length - 1) == i) {
  //           temp = temp[fields[i]] = value
  //         } else {
  //           if (!temp[fields[i]] && (fields[i].includes("[") && fields[i].includes("]"))) {
  //             fields[i] = fields[i].replace("[", "")
  //             fields[i] = fields[i].replace("]", "")
  //             temp = temp[fields[i]]
  //           } else if (!temp[fields[i]]) {
  //             temp = temp[fields[i]] = {}
  //           }
  //           else {
  //             temp = temp[fields[i]]
  //             console.log("else " + obj)
  //           }
  //         }
  //       }
  //     } else {
  //       obj = obj[0]
  //       if (Object(obj) !== obj) return obj;
  //       if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  //       path.slice(0, -1).reduce((a, c, i) =>
  //         Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
  //     }
  //     isArray = true
  //   } else {
  //     if (Object(obj) !== obj) return obj;
  //     if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  //     path.slice(0, -1).reduce((a, c, i) =>
  //       Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
  //   }
  //   if (isArray) {
  //     if (obj.length > 1) {
  //       return obj
  //     } else {
  //       return [obj]
  //     }
  //   } else {
  //     return { ...obj }
  //   }
  // },
  ////End [OLS-I626 21-06-2022 ORE025]
  //Unable to set control values to collection model[OLS-I639 27-06-2022 ORE025]
  SetObjectFieldValue(obj, path, value) {
    var isArray = false
    var fields = path.split('.')
    if (Array.isArray(obj)) {
      if (obj.length > 1 || fields.length > 1) {
        temp = obj
        for (var i = 0; i < fields.length; i++) {
          if ((fields.length - 1) == i) {
            temp = temp[fields[i]] = value
          } else {
            if (!temp[fields[i]] && (fields[i].startsWith("["))) {
              fields[i] = fields[i].replace("[", "")
              fields[i] = fields[i].replace("]", "")
              temp = temp[fields[i]]
            } else if (!temp[fields[i]] && fields[i].includes("[")) {
              var fieldsplit = fields[i].split('[')
              var fieldsplitname = fieldsplit[0];
              var fieldsplitposition = fieldsplit[1];
              fieldsplitposition = fieldsplitposition.replace("]", "")
              if (temp[fieldsplitname] && temp[fieldsplitname][fieldsplitposition]) {
                temp = temp[fieldsplitname][fieldsplitposition]
              } else {
                temp = temp[fieldsplit[0]] = []
                temp.push({});
                temp = temp[0];
              }
            } else if (!temp[fields[i]]) {
              temp = temp[fields[i]] = {}
            }
            else {
              temp = temp[fields[i]]
              //console.log("else " + obj)
            }
          }
        }
      } else {
        obj = obj[0]
        if (Object(obj) !== obj) return obj;
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        path.slice(0, -1).reduce((a, c, i) =>
          Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
      }
      isArray = true
    } else {
      if (Object(obj) !== obj) return obj;
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
      path.slice(0, -1).reduce((a, c, i) =>
        Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}, obj)[path[path.length - 1]] = value;
    }
    if (isArray) {
      if (obj.length > 1 || fields.length > 1) {
        return obj
      } else {
        return [obj]
      }
    } else {
      return { ...obj }
    }
  },
  //End [OLS-I639 27-06-2022 ORE025]
  OreReject(error, statuscode = 400) {
    return new Promise(function (resolve) {
      resolve({ status: false, statuscode: statuscode, data: null, error: error });
    });
  },
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(
        key,
        value
        , (err, result) => {
          //alert(err);
        });
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  },
  async GetCacheData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
    }
  },
  async HandleMobileStorage(modelcode, data) {
    if (data) {
      let modelprop = OreApibinding.GetModelProperty(modelcode);
      let modelname = OreApibinding.GetModelName(modelcode);
      let lscache = modelprop[0].localstorage;
      let lssession = modelprop[0].sessionstorage;
      let lsredux = modelprop[0].reduxstorage;
      //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
      await OreApibinding.SetMobileStorage(lscache, lssession, modelname, data, lsredux);
      //End OLS-I318-On 05-03-2022 by ORE034
    }
  },
  async SetMobileStorage(cache, session, modelname, data, redux) {
    if (cache) {
      await OreApibinding.storeData(modelname, JSON.stringify(data))
    }
    if (session) {
      Orefuncs.SetLocalStorage(modelname, data);
    }
    if (redux) {
      await Orefuncs.setRedux(modelname, data, true);
    }
  },
  async HTTPRequest(type, path, parameters = null, headers = [], body = {}, authorization = null) {
    if (!type) {
      return OreReject('TYPE:GET/POST required', 206);
    }
    if (!path) {
      return OreReject('PATH:API Url required', 206);
    }
    if (parameters && Object.keys(parameters).length != 0 && parameters.constructor === Object) {
      path = OreApibinding.GetFullUrl(path, parameters);
    }
    else {
      parameters = {};
    }
    if (authorization) {
      let auth = OreApibinding.ConvertToAuth(authorization);
      axios.defaults.headers.common['Authorization'] = auth;
      axios.defaults.headers.common['Cache-Control'] = 'no-cache';
      axios.defaults.headers.common['Pragma'] = 'no-cache';
      axios.defaults.headers.common['Expires'] = '0';
      axios.defaults.headers.common['Rand'] = Math.random();
      axios.defaults.withCredentials = true
      if (headers) {
        headers.push({ 'Authorization': auth })
      }
    }
    for (const iterator in headers) {
      axios.defaults.headers.common[headers[iterator].name] = headers[iterator].hear;

    }
    const headerObject = Object.assign({}, ...headers);

    switch (type.toUpperCase()) {
      case HTTPMethod.GET:
        {
          return new Promise(function (resolve, reject) {
            axios({
              method: 'get',
              headers: headerObject,
              url: path,
              withCredentials: true
            }).then(
              (response) => {
                let statuscode = response.status;
                const status = OreApibinding.GetStatusDetail(statuscode);
                //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                //statuscode = response.statusText ? statuscode + ' ' + response.statusText : statuscode + ' ' + status.statusText;
                resolve({ status: true, statuscode: statuscode, data: response.data, headers: response.headers, error: null, duration: response.duration, description: status.statusDescription });
              },
              (error) => {
                if (error.response != undefined) {
                  let statuscode = error.response ? error.response.status : 503;
                  let data = error.response.data;
                  if (typeof (data) == 'object') data = JSON.stringify(data);
                  const status = OreApibinding.GetStatusDetail(statuscode);
                  //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                  //statuscode = error.statusText ? statuscode + ' ' + error.statusText : statuscode + ' ' + status.statusText;
                  resolve({ status: false, statuscode: statuscode, data: data, headers: {}, error: null, duration: error.duration, description: status.statusDescription });
                }
                else {
                  resolve({ status: false, statuscode: 500, data: null, error: null, headers: {}, duration: '', description: error });
                }
              }
            ).catch(error => {
              console.log(error);
            });
          });
        }
      case HTTPMethod.POST:
        {
          return new Promise(function (resolve, reject) {
            axios.post(path, body, { headers: headerObject }).then(
              (response) => {
                let statuscode = response.status;
                const status = OreApibinding.GetStatusDetail(statuscode);
                //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                //statuscode = response.statusText ? statuscode + ' ' + response.statusText : statuscode + ' ' + status.statusText;
                resolve({ status: true, statuscode: statuscode, data: response.data, error: null, duration: response.duration });
              },
              (error) => {
                if (error.response != undefined) {
                  let statuscode = error.response ? error.response.status : 503;
                  let data = error.response.data;
                  if (typeof (data) == 'object') data = JSON.stringify(data);
                  const status = OreApibinding.GetStatusDetail(statuscode);
                  //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                  //statuscode = error.statusText ? statuscode + ' ' + error.statusText : statuscode + ' ' + status.statusText;
                  resolve({ status: false, statuscode: statuscode, data: data, error: null, duration: error.duration });
                }
                else {
                  resolve({ status: false, statuscode: 500, data: null, error: null, duration: '', description: error });
                }
              }
            );
          });
        }
      case HTTPMethod.PUT:
        {
          return new Promise(function (resolve, reject) {
            axios.put(path, body, { headers: headerObject }).then(
              (response) => {
                let statuscode = response.status;
                const status = OreApibinding.GetStatusDetail(statuscode);
                //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                //statuscode = response.statusText ? statuscode + ' ' + response.statusText : statuscode + ' ' + status.statusText;
                resolve({ status: true, statuscode: statuscode, data: response.data, error: null, duration: response.duration });
              },
              (error) => {
                if (error.response != undefined) {
                  let statuscode = error.response ? error.response.status : 503;
                  let data = error.response.data;
                  if (typeof (data) == 'object') data = JSON.stringify(data);
                  const status = OreApibinding.GetStatusDetail(statuscode);
                  //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                  //statuscode = error.statusText ? statuscode + ' ' + error.statusText : statuscode + ' ' + status.statusText;
                  resolve({ status: false, statuscode: statuscode, data: data, error: error, duration: error.duration });
                } else {
                  resolve({ status: false, statuscode: 500, data: null, error: null, duration: '', description: error });
                }
              }
            );
          });
        }
      case HTTPMethod.DELETE:
        {
          return new Promise(function (resolve, reject) {
            axios.delete(path, body, { headers: headerObject }).then(
              (response) => {
                let statuscode = response.status;
                const status = OreApibinding.GetStatusDetail(statuscode);
                //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                //statuscode = response.statusText ? statuscode + ' ' + response.statusText : statuscode + ' ' + status.statusText;
                resolve({ status: true, statuscode: statuscode, data: response.data, error: null, duration: response.duration });
              },
              (error) => {
                if (error.response != undefined) {
                  let statuscode = error.response ? error.response.status : 503;
                  let data = error.response.data;
                  if (typeof (data) == 'object') data = JSON.stringify(data);
                  const status = OreApibinding.GetStatusDetail(statuscode);
                  //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                  //statuscode = error.statusText ? statuscode + ' ' + error.statusText : statuscode + ' ' + status.statusText;
                  resolve({ status: false, statuscode: statuscode, data: data, error: error, duration: error.duration });
                } else {
                  resolve({ status: false, statuscode: 500, data: null, error: null, duration: '', description: error });
                }
              }
            );
          });
        }
      case HTTPMethod.PATCH:
        {
          return new Promise(function (resolve, reject) {
            axios.patch(path, body, { headers: headerObject }).then(
              (response) => {
                let statuscode = response.status;
                const status = OreApibinding.GetStatusDetail(statuscode);
                //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                //statuscode = response.statusText ? statuscode + ' ' + response.statusText : statuscode + ' ' + status.statusText;
                resolve({ status: true, statuscode: statuscode, data: response.data, error: null, duration: response.duration });
              },
              (error) => {
                if (error.response != undefined) {
                  let statuscode = error.response ? error.response.status : 503;
                  let data = error.response.data;
                  if (typeof (data) == 'object') data = JSON.stringify(data);
                  const status = OreApibinding.GetStatusDetail(statuscode);
                  //OLS-I1127 Commend By ORE050 on 08-03-2023, For Remove statusText
                  //statuscode = error.statusText ? statuscode + ' ' + error.statusText : statuscode + ' ' + status.statusText;
                  resolve({ status: false, statuscode: statuscode, data: data, error: error, duration: error.duration });
                } else {
                  resolve({ status: false, statuscode: 500, data: null, error: null, duration: '', description: error });
                }
              }
            );
          });
        }
      default:
        {
          return OreReject('Not Found', 404);
        }
    }
  },
  ConvertToAuth(auth) {
    if (auth.type.toUpperCase() === "BEARER") {
      let token = auth.value;
      return `Bearer ${token}`;
    }
    else if (auth.type.toUpperCase() === "BASIC") {
      var credentials = btoa(auth.value.username + ':' + auth.value.password);
      return `Basic ${credentials}`;
    }
  },
  GetFullUrl(baseurl, object) {
    try {
      var param = '';
      var fullurl = '';
      if (OreApibinding.checkProperties(object)) {
        param = OreApibinding.jsonToQueryString(object);
      } else {
        let isfirst = true;
        for (const key in object) {
          const value = object[key];
          if (isfirst) {
            param = '/' + value;
            isfirst = false;
          }
          else {
            param = param + '/' + value;
          }
        }
      }
      fullurl = baseurl + param;
      return fullurl;
    } catch (e) {
      return '';
    }
  },
  jsonToQueryString(json) {
    return '?' + Object.keys(json).map(function (key) {
      //Unable to get response if we send date as request parameters without encoding[OLS-I560 12-05-2022 ORE025]
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
      //End [OLS-I560 12-05-2022 ORE025]
      // If request parameter contains + means,encodeURIComponent converts + into %2B which cause error in api response[OLS-I536 29-04-2022 ORE025]
      //return key + '=' + json[key];
      //End [OLS-I536 29-04-2022 ORE025]
    }).join('&');
  },
  checkProperties(obj) {
    for (var key in obj) {
      if (!key)
        return false;
    }
    return true;
  },
  async AutoBind(State) {
    Snackbar.dismiss();//for to close the Snackbar ORE050 [1-3-2023 OLS-I970]
    var controls = State.state.orepageproperty;
    for (const [key, value] of Object.entries(controls)) {
      if (value.Property) {
        var controlname = value.Default.txtctrlname;
        var autobind = value.Property.autobind ? value.Property.autobind : false;
        if (autobind) {
          var controlname = value.Default.txtctrlname;
          if (value.type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'flex';
          //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
          await OreApibinding.SetDataBinding(State, controlname, value.type);
          //End OLS-I318-On 05-03-2022 by ORE034

        }
        //to enable content loader for flat list[OLS-I442 17-04-2022 ORE025]
        else {
          if (value.type == "Flat") {
            //List view keep loading in output [OLS-I832 03-10-2022 ORE034]
            State.state.orepageproperty[controlname].Property.contentLoader = 'none';
            // if (value.Property.hasOwnProperty('datamodelbinding')) {
            //   var modelcode = value.Property.datamodelbinding.split('#')[0];
            //   if (!modelcode) {
            //     State.state.orepageproperty[controlname].Property.contentLoader = 'none';
            //   }
            // }
            // else {
            //   State.state.orepageproperty[controlname].Property.contentLoader = 'none';
            // }
            //End [OLS-I832 03-10-2022 ORE034]
          }
        }
        //End[OLS-I442 17-04-2022 ORE025]
      }
    }
  },
  //In Button, Data - Submit is used. Need to remove a default alert. - Scandle Alert is not working [OLS-I740 ORE034 12-10-2022]
  SnackbarAlert(text) {
    setTimeout(() => {
      Snackbar.show({
        text: text,
        textColor: "#ffffff",
        duration: 3000,
        rtl: false,
        backgroundColor: "#323232",
      });
    }, 100);
  },
  //End [OLS-I740 ORE034 12-10-2022]
  SchemaValidation(modelcode, jsondata) {
    try {
      var schema = OreApibinding.GetModelSchema(modelcode);
      var result = ModelEngine.ValidateSchema(jsondata, schema);
      if (result.status) {
        return { status: true, message: 'success', data: null, error: null };
      }
      else {
        //Message Standard on 22-05-2023
        // var errmsg = JSON.stringify({ status: result.status, model: modelcode, message: result.message, error: result.data });
        // return { status: false, message: 'false', data: null, error: errmsg };
        return { status: false, message: 'false', data: null, error: result.data };
      }
    } catch (error) {
      return { status: false, message: 'SchemaValidation: Exception Error', data: null, error: error.toString() };
    }
  },
  async ModelGetByFilter(State, modelcode, mapdata, filter) {
    try {
      OreApibinding.GetValue(State);
      var bindtype = mapdata.split('#')[0];
      if (!bindtype) {
        Alert.alert('Source', 'Source required');
        return false;
      }
      else {
        switch (bindtype.toUpperCase()) {
          case BindType.API:
            {
              var Condition = "";
              var filterkey = "";
              var filtervalue = "";
              var objcode = mapdata.split('#')[1];
              var mserialno = mapdata.split('#')[2];        // Method Serial Num
              //To find Model name in using model code[OLS-I312 18-02-2022 By ORE025]
              //var filterModel = mapdata.split('#')[3];
              var modelcode = mapdata.split('#')[3];
              var destinationmodelcode = mapdata.split('#')[4];
              var filterModel = OreApibinding.GetModelName(modelcode)
              //End[OLS-I312 18-02-2022 By ORE025]
              var result = await OreApibinding.ModalSaveAPI(State, modelcode, objcode, mserialno, filterModel);
              if (result.status) {
                var resdata = result.data;
                if (filter.includes("&&") || filter.includes("||")) {
                  var data = resdata.filter(function (item) {
                    window.item = item;
                    return eval(filter);
                  });
                }
                else if (filter.includes(">=")) {
                  Condition = filter.split(">=");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] >= filtervalue;
                  });
                }
                else if (filter.includes("<=")) {
                  Condition = filter.split("<=");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] <= filtervalue;
                  });
                } else if (filter.includes(">")) {
                  Condition = filter.split(">");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] > filtervalue;
                  });
                } else if (filter.includes("<")) {
                  Condition = filter.split("<");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] < filtervalue;
                  });
                } else if (filter.includes("===")) {
                  Condition = filter.split("===");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] === filtervalue;
                  });
                } else if (filter.includes("==")) {
                  Condition = filter.split("==");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] == filtervalue;
                  });
                } else if (filter.includes("!=")) {
                  Condition = filter.split("!=");
                  filterkey = Condition[0];
                  filtervalue = Condition[1];
                  var data = resdata.filter(function (item) {
                    return item[filterkey] != filtervalue;
                  });
                }

                var modelname = OreApibinding.GetModelName(destinationmodelcode);
                State.state.datamodal.models[modelname] = data;
                OreControlbinding.setDataModelsNew(State, modelname);
              } else {
                OreAlert.alert(result.message);
              }
              return { status: true, message: "Success", data: data }
            }

            break;
          case BindType.LOCAL:
            {
              objcode = mapdata.split('#')[1];
              var Condition = "";
              var filterkey = "";
              var filtervalue = "";
              //var desmodelcode = mapdata.split('#')[3];
              //Unable to get destination modelcode if variable(i,e id==#id#) is used for condition [ORE025 19-12-22]
              var desmodelcode = mapdata.split('#');
              desmodelcode = desmodelcode[desmodelcode.length - 1];
              //End[ORE025 19-12-22]  
              var localjson = OreApibinding.GetJSONData(modelcode, objcode);
              var localjosndata = localjson.data

              if (filter.includes(">=")) {
                Condition = filter.split(">=");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] >= filtervalue;
                });
              } else if (filter.includes("<=")) {
                Condition = filter.split("<=");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] <= filtervalue;
                });
              } else if (filter.includes(">")) {
                Condition = filter.split(">");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] > filtervalue;
                });
              } else if (filter.includes("<")) {
                Condition = filter.split("<");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] < filtervalue;
                });
              } else if (filter.includes("===")) {
                Condition = filter.split("===");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] === filtervalue;
                });
              } else if (filter.includes("==")) {
                Condition = filter.split("==");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] == filtervalue;
                });
              } else if (filter.includes("!=")) {
                Condition = filter.split("!=");
                filterkey = Condition[0];
                filtervalue = Condition[1];
                localjosndata = localjosndata.filter(function (item) {
                  return item[filterkey] != filtervalue;
                });
              }


              if (localjson.status) {
                var Lmodelname = OreApibinding.GetModelName(desmodelcode);
                State.state.datamodal.models[Lmodelname] = localjosndata;
                OreControlbinding.setDataModelsNew(State, Lmodelname);
              }
              else {
                OreAlert.alert(localjson.message);
              }

              return { status: true, message: "Success", data: localjson.data }
            }
            break;
          case BindType.FIRESTORE:
            {
              var objcode = mapdata.split('#')[1];
              var bindname = mapdata.split('#')[2];
              var filtermodel = mapdata.split('#')[4];
              //Unable to get destination modelcode if variable(i,e id==#id#) is used for condition [ORE025 19-12-22]
              //var destinationmodelcode = mapdata.split('#')[3];
              var destinationmodelcode = mapdata.split('#');
              destinationmodelcode = destinationmodelcode[destinationmodelcode.length - 1]
              //End [ORE025 19-12-22]
              return await OreApibinding.FireStoreGetByFilter(State, modelcode, objcode, filter, destinationmodelcode);
            }
            break;
          case BindType.SQLITE:
            {
              //Unable to get destination modelcode if variable(i,e id==#id#) is used for condition [ORE025 19-12-22]
              //var destinationmodelcode = mapdata.split('#')[3];
              var destinationmodelcode = mapdata.split('#');
              destinationmodelcode = destinationmodelcode[destinationmodelcode.length - 1]
              //End [ORE025 19-12-22]
              var modelname = OreApibinding.GetModelName(modelcode);
              var data = sqlmodeldata.filter(function (item) {
                return item.modelname == modelname;
              }); 
              //const searchRegExp = /&/gi;
              const searchRegExp = /&&/gi;
              const replaceWith = ' and ';

              filter = filter.replace(searchRegExp, replaceWith);
              filter = filter.replace("==", "=");
              var Condition = filter.split("=");
              let datatype = OreApibinding.GetModelFieldDataType(modelcode, Condition[0]);
              if (datatype.data.toLowerCase() == "string" && filter.includes("=")) {
                filter = Condition[0] + '="' + Condition[1] + '"';
              }
              if (datatype.data.toLowerCase() == "string" && filter.includes("!=")) {
                filter = Condition[0] + '!="' + Condition[1] + '"';
              }
              var desmodelname = OreApibinding.GetModelName(destinationmodelcode);
              var sqliteresponse = await Sqliteengine.FilterQuery('', modelname, data[0].connname, filter);
              if (sqliteresponse.status) {
                try {
                  //var desmodelname = OreApibinding.GetModelName(destinationmodelcode);
                  State.state.datamodal.models[desmodelname] = sqliteresponse.data;
                  // OreApibinding.SetValue(State, destinationmodelcode);
                  OreControlbinding.setDataModelsNew(State, desmodelname);
                  // OreControlbinding.setDataModels(State);
                }
                catch { }
                OreApibinding.HandleMobileStorage(destinationmodelcode, sqliteresponse.data);
                return sqliteresponse
              }
              else {
                //Flatlist-Old values maintained if data is empty[OLS-I974 2-12-22 ORE025]
                State.state.datamodal.models[desmodelname] = [];
                OreControlbinding.setDataModelsNew(State, desmodelname);
                OreApibinding.HandleMobileStorage(destinationmodelcode, []);
                //End[OLS-I974 2-12-22 ORE025]
                return sqliteresponse;
              }
            }
            break;

          default:
            Alert.alert('Source - Model Filter', 'Unknown Source: ' + bindtype.toUpperCase());
            return false;
            break;
        }
      }
    }
    catch {

    }
  },
  async ModelGet(State, modelcode, mapdata) {
    var modelprop = OreApibinding.GetModelProperty(modelcode)
    var lssession = modelprop[0].sessionstorage;
    OreApibinding.GetValue(State);
    var bindtype = mapdata.split('#')[0];
    if (!bindtype) {
      Alert.alert('Source', 'Source required');
      return false;
    }
    else {
      switch (bindtype.toUpperCase()) {
        case BindType.LOCAL:
          {
            objcode = mapdata.split('#')[1];
            bindname = mapdata.split('#')[2];
            if (lssession) {
              var localjson = await OreApibinding.GetDataModalData(State, modelcode);
            }
            else {
              var localjson = OreApibinding.GetJSONData(modelcode, objcode);
            }
            if (localjson.status) {
              var modelname = OreApibinding.GetModelName(modelcode);
              State.state.datamodal.models[modelname] = localjson.data;
              OreApibinding.HandleMobileStorage(modelcode, localjson.data)
              OreApibinding.SetValue(State, modelcode);
            }
            else {
              OreAlert.alert(localjson.message);
            }

            return { status: true, message: "Success", data: localjson.data }
          }
          break;
        case BindType.API:
          {
            var objcode = mapdata.split('#')[1];
            var mserialno = mapdata.split('#')[2];
            var bindname = mapdata.split('#')[3];
            var value = await OreApibinding.GetDataModalData(State, modelcode);
            if (value.status) {
              var modelname = OreApibinding.GetModelName(modelcode);
              State.state.datamodal.models[modelname] = value.data;
              OreApibinding.SetValue(State, modelcode)
            }
            return { status: true, message: "Success", data: value.data }
          }
        case BindType.FIRESTORE:
          {
            var objcode = mapdata.split('#')[1];
            var bindname = mapdata.split('#')[2];
            var filtermodel = mapdata.split('#')[4];
            var filterdataproperty = mapdata.split('#')[5];
            var value = await OreApibinding.GetDataModalFieldData(State, filtermodel, filterdataproperty);
            if (value.status) {
              return await OreApibinding.FireStoreGet(State, modelcode, objcode, value.data);
            }
            else {
              return value;
            }
          }
          break;
        case BindType.SQLITE:
          {
            var filtermodel = mapdata.split('#')[4];
            var filterdataproperty = mapdata.split('#')[5];
            var filterdataname = mapdata.split('#')[6];
            var value = await OreApibinding.GetDataModalDatabyFieldName(State, filtermodel, filterdataproperty, filterdataname);
            var modelname = OreApibinding.GetModelName(modelcode);
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              if (value.status == true) {
                var lsmoddata = [];
                var data = sqlmodeldata.filter(function (item) {
                  return item.modelname == modelname;
                });
                var sqliteresponse = await Sqliteengine.SelectsingleQuery(value.data, '', modelname, data[0].connname, key);
                if (sqliteresponse.status) {
                  State.state.datamodal.models[modelname] = sqliteresponse.data[0];
                  OreApibinding.HandleMobileStorage(modelcode, sqliteresponse.data);
                  OreApibinding.SetValue(State, modelcode);
                }
                else {
                }
              }
            }
            else {
              OreAlert.alert('SQLITE Response', 'Key not mapped ' + controlname + ': DATA:' + sqliteresponse.data);
            }
          }
          break;
        default:
          Alert.alert('Source - Model Get', 'Unknown Source: ' + bindtype.toUpperCase());
          return false;
          break;
      }
    }
  },
  async ModelDelete(State, modelcode, mapdata, keyValue) {
    var bindtype = mapdata.split('#')[0];
    if (!bindtype) {
      OreApibinding.SnackbarAlert('Source required');
      return false;
    }
    else {
      switch (bindtype.toUpperCase()) {
        case BindType.FIRESTORE:
          {
            var objcode = mapdata.split('#')[1];
            var bindname = mapdata.split('#')[2];
            return await OreApibinding.FireStoreDelete(State, modelcode, objcode);
          }
          break;
        case BindType.SQLITE:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            // var res = await OreApibinding.GetDataModalData(State, modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var res = await Sqliteengine.SelectQuery('', modelname, data[0].connname);
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              if (res.status == true) {
                var row = res.data.filter(function (item) {
                  return item[key] == keyValue;
                })
                if (row.length > 0) {
                  var lsmoddata = [];
                  var data = sqlmodeldata.filter(function (item) {
                    return item.modelname == modelname;
                  });
                  if (!Array.isArray(res.data)) {
                    lsmoddata.push(res.data)

                    return await Sqliteengine.DeleteQuery(lsmoddata, modelname, data[0].connname, key, keyValue);
                  }
                  else {

                    return await Sqliteengine.DeleteQuery(res.data, modelname, data[0].connname, key, keyValue);
                  }
                }
                else {
                  Alert.alert('Model Delete', 'Record not found');
                }
              }
            }
            else {
              Alert.alert('Model Delete', 'Unique key should be given');
            }
          }
          break;
        case BindType.REALM:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var res = await Sqliteengine.SelectQuery('', modelname, data[0].connname);
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              if (res.status == true) {
                var row = res.data.filter(function (item) {
                  return item[key] == keyValue;
                })
                if (row.length > 0) {
                  var lsmoddata = [];
                  var data = sqlmodeldata.filter(function (item) {
                    return item.modelname == modelname;
                  });
                  if (!Array.isArray(res.data)) {
                    lsmoddata.push(res.data)

                    return await Sqliteengine.DeleteQuery(lsmoddata, modelname, data[0].connname, key, keyValue);
                  }
                  else {

                    return await Sqliteengine.DeleteQuery(res.data, modelname, data[0].connname, key, keyValue);
                  }
                }
                else {
                  Alert.alert('Model Delete', 'Record not found');
                }
              }
            }
            else {
              Alert.alert('Model Delete', 'Unique key should be given');
            }
          }
          break;
        //Model Delete method against API[OLS-I508 13-04-2022 ORE025]       
        case BindType.API:
          {
            var objcode = mapdata.split('#')[1];
            var mserialno = mapdata.split('#')[2];
            var bindname = mapdata.split('#')[3];
            return await OreApibinding.ModalSaveAPI(State, modelcode, objcode, mserialno, bindname);
          }
          break;
        //End[OLS-I508 13-04-2022 ORE025]
        default:
          Alert.alert('Source - Model Delete', 'Unknown Source: ' + bindtype.toUpperCase());
          return false;
          break;
      }
    }
  },
  //Sqlite enhancement works[OLS-I934 30-11-22 ORE025]
  async ModelUpdate(State, modelcode, mapdata, keyValue) {
    var bindtype = mapdata.split('#')[0];
    if (!bindtype) {
      Alert.alert('Source', 'Source required');
      return false;
    }
    else {
      switch (bindtype.toUpperCase()) {
        case BindType.FIRESTORE:
          {
            var objcode = mapdata.split('#')[1];
            var bindname = mapdata.split('#')[2];
            return await OreApibinding.FireStoreSave(State, modelcode, objcode);
          }
          break;
        case BindType.SQLITE:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            //var res = await OreApibinding.GetDataModalData(State, modelcode);
            var res = OreApibinding.GetModelData(State, data[0].inputmodel);
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              if (res) {
                var lsmoddata = [];
                // var data = sqlmodeldata.filter(function (item) {
                //   return item.modelname == modelname;
                // });
                if (!Array.isArray(res)) {
                  lsmoddata.push(res)
                  return await Sqliteengine.UpdateQuery(lsmoddata, modelname, data[0].connname, key, keyValue);
                }
                else {

                  return await Sqliteengine.UpdateQuery(res, modelname, data[0].connname, key, keyValue);
                }
              }
            }
            //End[OLS-I934 30-11-22 ORE025]
          }
          break;
        case BindType.REALM:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var res = OreApibinding.GetModelData(State, data[0].inputmodel);
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              if (res) {
                var lsmoddata = [];
                if (!Array.isArray(res)) {
                  lsmoddata.push(res)
                  return await Sqliteengine.UpdateQuery(lsmoddata, modelname, data[0].connname, key, keyValue);
                }
                else {

                  return await Sqliteengine.UpdateQuery(res, modelname, data[0].connname, key, keyValue);
                }
              }
            }
          }
          break;
        //Model Update method against API[OLS-I508 13-04-2022 ORE025]
        case BindType.API:
          {
            var objcode = mapdata.split('#')[1];
            var mserialno = mapdata.split('#')[2];
            var bindname = mapdata.split('#')[3];
            return await OreApibinding.ModalSaveAPI(State, modelcode, objcode, mserialno, bindname);
          }
          break;
        //End[OLS-I508 13-04-2022 ORE025]
        default:
          Alert.alert('Source - Model Update', 'Unknown Source: ' + bindtype.toUpperCase());
          return false;
          break;
      }
    }
  },

  async ModelCallFromScreen(State, controlname) {
    var controldata = State.state.orepageproperty[controlname];
    var btnType = controldata.styles['btnType'];
    if (btnType == 'submit') {
      //In Button, Data - Submit is used. Need to remove a default alert[OLS-I740 28-9-22 ORE025]
      var _defaultMsg = true;
      if (controldata.styles.showDefaultMessage != undefined && controldata.styles.showDefaultMessage == false) {
        _defaultMsg = false;
      }
      //End[OLS-I740 28-9-22 ORE025]
      var OreServiceLabel = controldata.styles.OreServiceLabel;
      var bindtype = OreServiceLabel.split('#')[0];
      var objcode = OreServiceLabel.split('#')[1];
      var modelcode = "";
      if (bindtype.toUpperCase() == 'API') {
        var objdata = ore_api.filter(function (item) { return item.apicode == objcode });
        modelcode = objdata[0].methoddata[0].proptreedata[0].modelcode;
      }
      else if (bindtype.toUpperCase() == 'FIRESTORE') {
        var objdata = ore_firestore.filter(function (item) { return item.objcode == objcode });
        //modelcode = objdata[0].propscrt[0].modelcode;
        var lsmodname = OreServiceLabel.split('#')[2];
        let modelinfo = modeldata.filter(function (item) { return item.modelname == lsmodname });
        if (modelinfo.length > 0) modelcode = modelinfo[0].modelcode;
      }
      else if (bindtype.toUpperCase() == "SQLITE") {
        var lsmodname = OreServiceLabel.split('#')[2];
        let modelinfo = modeldata.filter(function (item) { return item.modelname == lsmodname });
        if (modelinfo.length > 0) modelcode = modelinfo[0].modelcode;
      }
      else if (bindtype.toUpperCase() == "REALM") {
        var lsmodname = OreServiceLabel.split('#')[2];
        let modelinfo = modeldata.filter(function (item) { return item.modelname == lsmodname });
        if (modelinfo.length > 0) modelcode = modelinfo[0].modelcode;
      }
      if (modelcode) {
        var lsres = await OreApibinding.ModelSave(State, modelcode, OreServiceLabel, controlname);
        //Button - Submit api call. Need option to handle the smart code before and after submit ORE-I4511 on 12-08-2022 byORE034
        if (Object.keys(lsres).length > 0) {
          if (!lsres.status) {
            State.setState({ isvalid: false });
            OreApibinding.SnackbarAlert('Data Submitted Failed');
          }
          else {
            State.setState({ isvalid: true });
            //In Button, Data - Submit is used. Need to remove a default alert[OLS-I740 28-9-22 ORE025]
            if (_defaultMsg == true)
              //End[OLS-I740 28-9-22 ORE025]
              OreApibinding.SnackbarAlert('Data Submitted successed');
          }
        }
        else {
          State.setState({ isvalid: false });
          OreApibinding.SnackbarAlert('Data Submitted Failed');
        }
        // End ORE-I4511 on 12-08-2022 byORE034
        return lsres;
      }
      else {
        OreAlert.alert('No API', 'No API Found for ' + controlname);
      }
    }
  },


  async ModelSave(State, modelcode, mapdata, controlname = '') {
    var bindtype = mapdata.split('#')[0];
    if (!bindtype) {
      //Alert.alert('Source', 'Source required');
      Orefuncs.GlobalAlert("SMC002",controlname,modelcode,'Source required','');
      return false;
    }
    else {
      switch (bindtype.toUpperCase()) {
        case BindType.API:
          {
            var objcode = mapdata.split('#')[1];
            var mserialno = mapdata.split('#')[2];
            var bindname = mapdata.split('#')[3];
            return await OreApibinding.ModalSaveAPI(State, modelcode, objcode, mserialno, bindname, controlname);
          }
          break;
        case BindType.FIRESTORE:
          {
            var objcode = mapdata.split('#')[1];
            var bindname = mapdata.split('#')[2];
            return await OreApibinding.FireStoreSave(State, modelcode, objcode);
          }
          break;
        case BindType.SQLITE:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            //Sqlite enhancement works[OLS-I934 30-11-22 ORE025]
            //var res = await OreApibinding.GetDataModalData(State, modelcode)
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var res = await OreApibinding.GetDataModalData(State, data[0].inputmodel)
            //End[OLS-I934 30-11-22 ORE025]
            if (res.status == true) {
              var lsmoddata = [];
              if (!Array.isArray(res.data)) {
                lsmoddata.push(res.data)
                return await Sqliteengine.SqliteInsert(lsmoddata, modelname, data[0].connname);
              }
              else {
                return await Sqliteengine.SqliteInsert(res.data, modelname, data[0].connname);
              }
            }
          }
          break;
        case BindType.REALM:
          {
            var modelname = OreApibinding.GetModelName(modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var res = await OreApibinding.GetDataModalData(State, data[0].inputmodel)
            if (res.status == true) {
              var lsmoddata = [];
              if (!Array.isArray(res.data)) {
                lsmoddata.push(res.data)
                return await Sqliteengine.SqliteInsert(lsmoddata, modelname, data[0].connname);
              }
              else {
                return await Sqliteengine.SqliteInsert(res.data, modelname, data[0].connname);
              }
            }
          }
          break;
        default:
          //Alert.alert('Source - Model Save', 'Unknown Source: ' + bindtype.toUpperCase());
          Orefuncs.GlobalAlert("SMC002",controlname,modelcode,'Unknown Source(Model Save): ' +bindtype.toUpperCase(),'')
          return false;
          break;
      }
    }
  },

  async ClearCacheData(State, key) {
    try {
      //Model value in state is not cleared [16-08-2022 ORE025]
      let modelname = OreApibinding.GetModelName(key);
      let modeldata = State.state.datamodal.models[modelname];
      let data;
      if (Array.isArray(modeldata))
        data = modeldata[0];
      else
        data = modeldata
      for (var Key in data) {
        let fieldtype = OreApibinding.GetModelFieldDataType(key, Key);
        switch (fieldtype.data.toUpperCase()) {
          case 'NUMBER': case 'INTEGER':
            data[Key] = 0;
            break;
          case 'OBJECT':
            data[Key] = {};
            break;
          case 'ARRAY':
            data[Key] = [];
          default:
            data[Key] = '';
        }
      }
      if (Array.isArray(modeldata))
        modeldata = [data];
      else
        modeldata = data;
      State.state.datamodal.models[modelname] = modeldata;
      await AsyncStorage.removeItem(modelname);
      //await AsyncStorage.removeItem(key);
      //End[16-08-2022 ORE025]
      return true;
    } catch (error) {
      console.log("catch not cleared");
      return false;
    }
  },

  async ModelDeleteAll(lsmodlname, lsdbname) {
    try {
      await AsyncStorage.removeItem(lsmodlname);
      return await Sqliteengine.DeleteAll(lsmodlname, lsdbname);
    } catch (error) {
    }
  },

  async ModalSaveAPI(State, modelcode, objcode, mserialno, bindname = '', controlname = '') {
    var modelname = OreApibinding.GetModelName(modelcode);
    var apinfo = OreApibinding.GetAPIInfo(objcode, mserialno, bindname);
    if (apinfo.status) {
      var apiresponse = await OreApibinding.RequestAPI(State, apinfo.apidata, controlname);
      if (apiresponse.status) {
        if (apinfo.apidata.headerresponsejson == undefined || apinfo.apidata.headerresponsejson == false) {
          var filterdata = ModelEngine.ConvertSelectedJson(apiresponse.data, apinfo.filterdata.filterpath);
        }
        else {
          var filterdata = ModelEngine.ConvertSelectedJson(apiresponse.headers, apinfo.filterdata.filterpath);
        }
        if (filterdata.status) {
          modelname = OreApibinding.GetModelName(apinfo.filterdata.modelcode);
          State.state.datamodal.models[modelname] = filterdata.data;
          apiresponse.data = filterdata.data;
          OreApibinding.HandleMobileStorage(apinfo.filterdata.modelcode, filterdata.data);
          OreApibinding.SetValue(State, apinfo.filterdata.modelcode);
        }
        else {
          //OreAlert.alert('API Filter', 'API Filter issue : Error: ' + filterdata.data);
          Orefuncs.GlobalAlert("SMC003",controlname,modelname,'Error in API Filter: '+filterdata.data,'');
        }
      }
      else {
       // OreAlert.alert('API Response', 'API Message: ' + apiresponse.statuscode + ' : error: ' + JSON.stringify(apiresponse));
        //OLS-I1298 Issue Tracker - Internet is required message is not readable by Ore049 [11/05/2023]
        // var _errorMessage='Control:'+ controlname ;
        // if(apiresponse.statuscode!=undefined){ _errorMessage+='  API Message: ' + apiresponse.statuscode }
        // _errorMessage+= ' : error: ' + apiresponse.message;

        // OreAlert.alert('API Response', _errorMessage);
        Orefuncs.GlobalAlert("SMC003",controlname,modelname,apiresponse.message,apiresponse.statuscode);
        //----------
      }
      return apiresponse;
    }
    else {
      //Alert message has been changed[OLS-I666 06-07-2022 ORE025]
      //OreAlert.alert('No API', 'No API Found');
      //OreAlert.alert('Data source', 'Source configuration missing');
      Orefuncs.GlobalAlert("SMC003",controlname,modelname,'Source configuration missing','');
      //End[OLS-I666 06-07-2022 ORE025]
    }
  },
  //To Push values from one model to another model[OLS-I514 04-05-2022 ORE025]
  // async ModelPush(State, data, destmodel) {
  //   var modelprop = OreApibinding.GetModelProperty(destmodel);
  //   var modeldata = OreApibinding.GetModelData(State, destmodel)
  //   //var data = OreApibinding.GetModelData(State, srcmodel)
  //   if (data) {
  //     data = JSON.parse(JSON.stringify(data));
  //     var modelname = OreApibinding.GetModelName(destmodel)
  //     if (modeldata) {
  //       //modelPush not working for collection to collection[OLS-I514 10-06-2022 ORE025]
  //       if (!Array.isArray(modeldata[0])) {
  //         var cnt = 0
  //         for (var key in modeldata[0]) {
  //           if (modeldata[0][key]) {
  //             cnt = cnt + 1;
  //             break;
  //           }
  //         }
  //         if (cnt == 0) {
  //           modeldata.pop();
  //         }
  //       }
  //       if (modelprop) {
  //         lsuniquekey = modelprop[0].uniquekey;
  //       }
  //       if (lsuniquekey) {
  //         var lsval = data[lsuniquekey]
  //         if (lsval != undefined)
  //           var objIndex = modeldata.findIndex((obj => obj[lsuniquekey] == lsval));
  //         if (objIndex != undefined && objIndex >= 0)
  //           modeldata[objIndex] = data;
  //         else
  //           modeldata.push(data);
  //         //[OLS-I514 10-06-2022 ORE025]
  //       }
  //       else {
  //         modeldata.push(data);
  //       }
  //     }
  //     else {
  //       modeldata.push(data);
  //     }
  //     State.state.datamodal.models[modelname] = modeldata;
  //     OreControlbinding.setDataModelsNew(State, modelname);
  //     OreApibinding.HandleMobileStorage(destmodel, modeldata);
  //     return { status: true, message: '', data: '' };
  //   }
  //   else {
  //     OreAlert.alert('No Data', 'No Data Found')
  //   }

  // },
  //End[OLS-I514 04-05-2022 ORE025]
  async ModelPush(State, data, destmodel) {
    var modelprop = OreApibinding.GetModelProperty(destmodel);
    var modeldata = OreApibinding.GetModelData(State, destmodel)
    //var data = OreApibinding.GetModelData(State, srcmodel)
    if (data) {
      data = JSON.parse(JSON.stringify(data));
      var modelname = OreApibinding.GetModelName(destmodel)
      if (modeldata) {
        //modelPush not working for collection to collection[OLS-I514 05-07-2022 ORE025]
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
        if (modelprop) {
          lsuniquekey = modelprop[0].uniquekey;
        }
        if (lsuniquekey) {
          if (Array.isArray(data)) {
            var temp = data
            var count = temp.length;
            for (i = 0; i < count; i++) {
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
      OreApibinding.HandleMobileStorage(destmodel, modeldata);
      return { status: true, message: '', data: '' };
    }
    else {
      OreAlert.alert('No Data', 'No Data Found')
    }

  },
  async PushMethod(destination, source) {
    if (Array.isArray(source)) {
      // for (i = 0; i < source.length; i++) {
      //   destination.push(source[i]);
      // }
      destination.push(...source);
    }
    else {
      destination.push(source);
    }
    return destination;
  },
  //[OLS-I514 05-07-2022 ORE025]
  async SetDataBindNew(State, objcode, mserialno, controlname) {
    OreApibinding.SetDataBinding(State, controlname);
  },
  async SetDataBinding(State, controlname, type) {
    var controldata = State.state.orepageproperty[controlname];
    var modelcode = controldata.Property.datamodelbinding.split('#')[0];
    //to enable content loader for flat list[OLS-I442 17-04-2022 ORE025]
    var type = controldata.type
    // if (!modelcode) {
    //   if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
    //   return;
    // }
    if (type == "Flat") {
      if (!modelcode) {
        State.state.orepageproperty[controlname].Property.contentLoader = 'none';
        return;
      }
      else {
        State.state.orepageproperty[controlname].Property.contentLoader = 'flex';
      }
    }
    //End[OLS-I442 17-04-2022 ORE025]
    var datamodal = OreApibinding.GetModelName(modelcode);
    var isserver = true;
    var modelprop = OreApibinding.GetModelProperty(modelcode);
    var lscache = modelprop[0].localstorage;
    var lssession = modelprop[0].sessionstorage;
    var lsredux = modelprop[0].reduxstorage;
    var localjson = [];
    var controldata = State.state.orepageproperty[controlname];
    controldata = controldata.Property;
    var mapdata = controldata['modelmapdata'];
    var bindtype = mapdata.split('#')[0];
    if (lssession) {
      try {
        localjson = await Orefuncs.GetLocalStorageDirect(datamodal);
        if (localjson && localjson.length > 0) {
          if (bindtype.toLowerCase() == "sqlite" || bindtype.toLowerCase() == "realm") {
            //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
            await OreApibinding.SetDataBind(State, controlname, localjson, false);
            //End OLS-I318-On 05-03-2022 by ORE034
          } else {
            //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
            await OreApibinding.SetDataBind(State, controlname, localjson, true);
            //End OLS-I318-On 05-03-2022 by ORE034
          }
          isserver = false;
        }
        else {
          isserver = true;
        }
      } catch { }
    }
    else if (lscache) {
      localjson = await OreApibinding.GetCacheData(datamodal)
      try {
        if (localjson && localjson.length > 0) {
          if (bindtype.toLowerCase() == "sqlite" || bindtype.toLowerCase() == "realm") {
            //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
            await OreApibinding.SetDataBind(State, controlname, localjson, false);
            //End OLS-I318-On 05-03-2022 by ORE034
          } else {
            //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
            await OreApibinding.SetDataBind(State, controlname, localjson, true);
            //End OLS-I318-On 05-03-2022 by ORE034
          }
          isserver = false;
        }
        else {
          isserver = true;
        }
      } catch { }
    }
    /* Redux - ORE-I5711 - by YG(ORE036) - Start*/
    else if (lsredux) {
      try {
        try {
          localjson = await Orefuncs.getRedux(datamodal, true);
          if (localjson && localjson.length > 0) {
            if (bindtype.toLowerCase() == "sqlite" || bindtype.toLowerCase() == "realm") {
              //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
              await OreApibinding.SetDataBind(State, controlname, localjson, false);
              //End OLS-I318-On 05-03-2022 by ORE034
            } else {
              //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
              await OreApibinding.SetDataBind(State, controlname, localjson, true);
              //End OLS-I318-On 05-03-2022 by ORE034
            }
            isserver = false;
          }
          else {
            isserver = true;
          }
        } catch (error) {
          console.log(error)
        }
      } catch { }
    }
    /* Redux - ORE-I5711 - by YG(ORE036) - End*/
    if (isserver) {
      var controldata = State.state.orepageproperty[controlname];
      controldata = controldata.Property;
      var mapdata = controldata['modelmapdata'];
      var selectSource = null;
      var objcode = null;
      var bindname = null;
      if (mapdata) {
        selectSource = mapdata.split('#')[0];
        objcode = mapdata.split('#')[1];
      }
      else {
        var modeldata = OreApibinding.GetModelProperty(modelcode);
        var mapdata = modeldata[0].modelmapdata;
        selectSource = mapdata.split('#')[0];
        objcode = mapdata.split('#')[1];
      }
      if (selectSource) {
        switch (selectSource) {
          case BindType.LOCAL:
            {
              bindname = mapdata.split('#')[2];
              localjson = OreApibinding.GetJSONData(modelcode, objcode);
              if (localjson.status) {
                //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
                await OreApibinding.HandleMobileStorage(modelcode, localjson.data)
                await OreApibinding.SetDataBind(State, controlname, localjson.data, true);
                //End OLS-I318-On 05-03-2022 by ORE034
              }
              else {
                //OreAlert.alert(localjson.message);
                Orefuncs.GlobalAlert("SMC003",controlname,modelcode,localjson.message,'');
              }
            }
            break;
          case BindType.API:
            {
              var serialno = mapdata.split('#')[2];
              var bindname = mapdata.split('#')[3];
              var apinfo = OreApibinding.GetAPIInfo(objcode, serialno, bindname);
              var modelrescode = apinfo.apidata.modelrescode;
              var mappingdata = apinfo.filterdata.mapping; // need to handle
              if (apinfo.status) {
                var apiresponse = await OreApibinding.RequestAPI(State, apinfo.apidata, controlname);
                if (apiresponse.status) {
                  var filterdata = ModelEngine.ConvertSelectedJson(apiresponse.data, apinfo.filterdata.filterpath);
                  if (filterdata.status) {
                    var mapfilterdata = OreApibinding.JsonToModelMapping(mappingdata, filterdata.data);
                    if (mapfilterdata.status) {
                      //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
                      await OreApibinding.HandleMobileStorage(modelcode, mapfilterdata.data)
                      await OreApibinding.SetDataBind(State, controlname, mapfilterdata.data, true, modelrescode);
                      //End OLS-I318-On 05-03-2022 by ORE034
                    }
                    else {
                      if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                      //OreAlert.alert('API map filter data', 'API mapping issue for ' + controlname + ': Error: ' + mapfilterdata.data);
                      Orefuncs.GlobalAlert("SMC003",controlname,modelcode,'API mapping issue -'+mapfilterdata.data,'');
                    }
                  }
                  else {
                    if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                    //OreAlert.alert('API Filter', 'API Filter issue for ' + controlname + ': Error: ' + filterdata.data);
                    Orefuncs.GlobalAlert("SMC003",controlname,modelcode,'API Filter issue - '+filterdata.data,'');
                  }
                }
                else {
                  if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                 // OreAlert.alert('API Response', 'Control: ' + controlname + 'API Message: ' + apiresponse.statuscode + ' : error: ' + JSON.stringify(apiresponse));
                //OLS-I1298 Issue Tracker - Internet is required message is not readable by Ore049 [11/05/2023]
                // var _errorMessage='Control: ' + controlname ;
                // if(apiresponse.statuscode!=undefined){ _errorMessage+='  API Message: ' + apiresponse.statuscode }
                // _errorMessage+= ' : error: ' + apiresponse.message;

                // OreAlert.alert('API Response', _errorMessage);
                Orefuncs.GlobalAlert("SMC003",controlname,modelcode,apiresponse.message,apiresponse.statuscode);
                //----------
                }
              }
              else {
                if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                //OreAlert.alert('No API', 'No API Found for ' + controlname);
                Orefuncs.GlobalAlert("SMC003",controlname,modelname,'No API Found','');
              }
            }
            break;
          case BindType.SQLITE:
            {
              var modelname = OreApibinding.GetModelName(modelcode);
              var data = sqlmodeldata.filter(function (item) {
                return item.modelname == modelname;
              });
              var sqliteresponse = await Sqliteengine.SelectQuery('', modelname, data[0].connname);
              if (sqliteresponse.status) {
                //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
                await OreApibinding.HandleMobileStorage(modelcode, sqliteresponse.data)
                await OreApibinding.SetDataBind(State, controlname, sqliteresponse.data, false);
                //End OLS-I318-On 05-03-2022 by ORE034
              }
              else {
                if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                //Null Error alert displays if the model has empty(Sqlite)[OLS-I922 21-11-22 ORE025]
                //OreAlert.alert('SQLITE Response', 'SQLITE Response null for ' + controlname + ': DATA:' + sqliteresponse.data);
                //End[OLS-I922 21-11-22 ORE025]
              }
            }
            break;
          case BindType.REALM:
            {
              var modelname = OreApibinding.GetModelName(modelcode);
              var data = sqlmodeldata.filter(function (item) {
                return item.modelname == modelname;
              });
              var sqliteresponse = await Sqliteengine.SelectQuery('', modelname, data[0].connname);
              if (sqliteresponse.status) {
                await OreApibinding.HandleMobileStorage(modelcode, sqliteresponse.data)
                await OreApibinding.SetDataBind(State, controlname, sqliteresponse.data, false);
              }
              else {
                if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';

              }
            }
            break;
          case BindType.FIRESTORE:
            {
              bindname = mapdata.split('#')[2];
              firestoreinfo = OreApibinding.GetFireStoreInfo(modelcode, objcode);
              if (firestoreinfo.status) {
                var fireresponse = await OreApibinding.GetFireStoreData(firestoreinfo.data);
                if (fireresponse.status) {
                  //Need to add await keyword because of autobind concept is working in synchronize concept.OLS-I318-On 05-03-2022 by ORE034
                  await OreApibinding.HandleMobileStorage(modelcode, fireresponse.data);
                  await OreApibinding.SetDataBind(State, controlname, fireresponse.data, true);
                  //End OLS-I318-On 05-03-2022 by ORE034
                }
                else {
                }
              }
              else {
                if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
                //OreAlert.alert(localjson.message);
                Orefuncs.GlobalAlert("SMC003",controlname,modelcode,localjson.message,'');
              }
            }
            break;
          default:
            {

            }
            break;
        }
      }
      else {
        if (type == "Flat") State.state.orepageproperty[controlname].Property.contentLoader = 'none';
        //OreAlert.alert('No Source', 'No Source mapped for ' + controlname);
        Orefuncs.GlobalAlert("SMC003",controlname,modelcode,'No Source mapped for','');
      }
    }
  },
  async SetDataBind(State, controlname, jsondata, needschemavalid, modelrescode = '') {
    var controldata = State.state.orepageproperty[controlname];
    controldata = controldata.Property;
    var modelcode = controldata.datamodelbinding.split('#')[0];
    var modalname = OreApibinding.GetModelName(modelcode);

    // // Need to optimize the code for filter the in data binding [04-05-23 - OLS-I1245 - ORE050]
    // try {
    //   var datafilter = State.state.orepageproperty[controlname].servicedatacollection.additionalinfo.expression;
    //   if (datafilter != "") {
    //     datafilter = datafilter.replaceAll("&&", "&& item.");
    //     datafilter = datafilter.replaceAll("||", "|| item.");
    //     // sqlfilter = sqlfilter.replaceAll("  ", "");
    //     console.log(datafilter);
    //     var filterVal = "jsondata.filter(function (item) { return item." + datafilter + "});"
    //     var Gvalue = await OreApibinding.GetVariableValuesFromState(filterVal, State);
    //     jsondata = eval(Gvalue)
    //   }
    // }
    // catch (error) {
    //   Alert.alert("Expression not mapped properly", error.toString());
    // }
    // // End[04-05-23 - OLS-I1245 - ORE050]

    // Need to optimize the code for filter the in data binding [04-05-23 - OLS-I1245 - ORE0509]

    try {
      if (State.state.orepageproperty[controlname].servicedatacollection != undefined) {
        var datafilter = State.state.orepageproperty[controlname].servicedatacollection.additionalinfo.expression;
        if (datafilter != "" && datafilter != undefined && datafilter != "null") {
          const searchRegExp = "&&";
          const replaceWith = "&& item.";
          const searchRegExp1 = "||";
          const replaceWith1 = "|| item.";
          datafilter = datafilter.replace(searchRegExp, replaceWith);
          datafilter = datafilter.replace(searchRegExp1, replaceWith1);
          console.log(datafilter);
          var Gvalue;
          var filterVal = "jsondata.filter(function (item) { return item." + datafilter + "});"
          if (filterVal.includes("$") || filterVal.includes("%") || filterVal.includes("#")) {
            Gvalue = await OreApibinding.GetVariableValuesFromState(filterVal, State);
            jsondata = eval(Gvalue)
          }
          else {
            Gvalue = filterVal;
            jsondata = eval(Gvalue)
          }
        }
      }
    }
    catch (error) {
      //Alert.alert("Expression not mapped properly", error.toString());
      Orefuncs.GlobalAlert("SMC002",controlname,modalname,'Expression Issue -'+ error.toString(),'');
    }

    // End[04-05-23 - OLS-I1245 - ORE0509]

    if (modelcode != modelrescode) {
      let modelinfo = modeldata.filter(function (el) { return el.modelcode == modelrescode; });
      if (modelinfo.length > 0) {
        var c = modelinfo[0].modeldata.filter(function (el) { return el.datamodel == modelcode; });
        var lsresmodename = OreApibinding.GetModelName(modelrescode);
        State.state.datamodal.models[lsresmodename] = jsondata;
        jsondata = Orefuncs.getdatafromobjectorarrayusingstringpath(jsondata, c[0].name);
      }
    }
    if (needschemavalid) {
      if (jsondata != undefined && jsondata != null) {
        if (jsondata.length > 0) {
          var schemavalid = OreApibinding.SchemaValidation(modelcode, jsondata);
          if (!schemavalid.status) {
            //Alert.alert('Model Validation', schemavalid.error);
            Orefuncs.GlobalAlert("SMC002",controlname,modelcode,schemavalid.error,'');
            return false;
          }
        }
        else {
        }
      }
      else {
      }
    }
    State.state.datamodal.models[modalname] = jsondata;
    OreControlbinding.setDataModel(State, controlname, modalname);
  },
  async GetHeadervalue(State, headers) { //ORE021 Add on 26-10-2021
    try {
      if (headers.length > 0) {
        let lsvalue = [];
        await headers.forEach(async item => {
          if (item.HeaderSource.toUpperCase() == 'STATIC VALUE') {
            var authkey = { [item.tname]: item.value };
            lsvalue.push(authkey);
          }
          else if (item.HeaderSource.toUpperCase() == 'DATA MODEL') {
            var modelcode = item.HeaderDataModal
            var datamodal = OreApibinding.GetModelName(modelcode);
            var lshvalue = State.state.datamodal.models[datamodal][item.name];
            lshvalue = await OreApibinding.GetDataModalFieldData(State, modelcode, item.name);
            lshvalue = lshvalue.data;
            var authkey = { [item.name]: lshvalue };
            lsvalue.push(authkey);
          }
          else if (item.HeaderSource.toUpperCase() == 'APP CONFIG') {
            const lsconfig = appconfig[0].Configurations;
            value = lsconfig.filter(function (temp) { return temp[item.happkey] })[0][item.happkey];
            var authkey = { [item.happkey]: value };
            lsvalue.push(authkey);
          }
          else if (item.HeaderSource.toUpperCase() == 'PAGE VALUE') {
            var lsval = State[item.value].props.value;
            var authkey = { name: item.tname, value: lsval };
            lsvalue.push(authkey);
          }
          //Live-IDE-Global variable variable not get loaded in the Data service Tab against the Flat control[OLS-I1081 ORE030 13/02/2023]
          else if (item.HeaderSource.toUpperCase() === 'PAGE VARIABLES') {
            let GVar = State.state.GlobalVariables;

            if (GVar[item.value] != undefined && GVar[item.value] != "") {
              var Gvalue = GVar[item.value];
              Gvalue = await OreApibinding.GetVariableValuesFromState(Gvalue, State);
            }
            var authkey = { [item.tname]: Gvalue };
            lsvalue.push(authkey);
          }
          //End [OLS-I1081 ORE030 13/02/2023]
          if (lsvalue.length < 1) {
            Alert.alert('Header', 'header key and value property not mapped');
          }
        });
        return lsvalue;
      }
    } catch (error) {
      console.log(error.toString())
      Alert.alert('Header', 'header key and value property not mapped');
      return false;
    }
  },
  async GetAuthvalue(State, authorization) { //ORE021 Add on 26-10-2021
    try {
      var lsnsource = "";
      var lspsource = "";
      var value = "";
      let lsusername = '';
      let lspassword = '';
      if (authorization.type == 'bearer') {
        lsnsource = authorization.bearersource.toUpperCase();
        if (lsnsource == 'STATIC VALUE') {
          var value = authorization.bearervalue;
        }
        if (lsnsource == 'DATA MODEL') {
          var modelcode = authorization.bearerDataModal
          var datamodal = OreApibinding.GetModelName(modelcode);
          value = State.state.datamodal.models[datamodal][authorization.bearerfname];

          //Flat List is not loading getting API Response Error by Ore049 for Authorization 
          // value = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.bearerfname);
          // value = value.data;
          if (authorization.bearerfname.includes(".")) {
            value = await OreApibinding.GetObjectFieldValue(State.state.datamodal.models[datamodal], authorization.bearerfname);
          }
          else {
            value = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.bearerfname);
            value = value.data;
          }
          //-------
        }
        if (lsnsource == 'APP CONFIG') {
          const lsconfig = appconfig[0].Configurations;
          value = lsconfig.filter(function (item) { return item[authorization.bearerappkey] })[0][authorization.bearerappkey];
        }
        if (lsnsource == 'PAGE VALUE') {
          value = State[authorization.bearervalue].props.value;
        }
      }
      else if (authorization.type.toUpperCase() == 'BASIC') {
        lsnsource = authorization.value.usersource.toUpperCase();
        lspsource = authorization.value.pwdsource.toUpperCase();
        if (lsnsource == 'STATIC VALUE') {
          lsusername = authorization.value.username.toString();
        }
        if (lspsource == 'STATIC VALUE') {
          lspassword = authorization.value.password.toString();
        }
        if (lsnsource == 'DATA MODEL') {
          var modelcode = authorization.value.userDataModal
          var datamodal = OreApibinding.GetModelName(modelcode);
          lsusername = State.state.datamodal.models[datamodal][authorization.value.userfname].toString();
          //Flat List is not loading getting API Response Error by Ore049 for Authorization 
          // lsusername = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.value.userfname);
          // lsusername = lsusername.data;
          if (authorization.value.userfname.includes(".")) {
            lsusername = await OreApibinding.GetObjectFieldValue(State.state.datamodal.models[datamodal], authorization.value.userfname);
          }
          else {
            lsusername = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.value.userfname);
            lsusername = lsusername.data;
          }
          //--------------
        }
        if (lspsource == 'DATA MODEL') {
          var modelcode = authorization.value.pwdDataModal
          var datamodal = OreApibinding.GetModelName(modelcode);
          lspassword = State.state.datamodal.models[datamodal][authorization.value.pwdfname].toString();
          //Flat List is not loading getting API Response Error by Ore049 for Authorization 
          // lspassword = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.value.pwdfname);
          // lspassword = lspassword.data;
          if (authorization.value.userfname.includes(".")) {
            lspassword = await OreApibinding.GetObjectFieldValue(State.state.datamodal.models[datamodal], authorization.value.pwdfname);
          }
          else {
            lspassword = await OreApibinding.GetDataModalFieldData(State, modelcode, authorization.value.pwdfname);
            lspassword = lspassword.data;
          }
          //--------------       
        }
        if (lsnsource == 'APP CONFIG') {
          const lsconfig = appconfig[0].Configurations;
          lsusername = lsconfig.filter(function (lsitem) { return lsitem[authorization.value.userappkey] })[0][authorization.value.userappkey];
        }
        if (lspsource == 'APP CONFIG') {
          const lsconfig = appconfig[0].Configurations;
          lspassword = lsconfig.filter(function (lsitem) { return lsitem[authorization.value.pwdappkey] })[0][authorization.value.pwdappkey];
        }
        if (lsnsource == 'PAGE VALUE') {
          lsusername = State[authorization.value.username].props.value;
        }
        if (lspsource == 'PAGE VALUE') {
          lspassword = State[authorization.value.password].props.value;
        }
      }
      if (authorization.type.toUpperCase() == "BEARER") {
        var authkey = {
          type: authorization.type,
          value: value
        }
        if (value === "") {
          authkey = {};
        }
      }
      else if (authorization.type.toUpperCase() == "BASIC") {
        var authkey = {
          type: authorization.type,
          value: { username: lsusername, password: lspassword }
        }
        if (lsusername === "" || lspassword === "") {
          authkey = {};
        }
      }
      return authkey;
    } catch (error) {
      console.log(error.toString())
      //need alert
      return null;
    }
  },
  async RequestAPI(State, apidata, controlname = '') {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      OreApibinding.GetValue(State);
      var TYPE = apidata.methodtype.toUpperCase();
      var baseUrl = await conndata.GetAPIBaseURL(apidata.dataconnectorval);
      if (!baseUrl) return { status: false, message: 'Connector not found', error: apidata.dataconnectorval };
      baseUrl = baseUrl.slice(-1) == '/' ? baseUrl : baseUrl + '/';
      let methodname = apidata.methodname;
      if (methodname === '/') methodname = methodname.replace('/', '');
      var URL = baseUrl + methodname;
      var pageparamauth = false;
      var pageparamheader = false;
      var pageparamrequest = false;
      var params = null;
      if (controlname !== "") {
        pageparamauth = State.state.orepageproperty[controlname].Property['pageparamauth'];
        pageparamheader = State.state.orepageproperty[controlname].Property['pageparamheader'];
        pageparamrequest = State.state.orepageproperty[controlname].Property['paramavailable'];//testdata
      }
      if (pageparamrequest) {
        params = await OreApibinding.GetParamData(State.state.orepageproperty[controlname].Property['param'], State);
      }
      else {
        params = await OreApibinding.GetParamData(apidata.requestjson, State);
      }
      if (params.strpara && params.strpara !== "") {
        URL = URL + params.strpara;
      }
      var headers = [];
      if (pageparamauth) {
        var authkey = await OreApibinding.GetAuthvalue(State, State.state.orepageproperty[controlname].Property['authorization']);
      }
      else {
        var authkey = await OreApibinding.GetAuthvalue(State, apidata.authorization);
      }
      if (pageparamheader) {
        var lsheader = State.state.orepageproperty[controlname].Property['headerjsondata']
        if (lsheader.length > 0) {
          headers = await OreApibinding.GetHeadervalue(State, lsheader);
        } else {
          Alert.alert('Header', 'header key and value property not mapped');
          return false;
        }
      }
      else {
        if (apidata.header.length > 0) {
          headers = await OreApibinding.GetHeadervalue(State, apidata.header);

        } else {
          headers = [{}];
        }
      }
      var body = null;
      if (apidata.methodtype !== HTTPMethod.GET && apidata.methodtype !== HTTPMethod.DELETE) {
        // if (apidata.modelcode == "" && apidata.modelrescode != "") {
        //   apidata.modelcode = apidata.modelrescode
        // }
        //Getting schema validation error for post method if body model is empty[OLS-I1014 ORE025 19-12-22]
        if (apidata.modelcode == "") {
          body = {}
        }
        //End[OLS-I1014 ORE025 19-12-22]
        else {
          body = await OreApibinding.GetDataModalData(State, apidata.modelcode);
          if (body.status) {
            // let schemastatus = OreApibinding.SchemaValidation(apidata.modelcode, body.data);
            // if (!schemastatus.status) {
            //   OreAlert.alert("Model Validaton", apidata.modelcode + " :" + JSON.stringify(schemastatus));
            //   return schemastatus;
            // }
            // For File upload Ignore Schema validation by Kathir --Start
            //In API Source, Need a provision to map Raw-Text data[OLS-I1100 ORE025 16-02-23]
            var keys = Object.keys(body.data)
            if (keys.length == 1 && keys[0] == 'rawtext') {
              body = body.data.rawtext
            }
            else {
              if (body.data._parts == undefined) {
                let schemastatus = OreApibinding.SchemaValidation(apidata.modelcode, body.data);
                if (!schemastatus.status) {
                  OreAlert.alert("Model Validaton", apidata.modelcode + " :" + JSON.stringify(schemastatus));
                  return schemastatus;
                }
              }
              //End
              body = body.data;
            }
            //End[OLS-I1100 ORE025 16-02-23]

          }

          else body = '';
        }
      }
      const response = await OreApibinding.HTTPRequest(TYPE, URL, params.paramobj, headers, body, authkey);
      //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047
      var res = response
      res.modelcode = apidata.modelrescode
      // OLS-I1012 - Api response live error by ORE030 - Start
      if (State.state.ApiResponse != undefined) {
        State.state.ApiResponse.push(res);
      }
      // OLS-I1012 - Api response live error by ORE030 - End
      //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047
      return response;
    } catch (error) {
      console.log(error.toString())
      return { status: false, message: 'RequestAPI catch error', data: null, error: error.toString() };
    }
  },
  GetAPIInfo(objcode, serialno, bindingname = '') {
    var objdata = ore_api.filter(function (item) { return item.apicode == objcode });
    if (objdata && objdata.length > 0) {
      var propscrt = objdata[0].methoddata;
      var methodinfo = propscrt.filter(function (item) { return item.mserialno == serialno });
      if (methodinfo && methodinfo.length > 0) {
        if (bindingname != 'null') {
          var bindata = methodinfo[0].proptreedata;
          var filterdata = bindata.filter(function (item) { return item.bindingname == bindingname });
          if (filterdata && filterdata.length > 0) {
            return { status: true, filterdata: filterdata[0], apidata: methodinfo[0], message: 'Success' };
          }
          else {
            return { status: false, filterdata: null, apidata: null, message: 'Binding not exist' };
          }
        }
        else {
          return { status: true, filterdata: '', apidata: methodinfo[0], message: 'Success' };
        }
      }
      else {
        return { status: false, filterdata: null, apidata: null, message: 'Method info not exist' };
      }
    }
    else {
      return { status: false, filterdata: null, apidata: null, message: 'API info not exist' };
    }
  },
  GetJSONData(modelcode, objcode) {
    var objdata = ore_json.filter(function (item) { return item.objcode == objcode });
    if (objdata && objdata.length > 0) {
      objdata = objdata[0];
      var assetname = objdata.assetobjname;
      var modeldata = objdata.models.filter(function (item) { return item.modelcode == modelcode });
      if (modeldata && modeldata.length > 0) {
        let filterpath = modeldata[0].filterpath;
        var jsondata = OreApibinding.GetAssetData(assetname);
        if (jsondata.status) {
          let filterdata = ModelEngine.ConvertSelectedJson(jsondata.data, filterpath);
          if (filterdata.status) {
            return OreApibinding.JsonToModelMapping(modeldata[0].mapping, filterdata.data);
          }
          else {
            return { status: false, message: 'GetJSONData: No Records found', data: [] };
          }
        }
        else {
          var message = 'GetJSONData: Local JSON asset file not found for ' + objcode;
          return { status: false, message: message, data: [] };
        }
      }
      else {
        var message = 'GetJSONData: Local JSON model not found for ' + modelcode;
        return { status: false, message: message, data: [] };
      }
    }
    else {
      var message = 'GetJSONData: Local JSON not found for ' + objcode;
      return { status: false, message: message, data: [] };
    }
  },
  GetAssetData(assetname) {
    try {
      if (assetname) {
        var lsassetdata = assets[assetname.split('.')[0]];
        if (lsassetdata) {
          return { status: true, message: 'Success', data: lsassetdata };
        }
        else {
          return { status: false, message: 'Asset file not found in asset folder', data: 'Asset file not found in asset folder' };
        }
      }
      else {
        return { status: false, message: 'Get Asset Data assetname required', data: e.toString() };
      }
    } catch (e) {
      return { status: false, message: 'Get Asset data', data: e.toString() };
    }
  },
  GetFireStoreInfo(modelcode, objcode) {
    try {
      var objdata = ore_firestore.filter(function (item) { return item.objcode == objcode });
      if (objdata && objdata.length > 0) {
        objdata = objdata[0];
        var propscrt = objdata.propscrt;
        var bindinginfo = propscrt.filter(function (item) { return item.modelcode == modelcode });
        if (bindinginfo.length > 0) {
          return { status: true, message: 'Success', data: bindinginfo[0] };
        }
        else {
          return { status: false, message: 'GetFireStoreInfo: Model not in ' + objcode, data: '' };
        }
      }
      else {
        return { status: false, message: 'GetFireStoreInfo: ' + objcode + ' objcode not in ore_firestore', data: '' };
      }
    } catch (error) {
      return { status: false, message: error.toString(), data: '' };
    }
  },
  ConvertLocalFilter(filter, data) {
    var filterdata = null;
    if (data.length > 0) {
      for (const iterator of filter) {
        switch (iterator.operator) {
          case "==":
            filterdata = data.filter(function (item) { return item[iterator.field] == iterator.value });
            break;
          default:
            break;
        }
      }
      return filterdata;
    }
    else {
      return data;
    }
  },
  async ModelUpdateSingleValue(State, mapdata, objcode, bindtype, conmodelkey, conmodelvalue) {
    if (!bindtype) {
      Alert.alert('Source', 'Source required');
      return false;
    }
    else {
      switch (bindtype.toUpperCase()) {
        case BindType.FIRESTORE:
        case BindType.FIREBASE:
          {
            return await OreApibinding.FireStoreUpdateSingleValue(State, mapdata, objcode, conmodelkey, conmodelvalue);
          }
          break;
        case BindType.SQLITE:
          {
            //Model Update Single Value Method to binding SQLite Database[OLS-I990 ORE025 09-12-22]
            var modelcode = mapdata.split('#')[0];
            var fieldname = mapdata.split('#')[1].split(".")[1];
            var modelname = OreApibinding.GetModelName(modelcode);
            var data = sqlmodeldata.filter(function (item) {
              return item.modelname == modelname;
            });
            var modelprop = OreApibinding.GetModelProperty(modelcode);
            let key = modelprop[0].uniquekey;
            if (key) {
              return await Sqliteengine.UpdateSingleColumnQuery(modelname, data[0].connname, key, conmodelkey, fieldname, conmodelvalue);
            }
            else {
              Alert.alert('Source - Model Update', 'Unique key should be given');
            }
            // return await OreApibinding.SqliteSingleColUpdate(State, mapdata, objcode, conmodelkey, conmodelvalue);
            //End[OLS-I990 ORE025 09-12-22]
          }
        default:
          Alert.alert('Source - Model Update', 'Unknown Source: ' + bindtype.toUpperCase());
          return false;
          break;
      }
    }
  },
  async FireStoreUpdateSingleValue(State, mapdata, objcode, conmodelkey, conmodelvalue) {
    try {
      var modelcode = mapdata.split('#')[0];
      var updatecol = mapdata.split('#')[1].split('.')[1].trim();
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      var modelprop = await OreApibinding.GetModelProperty(modelcode);
      var modeldata = await OreApibinding.GetDataModalData(State, modelcode, true);
      if (!modeldata.status) {
        return modeldata;
      }
      else modeldata = modeldata.data;
      var fireinfo = await OreApibinding.GetFireStoreInfo(modelcode, objcode);
      if (fireinfo.status) {
        let fireinfodetail = fireinfo.data;
        let collectionName = fireinfodetail.collectionname;
        let subcollection = fireinfodetail.subcollection;
        let key = modelprop[0].uniquekey;
        if (key) {
          //var collres = await firestore.getDocumentById(collectionName, subcollection);
          var collres = await firestore.getDocumentById(collectionName, conmodelkey);   //[ORE030]
          collres = collres.data;
          collres[updatecol] = conmodelvalue;
          //var docadd = await firestore.addCollection(collectionName, collres, subcollection)
          var docadd = await firestore.addCollection(collectionName, collres, key)      //[ORE030]
          if (docadd.status) {
            return docadd;
          }
          else {
            OreAlert.alert('Firestore Update Response', 'Firestore Message: ' + docadd.message + ' : error: ' + docadd.error);
          }
        }
        else {
          OreAlert.alert('FireStoreUpdate', 'Firestore Message: Key field not mapped in model for: ' + modelcode);
        }
      }
      else {
        OreAlert.alert('No Firestore', 'No Firestore Found');
      }
    } catch (error) {
      return { status: false, message: error.toString(), data: 'FireStoreUpdate' };
    }
  },
  ConvertFirebaseFilter(filter, modelcode) {
    var loFilter = [];
    if (filter.includes('&')) loFilter = filter.split('&');
    else loFilter.push(filter);
    var filterdata = [];
    for (const key in loFilter) {
      if (Object.hasOwnProperty.call(loFilter, key)) {
        let objdata = {};
        let lsdata = [];
        let element = loFilter[key];
        let operator = '';
        if (element.includes('!=')) {
          lsdata = element.split('!=');
          operator = '!=';
        }
        else if (element.includes('<=')) {
          lsdata = element.split('<=');
          operator = '<=';
        }
        else if (element.includes('>=')) {
          lsdata = element.split('>=');
          operator = '>=';
        }
        else if (element.includes('==')) {
          lsdata = element.split('==');
          operator = '==';
        }
        else if (element.includes('>')) {
          lsdata = element.split('>');
          operator = '>';
        }
        else if (element.includes('<')) {
          lsdata = element.split('<');
          operator = '<';
        }

        let datatype = OreApibinding.GetModelFieldDataType(modelcode, lsdata[0]);
        if (datatype.status) {
          datatype = datatype.data;
          let value = OreApibinding.ConvertToDataTypeFormat(datatype, lsdata[1]);
          objdata = { 'field': lsdata[0], 'operator': operator, 'value': value, 'datatype': datatype }
          filterdata.push(objdata);
        } else {
          return datatype;
        }
      }
    }
    return { status: true, message: 'Success', data: filterdata }
  },
  ConvertToDataTypeFormat(datatype, value) {
    switch (datatype) {
      case "String":
        return value.toString();
      case "Integer":
        return parseInt(value);
      case "Number":
        return Number(value);
      case "Bool":
        var isTrueSet = (value.toString().toLowerCase() === 'true');
        return isTrueSet;
      default:
        return value.toString();
    }
  },
  async FireStoreGetByFilter(State, modelcode, objcode, filter, destinationmodelcode) {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      //filter = "title!=Pizza&&cartValue=20";												
      console.log('FireStoreGetByFilter: ' + filter);
      var modeldata = await OreApibinding.GetDataModalData(State, modelcode);
      if (!modeldata.status) {
        return modeldata;
      }
      else modeldata = modeldata.data;
      var modelname = OreApibinding.GetModelName(modelcode);
      var desmodelname = OreApibinding.GetModelName(destinationmodelcode);
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var fireinfo = OreApibinding.GetFireStoreInfo(modelcode, objcode);
      //console.log("modelprop" + JSON.stringify(modelprop));												
      if (fireinfo.status) {
        let fireinfodetail = fireinfo.data;
        let collectionName = fireinfodetail.collectionname;
        let filterpath = fireinfodetail.filterpath;
        if (filter) {
          let lsfilter = OreApibinding.ConvertFirebaseFilter(filter, modelcode);
          if (lsfilter.status) {
            let fireresponse = await firestore.getDocumentByFilter(collectionName, lsfilter.data);
            console.log(`FireStoreGetByFilter: REQUEST: modelcode - ${modelcode} ,objcode - ${objcode} ,filter - ${JSON.stringify(lsfilter.data)}' ,collectionName - ${collectionName} : RESPONSE: ${JSON.stringify(fireresponse)}`);
            if (fireresponse.status) {
              var filterdata = ModelEngine.ConvertSelectedJson(fireresponse.data, filterpath);
              if (filterdata.status) {
                State.state.datamodal.models[desmodelname] = filterdata.data;
                fireresponse.data = filterdata.data;
                OreApibinding.HandleMobileStorage(destinationmodelcode, filterdata.data);
                OreApibinding.SetValue(State, destinationmodelcode);
                OreControlbinding.setDataModels(State);
              }
              else {
                OreAlert.alert('FireStoreGetFilter', 'Firestore Filter issue : Error: ' + filterdata.data);
                // OreApibinding.SnackbarAlert('Firestore Filter issue : Error: ' + filterdata.data);												
              }
            }
            else {
              //OreAlert.alert("FireStoreGetFilter Response", "Firestore Message: " + fireresponse.message + " : error: " + fireresponse.error);												
              State.state.datamodal.models[desmodelname] = fireresponse.data;
              OreApibinding.HandleMobileStorage(destinationmodelcode, fireresponse.data);
              OreApibinding.SetValue(State, destinationmodelcode);
              OreControlbinding.setDataModels(State);
            }
            return fireresponse;
          }
          else {
            OreAlert.alert('FireStoreGetFilter Response', 'Error: ' + lsfilter.data);
            // OreApibinding.SnackbarAlert('FireStoreGetFilter Response Error: ' + lsfilter.data);												
            return { status: false, message: 'FireStoreGetFilter filter error', data: lsfilter.data };
          }
        }
        else {
          return { status: false, message: 'FireStoreGetFilter filter required to get data', data: '' };
        }
      }
      else {
        OreAlert.alert('No Firestore', 'No Firestore Found');
        // OreApibinding.SnackbarAlert('No Firestore Found');												
      }
    } catch (error) {
      console.log('FireStoreGetFilter Error:' + error.toString());
      return { status: false, message: error.toString(), data: 'FireStoreGetFilter' };
    }
  },
  async FireStoreGet(State, modelcode, objcode, value) {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      var modeldata = await OreApibinding.GetDataModalData(State, modelcode);
      if (!modeldata.status) {
        return modeldata;
      }
      else modeldata = modeldata.data;
      var modelname = OreApibinding.GetModelName(modelcode);
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var fireinfo = OreApibinding.GetFireStoreInfo(modelcode, objcode);
      if (fireinfo.status) {
        let fireinfodetail = fireinfo.data;
        let collectionName = fireinfodetail.collectionname;
        let filterpath = fireinfodetail.filterpath;
        let key = modelprop[0].uniquekey;
        if (key) {
          let docId = modeldata[key].toString();
          docId = value;
          if (docId) {
            let fireresponse = await firestore.getDocumentById(collectionName, docId);
            if (fireresponse.status) {
              var filterdata = ModelEngine.ConvertSelectedJson(fireresponse.data, filterpath);
              if (filterdata.status) {
                State.state.datamodal.models[modelname] = filterdata.data;
                fireresponse.data = filterdata.data;
                OreApibinding.HandleMobileStorage(modelcode, filterdata.data);
                OreApibinding.SetValue(State, modelcode);
              }
              else {
                OreAlert.alert('Firestore Filter', 'Firestore Filter issue : Error: ' + filterdata.data);
              }
              return fireresponse;
            }
            else {
              OreAlert.alert('Firestore Get Response', 'Firestore Message: ' + fireresponse.message + ' : error: ' + fireresponse.error);
            }
          }
          else {
            return { status: false, message: 'docId required to get', data: '' };
          }
        }
        else {
          OreAlert.alert('FireStoreGet', 'Firestore Message: Key field not mapped in model for: ' + modelcode);
        }
      }
      else {
        OreAlert.alert('No Firestore', 'No Firestore Found');
      }
    } catch (error) {
      console.log('FireStoreGet Error:' + error.toString());
      return { status: false, message: error.toString(), data: 'FireStoreGet' };
    }
  },
  async FireStoreDelete(State, modelcode, objcode) {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      var modelname = OreApibinding.GetModelName(modelcode);
      var modeldata = await OreApibinding.GetDataModalData(State, modelcode, true);
      if (!modeldata.status) {
        return modeldata;
      }
      else modeldata = modeldata.data;
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var fireinfo = OreApibinding.GetFireStoreInfo(modelcode, objcode);
      if (fireinfo.status) {
        let fireinfodetail = fireinfo.data;
        let collectionName = fireinfodetail.collectionname;
        let key = modelprop[0].uniquekey;
        if (key) {
          let docId = modeldata[key].toString();
          if (docId) {
            let fireresponse = await firestore.deleteDocument(collectionName, docId);
            if (fireresponse.status) {
              return fireresponse;
            }
            else {
              OreAlert.alert('Firestore Delete Response', 'Firestore Message: ' + fireresponse.message + ' : error: ' + fireresponse.error);
            }
          }
          else {
            return { status: false, message: 'docId required to delete', data: '' };
          }
        }
        else {
          OreAlert.alert('FireStoreDelete', 'Firestore Message: Key field not mapped in model for: ' + modelcode);
        }
      }
      else {
        OreAlert.alert('No Firestore', 'No Firestore Found');
      }
    } catch (error) {
      return { status: false, message: error.toString(), data: 'FireStoreSave' };
    }
  },
  async FireStoreSave(State, modelcode, objcode) {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var modeldata = await OreApibinding.GetDataModalData(State, modelcode, true);
      if (!modeldata.status) {
        return modeldata;
      }
      else modeldata = modeldata.data;
      var fireinfo = OreApibinding.GetFireStoreInfo(modelcode, objcode);
      if (fireinfo.status) {
        let schemastatus = OreApibinding.SchemaValidation(modelcode, modeldata);
        if (!schemastatus.status) {
          Alert.alert('Model Validation', schemastatus.error);
          return schemastatus;
        }
        let fireinfodetail = fireinfo.data;
        let collectionName = fireinfodetail.collectionname;
        let key = modelprop[0].uniquekey;
        if (key) {
          let fireresponse = await firestore.addCollection(collectionName, modeldata, key);
          if (fireresponse.status) {
            if (modelprop[0].localstorage === true) {
              OreApibinding.HandleMobileStorage(modelcode, modeldata);
            }
            return fireresponse;
          }
          else {
            OreAlert.alert('Firestore Save Response', 'Firestore Message: ' + fireresponse.message + ' : error: ' + fireresponse.error);
          }
        }
        else {
          OreAlert.alert('FireStoreSave', 'Firestore Message: Key field not mapped in model for: ' + modelcode);
        }
      }
      else {
        OreAlert.alert('No Firestore', 'No Firestore Found');
      }
    } catch (error) {
      return { status: false, message: error.toString(), data: 'FireStoreSave' };
    }
  },
  async GetFireStoreData(firestoreinfo) {
    try {
      if (!OreApibinding.GetNetWorkStatus()) {
        return { status: false, message: 'Internet not available', data: '' };
      }
      var collectionName = firestoreinfo.collectionname;
      var fireresponse = await firestore.getDocuments(collectionName);
      return fireresponse;
    } catch (error) {
      return { status: false, message: error.toString(), data: 'GetFireStoreData' };
    }
  },

  //GetModalFieldData given by Engineering Team On 29-03-2022 ORE025
  async GetModalFieldData(State, model, fieldname) {
    var data = '';
    var ldata = '';
    //Getting model value using model name[ORE-I5227 ORE025 2-12-22]
    var modelinfo = modeldata.filter(function (item) { return item.modelname == model || item.modelcode == model });
    if (Array.isArray(modelinfo) && modelinfo.length > 0) {
      var modelname = modelinfo[0].modelname; var modelcode = modelinfo[0].modelcode;
      try {
        OreApibinding.GetValue(State);
        var modelprop = OreApibinding.GetModelProperty(modelcode);
        var lscache = false;
        var lssession = true;
        if (modelprop) {
          lscache = modelprop[0].localstorage;
          lssession = modelprop[0].sessionstorage;
          lsredux = modelprop[0].reduxstorage;
        }
        // let modelname = OreApibinding.GetModelName(modelcode)
        if (lscache === true) {
          ldata = await OreApibinding.GetCacheData(modelname);
        }
        else if (lssession === true) {
          ldata = await Orefuncs.GetLocalStorageDirect(modelname);
        }
        else if (lsredux === true) {
          ldata = await Orefuncs.getRedux(modelname, true);
        }
        if (!ldata) {
          ldata = State.state.datamodal.models[modelname];
        }
        // ldata = Orefuncs.getdatafromobjectorarrayusingstringpath(ldata, fieldname);
        // ldata = { status: true, message: 'Success', data: ldata };
        //If condition False block only executes while validate the API Response While using model count by ORE034 on 10-08-2022 
        if (fieldname == "Count") {
          ldata = OreApibinding.ModelCount(State, modelcode);
          //Model count is not working[22-9-22 ORE025]
          ldata = { status: true, message: 'Success', data: ldata };
          //End[22-9-22 ORE025]
        }
        //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047
        else if (fieldname == "HTTPStatusCode" || fieldname == "HTTPStatus" || fieldname == "HTTPStatusMessage") {
          ldata.data = await OreApibinding.ModelResponse(State, modelcode, fieldname);
        }
        //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047

        else {
          //Firebase ModelFilter result return Array Issue [ORE030 23-11-2022]
          if (Array.isArray(ldata) && ldata.length > 0) {
            ldata = ldata[0];
          }
          // End [ORE030 23-11-2022]
          ldata = Orefuncs.getdatafromobjectorarrayusingstringpath(ldata, fieldname);
          ldata = { status: true, message: 'Success', data: ldata };
        }
        //End by ORE034 on 10-08-2022 
        return ldata;
      } catch (error) {
        //Live-Preview-Pin page-Getting json parser alert while open the PIN Page [OLS-I823 ORE034 15-10-2022]
        //data = { status: false, message: 'GetDataModalFieldData error', data: error.toString() };
        data = { status: false, message: 'GetDataModalFieldData error ' + error.message.toString(), data: "" };
        //End [OLS-I823 ORE034 15-10-2022]
        return data;
      }
    }
    else {
      data = { status: false, message: 'GetDataModalFieldData error - Model not found', data: "" };
      return data;
    }
    //End[ORE-I5227 ORE025 2-12-22]

  },
  //End On 29-03-2022 ORE025
  JsonToModelMapping(mappingdata, jsondata) {
    if (mappingdata) {
      return OreApibinding.JsonTransform(jsondata, mappingdata.modeldata);
    }
    else {
      return { status: true, message: 'Success', data: jsondata };
    }
  },
  JsonTransform(jsonobject, modeldata) {
    try {
      let jsontype = ModelEngine.GetType(jsonobject).data;
      let modeltype = ModelEngine.GetType(modeldata).data;
      if (modeltype === 'array') {
        modeldata = modeldata[0];
      }
      else {
        if (jsontype === 'array') {
          jsonobject = jsonobject[0];
        }
      }
      var map = { item: modeldata, operate: [] };
      var context = null;
      var dataTransform = new DataTransform(jsonobject, map)
      var result = dataTransform.transform(context);
      if (jsontype === 'object' && modeltype === 'array') result = [result];
      return { status: true, message: '', data: result };
    } catch (error) {
      Alert.alert('JsonTransform: ' + error.toString());
      return { status: false, message: 'JsonTransform failed', data: error.toString() };
    }
  },
  ModelCount(State, modelcode) {
    var count = 0;
    let data = OreApibinding.GetModelData(State, modelcode);
    if (data) {
      if (Array.isArray(data)) {
        count = data.length;
      }
      else {
        count = 1;
      }
    }
    return count;
  },
  //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047
  async ModelResponse(State, modelcode, type) {
    var geterror = State.state.ApiResponse.filter(function (item) { return item.modelcode == modelcode });
    if (geterror.length != 0) {
      var objserial = geterror.length - 1
      geterror = geterror[objserial]
    }
    switch (type.toUpperCase()) {
      case 'HTTPSTATUSCODE':
        value = geterror.statuscode;
        break;
      case 'HTTPSTATUS':
        value = geterror.status;
        break;
      case 'HTTPSTATUSMESSAGE':
        value = geterror.description;
        break;
      default:
        break;
    }

    return value
  },
  //OLS-I522 - Api - Need a provision to error handling (With two different models) by ore047
  async SearchModelSet(State, modelcode, searchField, searchFieldValue) {
    let modelname = OreApibinding.GetModelName(modelcode);
    State.state.datamodal.models[modelname][searchField] = searchFieldValue;
  },

  async ModelSet(State, modelcode, data = null) {
    let modelname = OreApibinding.GetModelName(modelcode);
    if (data) State.state.datamodal.models[modelname] = data;
    else {
      data = OreApibinding.GetModelData(State, modelcode);
      State.state.datamodal.models[modelname] = data;
    };
    OreApibinding.SetValue(State, modelcode);
    OreControlbinding.setDataModelsNew(State, modelname);
    OreApibinding.HandleMobileStorage(modelcode, data);
  },

  // ORE030 - Sync Method - Start
  ModelSetFieldDir(State, modelcode, fieldname, value) {
    try {
      let modelname = OreApibinding.GetModelName(modelcode);
      // if(!isNaN(value)){
      //   value=parseFloat(value)
      // }
      // else if(value&&value=='true'){
      //   value=true
      // }
      // else if(value&&value=='false'){
      //   value=false

      //To change value based on datamodel filed type[02-03-2022 ORE025]
      let fieldtype = OreApibinding.GetModelFieldDataType(modelcode, fieldname);
      switch (fieldtype.data.toUpperCase()) {
        case 'BOOL':
          if (value && value == 'true') {
            value = true;
          }
          else {
            value = false;
          }
          break;
        case 'NUMBER': case 'INTEGER':
          //Nan returned if value is empty string[OLS-I923 08-11-22 ORE025]
          if (value && !isNaN(value)) {
            value = parseFloat(value);
          }
          //End[OLS-I923 08-11-22 ORE025]
          break;
        // to set empty value to object or array[OLS-I370 14-03-2022 ORE025]
        case 'OBJECT':
          if (value == '' || value == undefined) {
            value = {};
          }
          break;
        case 'ARRAY':
          if (value == '' || value == undefined) {
            value = [];
          }
        //End[14-03-2022 ORE025]
        default:
          break;
      }
      //End[02-03-2022 ORE025]
      //  if(!isNaN(value)){
      //       value=parseFloat(value)
      //     }
      //     else if(value&&value=='true'){
      //       value=true
      //     }
      //     else if(value&&value=='false'){
      //       value=false
      //     }
      //To update value to submodel fields[OLS-I371 14-03-2022 By ORE025]
      var fields = fieldname.split(".");
      //Value not get binded to controls[OLS-I670 20-07-2022 ORE025]
      var tempFieldname = fieldname;
      var obj = State.state.datamodal.models[modelname]
      //Ajax-Item List-For loop method is not working OLS-I568 ORE034 On 17-05-2022
      //if (Array.isArray(State.state.datamodal.models[modelname]) && State.state.datamodal.models[modelname].length == 1) {
      if (Array.isArray(State.state.datamodal.models[modelname]) && State.state.datamodal.models[modelname].length == 1 && (!fieldname.includes("[") && !fieldname.includes("]"))) {
        //End OLS-I568 ORE034 On 17-05-2022
        obj = State.state.datamodal.models[modelname][0]
      } else if (Array.isArray(State.state.datamodal.models[modelname]) && State.state.datamodal.models[modelname].length > 1) {
        obj = State.state.datamodal.models[modelname]
      }
      else {
        obj = State.state.datamodal.models[modelname]
      }

      //Unable to set values to inner collection model field [OLS-I650 ORE025 On 30-06-2022]
      // for (var i = 0; i < fields.length; i++) {
      //   if ((fields.length - 1) == i) {
      //     stateobj = stateobj[fields[i]] = value
      //   } else {
      //     if (!stateobj[fields[i]] && (fields[i].includes("[") && fields[i].includes("]"))) {
      //       fields[i] = fields[i].replace("[", "")
      //       fields[i] = fields[i].replace("]", "")
      //       stateobj = stateobj[fields[i]]
      //     } else if (!stateobj[fields[i]]) {
      //       stateobj = stateobj[fields[i]] = {}
      //     }
      //     else {
      //       stateobj = stateobj[fields[i]]
      //       console.log("else " + stateobj)
      //     }
      //   }
      // }
      var isArray = false
      if (Array.isArray(obj)) {
        if (obj.length > 1 || fields.length > 1) {
          temp = obj
          for (var i = 0; i < fields.length; i++) {
            if ((fields.length - 1) == i) {
              temp = temp[fields[i]] = value
            } else {
              if (!temp[fields[i]] && (fields[i].startsWith("["))) {
                fields[i] = fields[i].replace("[", "")
                fields[i] = fields[i].replace("]", "")
                temp = temp[fields[i]]
              } else if (!temp[fields[i]] && fields[i].includes("[")) {
                var fieldsplit = fields[i].split('[')
                var fieldsplitname = fieldsplit[0];
                var fieldsplitposition = fieldsplit[1];
                fieldsplitposition = fieldsplitposition.replace("]", "")
                if (temp[fieldsplitname] && temp[fieldsplitname][fieldsplitposition]) {
                  temp = temp[fieldsplitname][fieldsplitposition]
                } else {
                  temp = temp[fieldsplit[0]] = []
                  temp.push({});
                  temp = temp[0];
                }
              } else if (!temp[fields[i]]) {
                temp = temp[fields[i]] = {}
              }
              else {
                temp = temp[fields[i]]
              }
            }
          }
        } else {
          obj = obj[0]
          if (Object(obj) !== obj) return obj;
          if (!Array.isArray(tempFieldname)) tempFieldname = tempFieldname.toString().match(/[^.[\]]+/g) || [];
          tempFieldname.slice(0, -1).reduce((a, c, i) =>
            Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(tempFieldname[i + 1]) >> 0 === +tempFieldname[i + 1] ? [] : {}, obj)[fieldname[fieldname.length - 1]] = value;
        }
        isArray = true
      } else {
        if (Object(obj) !== obj) return obj;
        if (!Array.isArray(tempFieldname)) tempFieldname = tempFieldname.toString().match(/[^.[\]]+/g) || [];
        tempFieldname.slice(0, -1).reduce((a, c, i) =>
          Object(a[c]) === a[c] ? a[c] : a[c] = Math.abs(tempFieldname[i + 1]) >> 0 === +tempFieldname[i + 1] ? [] : {}, obj)[tempFieldname[tempFieldname.length - 1]] = value;
      }
      //End[OLS-I670 20-07-2022 ORE025]
      if (isArray) {
        if (obj.length > 1 || fields.length > 1) {
          obj = obj
        } else {
          obj = [obj]
        }
      } else {
        obj = { ...obj }
      }
      //[OLS-I650 ORE025 On 30-06-2022]
      State.setState({
        datamodal: State.state.datamodal
      });
      OreApibinding.SetValueField(State, modelcode, fieldname);
      //To set value in mobile storage[OLS-I438 25-03-2022 By ORE025]
      var data = State.state.datamodal.models[modelname];
      OreApibinding.HandleMobileStorage(modelcode, data);
      //End[25-03-2022 by ORE025]
      //End[14-03-2022 ORE025]
      return { status: true, message: '', data: '' };
    } catch (error) {
      return { status: false, message: '', data: error.toString() };
    }
  },
  // ORE030 - Sync Method - End

  async ModelSetField(State, modelcode, fieldname, value) {
    try {
      let modelname = OreApibinding.GetModelName(modelcode);
      // if(!isNaN(value)){
      //   value=parseFloat(value)
      // }
      // else if(value&&value=='true'){
      //   value=true
      // }
      // else if(value&&value=='false'){
      //   value=false

      //To change value based on datamodel filed type[02-03-2022 ORE025]
      let fieldtype = OreApibinding.GetModelFieldDataType(modelcode, fieldname);
      switch (fieldtype.data.toUpperCase()) {
        case 'BOOL':
          if (value && value == 'true') {
            value = true;
          }
          else {
            value = false;
          }
          break;
        case 'NUMBER': case 'INTEGER':
          //Nan passed if value is empty [OLS-I469 31-03-2022 ORE025]
          if (value && !isNaN(value)) {
            value = parseFloat(value);
          }
          break;
        //End[OLS-I469 31-03-2022 ORE025]
        // to set empty value to object or array[OLS-I370 14-03-2022 ORE025]
        case 'OBJECT':
          if (value == '' || value == undefined) {
            value = {};
          }
          break;
        case 'ARRAY':
          if (value == '' || value == undefined) {
            value = [];
          }
          break;
        //End[14-03-2022 ORE025]
        default:
          break;
      }
      //End[02-03-2022 ORE025]
      //  if(!isNaN(value)){
      //       value=parseFloat(value)
      //     }
      //     else if(value&&value=='true'){
      //       value=true
      //     }
      //     else if(value&&value=='false'){
      //       value=false
      //     }
      //To update value to submodel fields[OLS-I371 14-03-2022 By ORE025]
      var fields = fieldname.split(".");
      var stateobj = State.state.datamodal.models[modelname]

      if (Array.isArray(State.state.datamodal.models[modelname])) {
        stateobj = State.state.datamodal.models[modelname][0]
      }
      else {
        stateobj = State.state.datamodal.models[modelname]
      }

      for (var i = 0; i < fields.length; i++) {
        if ((fields.length - 1) == i) {
          stateobj = stateobj[fields[i]] = value
        } else {
          if (!stateobj[fields[i]]) {
            stateobj = stateobj[fields[i]] = {}
          }
          else {
            stateobj = stateobj[fields[i]]
          }
        }
      }
      OreApibinding.SetValueField(State, modelcode, fieldname);
      //To set value in mobile storage[OLS-I438 25-03-2022 By ORE025]
      var data = State.state.datamodal.models[modelname];
      OreApibinding.HandleMobileStorage(modelcode, data);
      //End[25-03-2022 by ORE025]
      //End[14-03-2022 ORE025]
      return { status: true, message: '', data: '' };
    } catch (error) {
      return { status: false, message: '', data: error.toString() };
    }
  },

  GetModelInfo(modelcode) {
    let modelinfo = modeldata.filter(function (item) { return modelcode == item.modelcode });
    if (modelinfo.length > 0) return modelinfo[0];
    else return modelinfo;
  },
  GetModelSchema(modelcode) {
    let modelinfo = OreApibinding.GetModelInfo(modelcode);
    return modelinfo.modelschema;
  },
  GetModelName(modelcode) {
    let modelinfo = OreApibinding.GetModelInfo(modelcode);
    return modelinfo.modelname;
  },
  GetModelState(modelcode) {
    let modelinfo = OreApibinding.GetModelInfo(modelcode);
    return modelinfo.modelstate;
  },
  GetModelType(modelcode) {
    let modelinfo = OreApibinding.GetModelInfo(modelcode);
    var modeltype = modelinfo.modelnature;
    //if (modeltype === '690') modeltype = 'array'; else modeltype = 'object';
    if (modeltype === '690') modeltype = 'array'; else if (modeltype === '760') modeltype = 'file'; else modeltype = 'object';
    return modeltype;
  },
  GetModelProperty(modelcode) {
    let modelinfo = OreApibinding.GetModelInfo(modelcode);
    let property = modelinfo.modelprop;
    return property;
  },
  GetModelData(State, modelcode) {
    OreApibinding.GetValue(State);
    let modelname = OreApibinding.GetModelName(modelcode);
    let data = State.state.datamodal.models[modelname];
    return data;
  },
  //Unable to get datatype of inner model values[OLS-I644 25-06-2022 ORE025]
  // GetModelFieldDataType(modelcode, fieldname) {
  //   let modelinfo = OreApibinding.GetModelInfo(modelcode);
  //   let modeldata = modelinfo.modeldata.filter(function (item) { return item.name == fieldname });
  //   if (modeldata.length > 0) {
  //     return { status: true, message: "Success", data: modeldata[0].datatype };
  //   }
  //   else {
  //     let modelname = OreApibinding.GetModelName(modelcode);
  //     return { status: false, message: `fieldname: ${fieldname} not exist in ${modelname}`, data: "" };
  //   }

  // },
  GetModelFieldDataType(modelcode, fieldname) {
    var fields = fieldname.split(".")
    if (fields.length > 1) {
      var cmodelcode = modelcode;
      for (i = 0; i < fields.length; i++) {
        var cmodelinfo = OreApibinding.GetModelInfo(cmodelcode);
        //Unable to get datatype of collection model field[22-12-22 ORE025 OLS-I1009]
        // var cmodeldata = cmodelinfo.modeldata.filter(function (item) { return item.name == fields[i] });
        if (fields[i].includes('[0]'))
          var tempField = fields[i].replace('[0]', "");
        else
          var tempField = fields[i];
        var cmodeldata = cmodelinfo.modeldata.filter(function (item) { return item.name == tempField });
        //End[22-12-22 ORE025 OLS-I1009]
        if (cmodeldata.length > 0) {
          if (cmodeldata[0].name == fields[fields.length - 1])
            return { status: true, message: "Success", data: cmodeldata[0].datatype };
          else
            var cmodelcode = cmodeldata[0].datamodel;
        }
      }
    }
    else {

      var modelinfo = OreApibinding.GetModelInfo(modelcode);
      var modeldata = modelinfo.modeldata.filter(function (item) { return item.name == fieldname });
      if (modeldata.length > 0) {
        return { status: true, message: "Success", data: modeldata[0].datatype };
      }
      else {
        var modelname = OreApibinding.GetModelName(modelcode);
        return { status: false, message: `fieldname: ${fieldname} not exist in ${modelname}`, data: "" };
      }
    }

  },
  //End[OLS-I644 25-06-2022 ORE025]
  GetModelNameByControlName(State, controlname) {
    var controldata = State.state.orepageproperty[controlname];
    if (controldata.Property.datamodelbinding) {
      var modelcode = controldata.Property.datamodelbinding.split('#')[0];
      var modelname = OreApibinding.GetModelName(modelcode);
      return modelname;
    }
    else {
      return '';
    }
  },
  async GetDataModalFieldData(State, modelcode, fieldname) {
    var data = '';
    var ldata = '';
    try {
      OreApibinding.GetValue(State);
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var lscache = false;
      var lssession = true;
      if (modelprop) {
        lscache = modelprop[0].localstorage;
        lssession = modelprop[0].sessionstorage;
        lsredux = modelprop[0].reduxstorage;
      }
      let modelname = OreApibinding.GetModelName(modelcode)
      if (lscache === true) {
        ldata = await OreApibinding.GetCacheData(modelname);
      }
      else if (lssession === true) {
        ldata = await Orefuncs.GetLocalStorageDirect(modelname);
      }
      else if (lsredux === true) {
        ldata = await Orefuncs.getRedux(modelname, true);
      }
      if (ldata) {
        ldataone = ldata;
        ldata = ldata[fieldname];
        if (ldata == undefined) {
          ldata = ldataone[0][fieldname];
        }
      }
      else {
        if (fieldname == "[Count]") { ldata = State.state.datamodal.models[modelname].length }
        else {
          //Unable to get collection model field value using %[OLS-I666 06-07-2022 ORE025]
          //ldata = State.state.datamodal.models[modelname][fieldname];
          ldata = State.state.datamodal.models[modelname];
          if (Array.isArray(ldata)) {
            ldata = ldata[0][fieldname]
          }
          else {
            ldata = ldata[fieldname]
          }
          //End[OLS-I666 06-07-2022 ORE025]
        }
      }
      //Unable to get value from model if field value is 0 and type is number[OLS-I555 09-05-2022 ORE025]
      if (ldata || typeof (ldata) === 'boolean' || typeof (ldata) === 'number') {
        data = { status: true, message: 'Success', data: ldata };
      }
      //End[OLS-I555 09-05-2022 ORE025]
      else {
        data = { status: false, message: 'GetDataModalFieldData not found', data: '' };
      }
      return data;
    } catch (error) {
      data = { status: false, message: 'GetDataModalFieldData error', data: error.toString() };
      return data;
    }
  },
  async GetModelDataLocal(State, modelcode) {
    return await OreApibinding.GetDataModalData(State, modelcode, false)
  },
  async GetDataModalData(State, modelcode, ismodeldata = false) {
    var data = null;
    const formData = new FormData();
    try {
      OreApibinding.GetValue(State);
      var ldata = null;
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var modelname = OreApibinding.GetModelName(modelcode)
      //var lscache = false;
      //var lssession = true;
      /* File Upload Kathair - Start */
      var lsformdata = OreApibinding.GetModelType(modelcode);//send by IDE(760--file)
      var lscache = false;
      var lssession = true;
      if (lsformdata == "file") {

        let modelKeys = Object.keys(State.state.datamodal.models[modelname][0]);
        State.state.datamodal.models[modelname].forEach(function (model) {
          modelKeys.forEach(function (key) {
            formData.append(key, model[key]);
          })
        })

        ldata = formData;
      }
      /* File Upload Kathair End */
      if (ismodeldata && State.state.datamodal.models) {
        ldata = State.state.datamodal.models[modelname];
      }
      else {
        if (modelprop) {
          lscache = modelprop[0].localstorage;
          lssession = modelprop[0].sessionstorage;
          lsredux = modelprop[0].reduxstorage;
        }
        if (lscache === true) {
          ldata = await OreApibinding.GetCacheData(modelname);
        }
        else if (lssession === true) {
          ldata = await Orefuncs.GetLocalStorageDirect(modelname);
        }
        else if (lsredux === true) {
          ldata = await Orefuncs.getRedux(modelname, true);
        }
        if (!ldata) {
          ldata = State.state.datamodal.models[modelname];
        }
      }
      data = { status: true, data: ldata }
    } catch (error) {
      alert('GetDataModalData: ' + error.toString());
      data = { status: false, data: error.toString() }
    }
    return data;
  },
  //Modelset method changes [09-05-2022 ORE025]
  GetDataModalDataDir(State, modelcode, ismodeldata = false) {
    var data = null;
    try {
      OreApibinding.GetValue(State);
      var ldata = null;
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var modelname = OreApibinding.GetModelName(modelcode)
      var lscache = false;
      var lssession = true;
      if (ismodeldata && State.state.datamodal.models) {
        ldata = State.state.datamodal.models[modelname];
      }
      else {
        if (modelprop) {
          lscache = modelprop[0].localstorage;
          lssession = modelprop[0].sessionstorage;
          lsredux = modelprop[0].reduxstorage;
        }
        if (lscache === true) {
          ldata = OreApibinding.GetCacheData(modelname);
        }
        else if (lssession === true) {
          ldata = Orefuncs.GetLocalStorageDirect(modelname);
        }
        else if (lsredux === true) {
          ldata = Orefuncs.getRedux(modelname, true);
        }
        if (!ldata) {
          ldata = State.state.datamodal.models[modelname];
        }
      }
      data = { status: true, data: ldata }
    } catch (error) {
      alert('GetDataModalData: ' + error.toString());
      data = { status: false, data: error.toString() }
    }
    return data;
  },
  //End[09-05-2022 ORE025]
  async GetFieldNameByDataModalData(State, modelcode, ismodeldata = false, lsfieldname) {
    var data = null;
    try {
      OreApibinding.GetValue(State);
      var ldata = null;
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var modelname = OreApibinding.GetModelName(modelcode)
      var lscache = false;
      var lssession = true;
      if (ismodeldata && State.state.datamodal.models) {
        ldata = State.state.datamodal.models[modelname];
      }
      else {
        if (modelprop) {
          lscache = modelprop[0].localstorage;
          lssession = modelprop[0].sessionstorage;
          lsredux = modelprop[0].reduxstorage;
        }
        if (lscache === true) {
          ldata = await OreApibinding.GetCacheData(modelname);
        }
        else if (lssession === true) {
          ldata = await Orefuncs.GetLocalStorageDirect(modelname);
        }
        else if (lsredux === true) {
          ldata = await Orefuncs.getRedux(modelname, true);
        }
        if (!ldata) {
          if (State.state.datamodal.models) {
            ldata = State.state.datamodal.models[modelname];
          }
        }
      }

      if (modelprop[0].localstorage === false && modelprop[0].sessionstorage === false && modelprop[0].reduxstorage === false) {
        var modelname = OreApibinding.GetModelName(modelcode);
        var data = sqlmodeldata.filter(function (item) {
          return item.modelname == modelname;
        });
        if (data != undefined && data != null && data != "") {
          ldata = await Sqliteengine.FilterQueryIf('', modelname, data[0].connname, lsfieldname);
          ldata = ldata.data[0];
        }
      }

      data = { status: true, data: ldata }
    } catch (error) {
      alert('GetDataModalData: ' + error.toString());
      data = { status: false, data: error.toString() }
    }
    return data;
  },
  async GetDataModalDatabyFieldName(State, modelcode, fieldname, lsmodelname, ismodeldata = false) {
    try {
      OreApibinding.GetValue(State);
      var ldata = null;
      var data = null;
      var modelprop = OreApibinding.GetModelProperty(modelcode);
      var modelname = lsmodelname
      var lscache = false;
      var lssession = true;
      if (ismodeldata) {
        ldata = State.state.datamodal.models[modelname];
      }
      else {
        if (modelprop) {
          lscache = modelprop[0].localstorage;
          lssession = modelprop[0].sessionstorage;
          lsredux = modelprop[0].reduxstorage;
        }

        if (lscache === true) {
          ldata = await OreApibinding.GetCacheData(modelname);
        }
        else if (lssession === true) {
          ldata = await Orefuncs.GetLocalStorageDirect(modelname);
        }
        else if (lsredux === true) {
          ldata = await Orefuncs.getRedux(modelname, true);
        }
        if (!ldata) {
          ldata = State.state.datamodal.models[modelname][fieldname];
        }
        else {
          ldata = ldata[fieldname];
        }
      }
      data = { status: true, data: ldata }
    } catch (error) {
      alert('GetDataModalData: ' + error.toString());
      data = { status: false, data: error.toString() }
    }
    return data;
  },
  //Need option to use the variables in the API parameters [OLS-I867 ORE030 18-10-2022]
  async GetVariableValuesFromState(globalVariable, state) {
    try {
      // Get Control Value from State
      var _regexcontrol = /\$(.*?)\$/gi;
      var _resultMatchGroupcontrol = globalVariable.match(_regexcontrol);
      if (_resultMatchGroupcontrol != null) {
        var _desiredRescontrol = _resultMatchGroupcontrol.map(match => match.replace(_regexcontrol, "$1"))
        for (var i = 0; i <= _desiredRescontrol.length - 1; i++) {
          var _hs = _desiredRescontrol[i];
          var _lsval = Orefuncs.GetValue(_hs, state.state)
          _hs = "$" + _hs + "$";
          globalVariable = globalVariable.replace(_hs, _lsval);
        }
      }

      // Get Variable Value from State
      var _regexvar = /\#(.*?)\#/gi;
      var _resultMatchGroupvar = globalVariable.match(_regexvar);
      if (_resultMatchGroupvar != null) {
        var _desiredResvar = _resultMatchGroupvar.map(match => match.replace(_regexvar, "$1"))
        for (var i = 0; i <= _desiredResvar.length - 1; i++) {
          var _hs = _desiredResvar[i]
          var _lsval = state.state[_hs];
          if (_lsval == undefined) {
            var _lsobjcode = _hs.split(".");
            if (_lsobjcode.length > 1) {
              _lsval = state.state[_lsobjcode[0]]
              _lsval = _lsval[_lsobjcode[1]]
            }
          }
          _hs = "#" + _hs + "#";
          globalVariable = globalVariable.replace(_hs, _lsval)
        }
      }

      // Get Model Value from State
      if (globalVariable.indexOf(".") != -1) {
        try {

          var _regexvar = /\%(.*?)\%/gi;
          var _resultMatchGroupvar = globalVariable.match(_regexvar);
          if (_resultMatchGroupvar != null) {
            var _desiredResvar = _resultMatchGroupvar.map(match => match.replace(_regexvar, "$1"))
            for (var i = 0; i <= _desiredResvar.length - 1; i++) {
              var _hs = _desiredResvar[i];
              var _lsval = "";
              var _lsobjcode = _hs.split(".");
              var _lsfieldname = _lsobjcode[1];
              _lsobjcode = _lsobjcode[0];
              var res = await OreApibind.GetDataModalFieldData(state.state, _lsobjcode, _lsfieldname);
              if (res.status) {
                _lsval = res.data;
              }
              else {
                _lsval = "";
              }
              _hs = "%" + _hs + "%";
              globalVariable = globalVariable.replace(_hs, _lsval)
            }
          }
        }
        catch {
          return "";
        }
      }
      return globalVariable;
    }
    catch
    {
      return "";
    }
  },
  //End [OLS-I867 ORE030 18-10-2022]
  async GetParamData(requestjson, State) {
    try {
      var reqarra = [];
      var reqObj = {};
      var getpara = {};
      if (requestjson.length > 0) {
        for (let index = 0; index < requestjson.length; index++) {
          const element = requestjson[index];
          var name = element.name;
          var datatype = element.datatype;
          if (element.source.toUpperCase() === 'DATA MODEL') {
            var datamodal = OreApibinding.GetModelName(element.datamodal);
            if (datatype.toUpperCase() == 'STRING') {
              var value = State.state.datamodal.models[datamodal][element.fieldname];
              value = await OreApibinding.GetDataModalFieldData(State, element.datamodal, element.fieldname);
              value = value.data;
            }
            else if (datatype.toUpperCase() == 'NUMBER') {
              var value = Number(State.state.datamodal.models[datamodal][element.fieldname]);
              value = await OreApibinding.GetDataModalFieldData(State, element.datamodal, element.fieldname);
              value = value.data;
              if (value.toString() == 'NaN') {
                value = State.state.datamodal.models[datamodal][element.fieldname];
              }
            }
            else if (datatype.toUpperCase() == 'BOOL' || datatype.toUpperCase() == 'BOOLEAN') {
              var value = false;
              var lsvalue = State.state.datamodal.models[datamodal][element.fieldname];
              lsvalue = await OreApibinding.GetDataModalFieldData(State, element.datamodal, element.fieldname);
              lsvalue = lsvalue.data;
              if (typeof (lsvalue) === 'boolean') {
                value = lsvalue;
              }
              else {
                if (lsvalue === null || lsvalue === undefined || lsvalue === '') {
                  value = null;
                }
                else if (lsvalue.toUpperCase() == 'TRUE') {
                  value = true;
                }
                else if (lsvalue.toUpperCase() == 'FALSE') {
                  value = false;
                }
              }
            }
            else if (datatype.toUpperCase() == 'OBJECT') {
              var value = {};
            }
            else if (datatype.toUpperCase() == 'ARRAY') {
              var value = [];
            }
            else {
              var value = null;
            }
          }
          //Global Variable Handling [ORE030 18-10-2022]
          else if (element.source.toUpperCase() === 'PAGE VARIABLES') {
            let GVar = State.state.GlobalVariables;

            if (GVar[element.value] != undefined && GVar[element.value] != "") {
              var Gvalue = GVar[element.value];
              Gvalue = await OreApibinding.GetVariableValuesFromState(Gvalue, State);
            }
            if (datatype.toUpperCase() == 'STRING') {
              var value = Gvalue;
            }
            else if (datatype.toUpperCase() == 'NUMBER') {
              var value = Number(Gvalue);
            }
            else if (datatype.toUpperCase() == 'BOOL' || datatype.toUpperCase() == 'BOOLEAN') {
              var value = false;
              var lsvalue = Gvalue;
              if (typeof (lsvalue) === 'boolean') {
                value = lsvalue;
              }
              else {
                if (lsvalue === null || lsvalue === undefined || lsvalue === '') {
                  value = null;
                }
                else if (lsvalue.toUpperCase() == 'TRUE') {
                  value = true;
                }
                else if (lsvalue.toUpperCase() == 'FALSE') {
                  value = false;
                }
              }
            }
            else if (datatype.toUpperCase() == 'OBJECT') {
              var value = {};
            }
            else if (datatype.toUpperCase() == 'ARRAY') {
              var value = [];
            }
            else {
              var value = null;
            }
          }
          //End ORE030 18-10-2022
          else if (element.source.toUpperCase() === 'STATIC VALUE' || element.source.toUpperCase() === '') {
            if (datatype.toUpperCase() == 'STRING') {
              var value = element.value;
            }
            else if (datatype.toUpperCase() == 'NUMBER') {
              var value = Number(element.value);
            }
            else if (datatype.toUpperCase() == 'BOOL' || datatype.toUpperCase() == 'BOOLEAN') {
              var value = false;
              var lsvalue = element.value;
              if (typeof (lsvalue) === 'boolean') {
                value = lsvalue;
              }
              else {
                if (lsvalue === null || lsvalue === undefined || lsvalue === '') {
                  value = null;
                }
                else if (lsvalue.toUpperCase() == 'TRUE') {
                  value = true;
                }
                else if (lsvalue.toUpperCase() == 'FALSE') {
                  value = false;
                }
              }
            }
            else if (datatype.toUpperCase() == 'OBJECT') {
              var value = {};
            }
            else if (datatype.toUpperCase() == 'ARRAY') {
              var value = [];
            }
            else {
              var value = null;
            }
          }
          else if (element.source.toUpperCase() === 'APP CONFIG') {
            const lsconfig = appconfig[0].Configurations;
            value = lsconfig.filter(function (lsitem) { return lsitem[element.appkey] })[0][element.appkey];
          }
          else if (element.source.toUpperCase() == 'PAGE VALUE') {
            value = State[element.control].props.value;
          }
          if (element.param)
            reqObj[name] = value;
          else {
            reqarra.push(value);
          }
        }
        var lspara = "";
        if (reqarra.length > 0) {
          reqarra.forEach(lsstr => {
            if (lspara == "") {
              lspara = '/' + lsstr;
            }
            else {
              lspara = lspara + '/' + lsstr;
            }
          });
        }
        getpara['paramobj'] = reqObj;
        getpara['strpara'] = lspara;
        return getpara;
      }
      else {
        getpara['paramobj'] = {};
        getpara['strpara'] = "";
        return getpara;
      }
    } catch (error) {
      OreAlert.alert('GetParamData Error', error.toString());
      return {};
    }
  },
  GetStatusDetail(code) {
    let retdata = httpstatus.filter(function (item) { return item.status == code });
    if (retdata.length > 0) {
      return retdata[0];
    } else {
      return { 'status': code, 'statusText': '', 'statusCategory': '', 'statusDescription': '' }
    }
  },
  GetNetWorkStatus() {
    if (Orefuncs.isNetworkAvailable()) {
      return true;
    } else {
      //OLS-I1298 Issue Tracker - Internet is required message is not readable by Ore049 [11/05/2023]
      //OreAlert.alert("Internet required", "Please enable wifi or mobile data", "OK", false);
      return false;
    }
  },
  async PushNotification(type) {
    //Deprecated - Sathish	
    if (type.toUpperCase() == 'ALL') {
      const pushnofitication = new PushNotification();
      await pushnofitication.fcm();
    }
  },
  async AddFCMToken() {
    await new PushNotification().fcm();
    //OLS-I977 - Preview-Unable to get token value in first time while use getlocal storage method  for push notification by ore047
  },

  //This is temporary method.this method is available in global method.After Dicker Release this method will be removed.
  //Need a provision in smartcode to get selected item list keys value [OLS-I847 07-10-2022 ORE034]
  getFlatlistSelectedKeys(controlName, stateValue) {
    try {
      var lsselectedkeys = Orefuncs.GetProperty(controlName, stateValue, "selectedKeys");
      var lsselectedkeystemp = (lsselectedkeys.slice(1, -1));   //used for removing square - [] bracket   
      var lsresult = lsselectedkeystemp.replace(/"/g, "");      //used for removin double quote -"    
      return (lsresult);
    }
    catch (error) {
      OreAlert.alert("Error in Method:getFlatlistSelectedKeys,ControlName: " + controlName + ", Error:" + error);
    }

  },
  //End [OLS-I847 07-10-2022 ORE034]

}

const httpstatus = [{ 'status': 100, 'statusText': 'Continue', 'statusCategory': '1xx informational response', 'statusDescription': "The server has received the request headers and the client should proceed to send the request body (in the case of a request for which a body needs to be sent; for example, a POST request). Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient. To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request and receive a 100 Continue status code in response before sending the body. If the client receives an error code such as 403 (Forbidden) or 405 (Method Not Allowed) then it should not send the request's body. The response 417 Expectation Failed indicates that the request should be repeated without the Expect header as it indicates that the server does not support expectations (this is the case, for example, of HTTP/1.0 servers)." }, { 'status': 101, 'statusText': 'Switching Protocols', 'statusCategory': '1xx informational response', 'statusDescription': 'The requester has asked the server to switch protocols and the server has agreed to do so.' }, { 'status': 102, 'statusText': 'Processing', 'statusCategory': '1xx informational response', 'statusDescription': 'A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost.' }, { 'status': 103, 'statusText': 'Early Hints', 'statusCategory': '1xx informational response', 'statusDescription': 'Used to return some response headers before final HTTP message.' }, { 'status': 200, 'statusText': 'OK', 'statusCategory': '2xx success', 'statusDescription': 'Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.' }, { 'status': 201, 'statusText': 'Created', 'statusCategory': '2xx success', 'statusDescription': 'The request has been fulfilled, resulting in the creation of a new resource.' }, { 'status': 202, 'statusText': 'Accepted', 'statusCategory': '2xx success', 'statusDescription': 'The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.' }, { 'status': 203, 'statusText': 'Non-Authoritative Information', 'statusCategory': '2xx success', 'statusDescription': "The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response." }, { 'status': 204, 'statusText': 'No Content', 'statusCategory': '2xx success', 'statusDescription': 'The server successfully processed the request, and is not returning any content.' }, { 'status': 205, 'statusText': 'Reset Content', 'statusCategory': '2xx success', 'statusDescription': 'The server successfully processed the request, asks that the requester reset its document view, and is not returning any content.' }, { 'status': 206, 'statusText': 'Partial Content', 'statusCategory': '2xx success', 'statusDescription': 'The server is delivering only part of the resource (byte serving) due to a range header sent by the client. The range header is used by HTTP clients to enable resuming of interrupted downloads, or split a download into multiple simultaneous streams.' }, { 'status': 207, 'statusText': 'Multi-Status', 'statusCategory': '2xx success', 'statusDescription': 'The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.' }, { 'status': 208, 'statusText': 'Already Reported', 'statusCategory': '2xx success', 'statusDescription': 'The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.' }, { 'status': 226, 'statusText': 'IM Used', 'statusCategory': '2xx success', 'statusDescription': 'The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.' }, { 'status': 300, 'statusText': 'Multiple Choices', 'statusCategory': '3xx redirection', 'statusDescription': 'Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation). For example, this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest word-sense disambiguation.' }, { 'status': 301, 'statusText': 'Moved Permanently', 'statusCategory': '3xx redirection', 'statusDescription': 'This and all future requests should be directed to the given URI.' }, { 'status': 302, 'statusText': "Found (Previously 'Moved temporarily')", 'statusCategory': '3xx redirection', 'statusDescription': "Tells the client to look at (browse to) another URL. 302 has been superseded by 303 and 307. This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was 'Moved Temporarily'),but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.However, some Web applications and frameworks use the 302 status code as if it were the 303." }, { 'status': 303, 'statusText': 'See Other', 'statusCategory': '3xx redirection', 'statusDescription': 'The response to the request can be found under another URI using the GET method. When received in response to a POST (or PUT/DELETE), the client should presume that the server has received the data and should issue a new GET request to the given URI.' }, { 'status': 304, 'statusText': 'Not Modified', 'statusCategory': '3xx redirection', 'statusDescription': 'Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.' }, { 'status': 305, 'statusText': 'Use Proxy', 'statusCategory': '3xx redirection', 'statusDescription': 'The requested resource is available only through a proxy, the address for which is provided in the response. For security reasons, many HTTP clients (such as Mozilla Firefox and Internet Explorer) do not obey this status code.' }, { 'status': 306, 'statusText': 'Switch Proxy', 'statusCategory': '3xx redirection', 'statusDescription': "No longer used. Originally meant 'Subsequent requests should use the specified proxy.'" }, { 'status': 307, 'statusText': 'Temporary Redirect', 'statusCategory': '3xx redirection', 'statusDescription': 'In this case, the request should be repeated with another URI; however, future requests should still use the original URI. In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request. For example, a POST request should be repeated using another POST request.' }, { 'status': 308, 'statusText': 'Permanent Redirect', 'statusCategory': '3xx redirection', 'statusDescription': 'The request and all future requests should be repeated using another URI. 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change. So, for example, submitting a form to a permanently redirected resource may continue smoothly.' }, { 'status': 400, 'statusText': 'Bad Request', 'statusCategory': '4xx client errors', 'statusDescription': 'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).' }, { 'status': 401, 'statusText': 'Unauthorized', 'statusCategory': '4xx client errors', 'statusDescription': "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.401 semantically means 'unauthorised',the user does not have valid authentication credentials for the target resource.Note: Some sites incorrectly issue HTTP 401 when an IP address is banned from the website (usually the website domain) and that specific address is refused permission to access a website." }, { 'status': 402, 'statusText': 'Payment Required', 'statusCategory': '4xx client errors', 'statusDescription': 'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed, for example, by GNU Taler,but that has not yet happened, and this code is not widely used. Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.Sipgate uses this code if an account does not have sufficient funds to start a call.Shopify uses this code when the store has not paid their fees and is temporarily disabled.Stripe uses this code for failed payments where parameters were correct, for example blocked fraudulent payments.' }, { 'status': 403, 'statusText': 'Forbidden', 'statusCategory': '4xx client errors', 'statusDescription': 'The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication by answering the WWW-Authenticate header field challenge, but the server did not accept that authentication. The request should not be repeated.' }, { 'status': 404, 'statusText': 'Not Found', 'statusCategory': '4xx client errors', 'statusDescription': 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.' }, { 'status': 405, 'statusText': 'Method Not Allowed', 'statusCategory': '4xx client errors', 'statusDescription': 'A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.' }, { 'status': 406, 'statusText': 'Not Acceptable', 'statusCategory': '4xx client errors', 'statusDescription': 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.See Content negotiation.' }, { 'status': 407, 'statusText': 'Proxy Authentication Required', 'statusCategory': '4xx client errors', 'statusDescription': 'The client must first authenticate itself with the proxy.' }, { 'status': 408, 'statusText': 'Request Timeout', 'statusCategory': '4xx client errors', 'statusDescription': 'The server timed out waiting for the request. According to HTTP specifications: The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.' }, { 'status': 409, 'statusText': 'Conflict', 'statusCategory': '4xx client errors', 'statusDescription': 'Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.' }, { 'status': 410, 'statusText': 'Gone', 'statusCategory': '4xx client errors', 'statusDescription': "Indicates that the resource requested is no longer available and will not be available again. This should be used when a resource has been intentionally removed and the resource should be purged. Upon receiving a 410 status code, the client should not request the resource in the future. Clients such as search engines should remove the resource from their indices.Most use cases do not require clients and search engines to purge the resource, and a '404 Not Found' may be used instead." }, { 'status': 411, 'statusText': 'Length Required', 'statusCategory': '4xx client errors', 'statusDescription': 'The request did not specify the length of its content, which is required by the requested resource.' }, { 'status': 412, 'statusText': 'Precondition Failed', 'statusCategory': '4xx client errors', 'statusDescription': 'The server does not meet one of the preconditions that the requester put on the request header fields.' }, { 'status': 413, 'statusText': 'Payload Too Large', 'statusCategory': '4xx client errors', 'statusDescription': "The request is larger than the server is willing or able to process. Previously called 'Request Entity Too Large'." }, { 'status': 414, 'statusText': 'URI Too Long', 'statusCategory': '4xx client errors', 'statusDescription': "The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.Called 'Request-URI Too Long' previously." }, { 'status': 415, 'statusText': 'Unsupported Media Type', 'statusCategory': '4xx client errors', 'statusDescription': 'The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.' }, { 'status': 416, 'statusText': 'Range Not Satisfiable', 'statusCategory': '4xx client errors', 'statusDescription': "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.Called 'Requested Range Not Satisfiable' previously." }, { 'status': 417, 'statusText': 'Expectation Failed', 'statusCategory': '4xx client errors', 'statusDescription': 'The server cannot meet the requirements of the Expect request-header field.' }, { 'status': 418, 'statusText': "I'm a teapot", 'statusCategory': '4xx client errors', 'statusDescription': "This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by teapots requested to brew coffee.This HTTP status is used as an Easter egg in some websites, such as Google.com's I'm a teapot easter egg." }, { 'status': 421, 'statusText': 'Misdirected Request', 'statusCategory': '4xx client errors', 'statusDescription': 'The request was directed at a server that is not able to produce a response (for example because of connection reuse).' }, { 'status': 422, 'statusText': 'Unprocessable Entity', 'statusCategory': '4xx client errors', 'statusDescription': 'The request was well-formed but was unable to be followed due to semantic errors.' }, { 'status': 423, 'statusText': 'Locked', 'statusCategory': '4xx client errors', 'statusDescription': 'The resource that is being accessed is locked.' }, { 'status': 424, 'statusText': 'Failed Dependency', 'statusCategory': '4xx client errors', 'statusDescription': 'The request failed because it depended on another request and that request failed (e.g., a PROPPATCH).' }, { 'status': 425, 'statusText': 'Too Early', 'statusCategory': '4xx client errors', 'statusDescription': 'Indicates that the server is unwilling to risk processing a request that might be replayed.' }, { 'status': 426, 'statusText': 'Upgrade Required', 'statusCategory': '4xx client errors', 'statusDescription': 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.' }, { 'status': 428, 'statusText': 'Precondition Required', 'statusCategory': '4xx client errors', 'statusDescription': "The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict." }, { 'status': 429, 'statusText': 'Too Many Requests', 'statusCategory': '4xx client errors', 'statusDescription': 'The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.' }, { 'status': 431, 'statusText': 'Request Header Fields Too Large', 'statusCategory': '4xx client errors', 'statusDescription': 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.' }, { 'status': 451, 'statusText': 'Unavailable For Legal Reasons', 'statusCategory': '4xx client errors', 'statusDescription': 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.The code 451 was chosen as a reference to the novel Fahrenheit 451 (see the Acknowledgements in the RFC).' }, { 'status': 500, 'statusText': 'Internal Server Error', 'statusCategory': '5xx server errors', 'statusDescription': 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.' }, { 'status': 501, 'statusText': 'Not Implemented', 'statusCategory': '5xx server errors', 'statusDescription': 'The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API).' }, { 'status': 502, 'statusText': 'Bad Gateway', 'statusCategory': '5xx server errors', 'statusDescription': 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.' }, { 'status': 503, 'statusText': 'Service Unavailable', 'statusCategory': '5xx server errors', 'statusDescription': 'The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state.' }, { 'status': 504, 'statusText': 'Gateway Timeout', 'statusCategory': '5xx server errors', 'statusDescription': 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.' }, { 'status': 505, 'statusText': 'HTTP Version Not Supported', 'statusCategory': '5xx server errors', 'statusDescription': 'The server does not support the HTTP protocol version used in the request.' }, { 'status': 506, 'statusText': 'Variant Also Negotiates', 'statusCategory': '5xx server errors', 'statusDescription': 'Transparent content negotiation for the request results in a circular reference.' }, { 'status': 507, 'statusText': 'Insufficient Storage', 'statusCategory': '5xx server errors', 'statusDescription': 'The server is unable to store the representation needed to complete the request.' }, { 'status': 508, 'statusText': 'Loop Detected', 'statusCategory': '5xx server errors', 'statusDescription': 'The server detected an infinite loop while processing the request (sent instead of 208 Already Reported).' }, { 'status': 510, 'statusText': 'Not Extended', 'statusCategory': '5xx server errors', 'statusDescription': 'Further extensions to the request are required for the server to fulfil it.' }, { 'status': 511, 'statusText': 'Network Authentication Required', 'statusCategory': '5xx server errors', 'statusDescription': "The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., 'captive portals' used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot)." }, { 'status': 103, 'statusText': 'Checkpoint', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used in the resumable requests proposal to resume aborted PUT or POST requests.' }, { 'status': 218, 'statusText': 'This is fine', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled.When ProxyErrorOverride is enabled in Apache, response bodies that contain a status code of 4xx or 5xx are automatically discarded by Apache in favor of a generic response or a custom response specified by the ErrorDocument directive.' }, { 'status': 419, 'statusText': 'Page Expired', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used by the Laravel Framework when a CSRF Token is missing or expired.' }, { 'status': 420, 'statusText': 'Method Failure', 'statusCategory': 'Unofficial codes', 'statusDescription': 'A deprecated response used by the Spring Framework when a method has failed.' }, { 'status': 420, 'statusText': 'Enhance Your Calm', 'statusCategory': 'Unofficial codes', 'statusDescription': "Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead.The phrase 'Enhance your calm' comes from the 1993 movie Demolition Man, and its association with this number is likely a reference to cannabis." }, { 'status': 430, 'statusText': 'Request Header Fields Too Large', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used by Shopify, instead of the 429 Too Many Requests response code, when too many URLs are requested within a certain time frame.' }, { 'status': 450, 'statusText': 'Blocked by Windows Parental Controls ', 'statusCategory': 'Unofficial codes', 'statusDescription': 'The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.' }, { 'status': 498, 'statusText': 'Invalid Token', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.' }, { 'status': 499, 'statusText': 'Token Required', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.' }, { 'status': 509, 'statusText': 'Bandwidth Limit Exceeded', 'statusCategory': 'Unofficial codes', 'statusDescription': 'The server has exceeded the bandwidth specified by the server administrator; this is often used by shared hosting providers to limit the bandwidth of customers.' }, { 'status': 526, 'statusText': 'Invalid SSL Certificate', 'statusCategory': 'Unofficial codes', 'statusDescription': "Used by Cloudflare and Cloud Foundry's gorouter to indicate failure to validate the SSL/TLS certificate that the origin server presented." }, { 'status': 529, 'statusText': 'Site is overloaded', 'statusCategory': 'Unofficial codes', 'statusDescription': "Used by Qualys in the SSLLabs server testing API to signal that the site can't process the request." }, { 'status': 530, 'statusText': 'Site is frozen', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.' }, { 'status': 598, 'statusText': '(Informal convention) Network read timeout error', 'statusCategory': 'Unofficial codes', 'statusDescription': 'Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.' }, { 'status': 440, 'statusText': 'Login Time-out', 'statusCategory': 'Internet Information Services', 'statusDescription': "The client's session has expired and must log in again." }, { 'status': 449, 'statusText': 'Retry With', 'statusCategory': 'Internet Information Services', 'statusDescription': 'The server cannot honour the request because the user has not provided the required information.' }, { 'status': 451, 'statusText': 'Redirect', 'statusCategory': 'Internet Information Services', 'statusDescription': "Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.The client is expected to re-run the HTTP AutoDiscover operation to find a more appropriate server." }, { 'status': 444, 'statusText': 'No Response', 'statusCategory': 'nginx', 'statusDescription': 'Used internally to instruct the server to return no information to the client and close the connection immediately.' }, { 'status': 494, 'statusText': 'Request header too large', 'statusCategory': 'nginx', 'statusDescription': 'Client sent too large request or too long header line.' }, { 'status': 495, 'statusText': 'SSL Certificate Error', 'statusCategory': 'nginx', 'statusDescription': 'An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.' }, { 'status': 496, 'statusText': 'SSL Certificate Required', 'statusCategory': 'nginx', 'statusDescription': 'An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.' }, { 'status': 497, 'statusText': 'HTTP Request Sent to HTTPS Port', 'statusCategory': 'nginx', 'statusDescription': 'An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.' }, { 'status': 499, 'statusText': 'Client Closed Request', 'statusCategory': 'nginx', 'statusDescription': 'Used when the client has closed the request before the server could send a response.' }, { 'status': 520, 'statusText': 'Web Server Returned an Unknown Error', 'statusCategory': 'Cloudflare', 'statusDescription': 'The origin server returned an empty, unknown, or unexplained response to Cloudflare.' }, { 'status': 521, 'statusText': 'Web Server Is Down', 'statusCategory': 'Cloudflare', 'statusDescription': 'The origin server has refused the connection from Cloudflare.' }, { 'status': 522, 'statusText': 'Connection Timed Out', 'statusCategory': 'Cloudflare', 'statusDescription': 'Cloudflare could not negotiate a TCP handshake with the origin server.' }, { 'status': 523, 'statusText': 'Origin Is Unreachable', 'statusCategory': 'Cloudflare', 'statusDescription': 'Cloudflare could not reach the origin server; for example, if the DNS records for the origin server are incorrect.' }, { 'status': 524, 'statusText': 'A Timeout Occurred', 'statusCategory': 'Cloudflare', 'statusDescription': 'Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.' }, { 'status': 525, 'statusText': 'SSL Handshake Failed', 'statusCategory': 'Cloudflare', 'statusDescription': 'Cloudflare could not negotiate a SSL/TLS handshake with the origin server.' }, { 'status': 526, 'statusText': 'Invalid SSL Certificate', 'statusCategory': 'Cloudflare', 'statusDescription': 'Cloudflare could not validate the SSL certificate on the origin web server.' }, { 'status': 527, 'statusText': 'Railgun Error', 'statusCategory': 'Cloudflare', 'statusDescription': "Error 527 indicates an interrupted connection between Cloudflare and the origin server's Railgun server." }, { 'status': 520, 'statusText': '', 'statusCategory': 'Cloudflare', 'statusDescription': 'Error 530 is returned along with a 1xxx error.' }, { 'status': 460, 'statusText': '', 'statusCategory': 'AWS Elastic Load Balancer', 'statusDescription': "Client closed the connection with the load balancer before the idle timeout period elapsed. Typically when client timeout is sooner than the Elastic Load Balancer's timeout." }, { 'status': 463, 'statusText': '', 'statusCategory': 'AWS Elastic Load Balancer', 'statusDescription': 'The load balancer received an X-Forwarded-For request header with more than 30 IP addresses.' }];

var _ = require('lodash');

var DataTransform = function (data, map) {
  return {
    defaultOrNull: function (key) {
      return key && map.defaults ? map.defaults[key] : undefined;
    },
    getValue: function (obj, key, newKey) {
      if (typeof obj === 'undefined') {
        return;
      }
      if (key == '' || key == undefined) {
        return obj;
      }
      var value = obj || data;
      var keys = null;
      key = key || map.list;
      return key == '' ? '' : _.get(value, key, this.defaultOrNull(newKey));
    },
    setValue: function (obj, key, newValue) {
      if (typeof obj === 'undefined') {
        return;
      }
      if (key == '' || key == undefined) {
        return;
      }
      if (key == '') {
        return;
      }
      var keys = key.split('.');
      var target = obj;
      for (var i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          target[keys[i]] = newValue;
          return;
        }
        if (keys[i] in target)
          target = target[keys[i]];
        else return;
      }
    },
    getList: function () {
      return this.getValue(data, map.list);
    },
    transform: function (context) {
      var useList = map.list != undefined;
      var value;
      if (useList) {
        value = this.getValue(data, map.list);
      } else if (_.isArray(data) && !useList) {
        value = data;
      } else if (_.isObject(data) && !useList) {
        value = [data];
      }
      var normalized = [];

      if (!_.isEmpty(value)) {
        var list = useList ? this.getList() : value;
        normalized = map.item ? _.map(list, _.bind(this.iterator, this, map.item)) : list;
        normalized = _.bind(this.operate, this, normalized)(context);
        normalized = this.each(normalized, context);
        normalized = this.removeAll(normalized);
      }

      if (!useList && _.isObject(data) && !_.isArray(data)) {
        return normalized[0];
      }
      return normalized;
    },
    transformAsync: function (context) {
      return new Promise(function (resolve, reject) {
        try {
          resolve(this.transform(context))
        } catch (err) {
          reject(err);
        }
      }.bind(this));
    },
    removeAll: function (data) {
      if (_.isArray(map.remove)) {
        return _.each(data, this.remove)
      }
      return data;
    },
    remove: function (item) {
      _.each(map.remove, function (key) {
        delete item[key];
      });
      return item;
    },
    operate: function (data, context) {
      if (map.operate) {
        _.each(map.operate, _.bind(function (method) {
          data = _.map(data, _.bind(function (item) {
            var fn;
            if ('string' === typeof method.run) {
              fn = eval(method.run);
            } else {
              fn = method.run;
            }
            this.setValue(item, method.on, fn(this.getValue(item, method.on), context));
            return item;
          }, this));
        }, this));
      }
      return data;
    },
    each: function (data, context) {
      if (map.each) {
        _.each(data, function (value, index, collection) {
          return map.each(value, index, collection, context);
        });
      }
      return data;
    },
    iterator: function (map, item) {
      var obj = {};
      //to support simple arrays with recursion
      if (typeof map === 'string') {
        return this.getValue(item, map);
      }
      _.each(map, _.bind(function (oldkey, newkey) {
        if (typeof oldkey === 'string' && oldkey.length > 0) {
          var value = this.getValue(item, oldkey, newkey);
          if (value !== undefined) obj[newkey] = value;
        } else if (_.isArray(oldkey)) {
          var array = _.map(oldkey, _.bind(function (item, map) { return this.iterator(map, item) }, this, item));//need to swap arguments for bind
          obj[newkey] = array;
        } else if (typeof oldkey === 'object') {
          var bound = _.bind(this.iterator, this, oldkey, item);
          obj[newkey] = bound();
        }
        else {
          obj[newkey] = '';
        }

      }, this));
      return obj;
    }
  };
};

export default OreApibinding;