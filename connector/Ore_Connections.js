import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import OreApibinding from '../databinding/Ore_Databinding';

const OreCommURL = 'https://stageapi.sterlo.io/api/v1/s/'
const nodeauthkey = '76BCC2FA25C2A4B98E4EAE11DACDD'

const connectors = [{"contype":"210","objcode":"O433276","conname":"Appetize","config":{"apitoken":"tok_anjctfcufvtfgna3vw4qtucpze","publickey":"Sterlo","device":"nexus5"}},{"contype":"130","objcode":"O433336","conname":"Tactive","config":{"name":"PINPAGE","baseurl":"https://saas.tactivesoft.com/api/ServiceApi/GetDetailServiceApi.svc/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433344","conname":"Login","config":{"name":"Login","baseurl":"https://mobuta.tactivesoft.com/api/ServiceApi/MobileApi.svc/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433354","conname":"Home","config":{"name":"Home","baseurl":"https://mobuta.tactivesoft.com/api/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433706","conname":"Activate","config":{"name":"Activation","baseurl":"https://ttwinapi.tactivesoft.com/wapi/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433808","conname":"Location","config":{"name":"Location","baseurl":"https://maps.googleapis.com/maps/api/geocode/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}}]

const rconnectors = [{"contype":"130","objcode":"O433336","conname":"Tactive","config":{"name":"PINPAGE","baseurl":"https://saas.tactivesoft.com/api/ServiceApi/GetDetailServiceApi.svc/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433354","conname":"Home","config":{"name":"Home","baseurl":"https://mobuta.tactivesoft.com/api/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433706","conname":"Activate","config":{"name":"Activation","baseurl":"https://ttwinapi.tactivesoft.com/wapi/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}},{"contype":"130","objcode":"O433808","conname":"Location","config":{"name":"Location","baseurl":"https://maps.googleapis.com/maps/api/geocode/","headername1":"","headervalue1":"","headername2":"","headervalue2":"","headername3":"","headervalue3":""}}]

const GetEnvironment = () => {
	if(__DEV__ === false) return 'R';
	else return 'D';
}

const GetConnectors = () => {
	if(GetEnvironment() === 'D')
	   return connectors;
	else return rconnectors;
}

const GetConnectorsByType = (conntype) => {
	let conndetail = [];
	if(GetEnvironment() === 'D')
		conndetail =  connectors.filter(connector => connector.contype === conntype);
	else
		conndetail =  rconnectors.filter(connector => connector.contype === conntype);
    conndetail = conndetail ? conndetail : []
    return conndetail; 
}

const GetConnectorConfig = (conname) => {
	let conndetail = {};
	if(GetEnvironment() === 'D')
		conndetail =  connectors.filter(connector => connector.conname === conname)[0];
	else
		conndetail =  rconnectors.filter(connector => connector.conname === conname)[0];
    conndetail = conndetail ? conndetail.config : ''
    return conndetail; 
}

const GetAPIBaseURL =async (objcode) => {	
	try {
	
		if(GetEnvironment() === 'D') {
			let apiconn =  connectors.filter(connector => connector.contype === "130" && connector.objcode === objcode);				
			if(apiconn.length > 0){
	var lsvalexist=await OreApibinding.GetCacheData(objcode);
				//var lsvalexist=await Orefuncs.GetasyncLocalStorage(objcode);	
					if(lsvalexist)
					{
						//lsvalexist=JSON.parse(lsvalexist);
					       return lsvalexist[0].config.baseurl;
					}
				        else
				         return apiconn[0].config.baseurl;
			}		
		}
		else {
			let apiconn =  rconnectors.filter(connector => connector.contype === "130" && connector.objcode === objcode);
			if(apiconn.length > 0){
			
				var lsvalexist=await OreApibinding.GetCacheData(objcode);
				//var lsvalexist=await Orefuncs.GetasyncLocalStorage(objcode);
				if(lsvalexist)
				{
					//lsvalexist=JSON.parse(lsvalexist);
				        return lsvalexist[0].config.baseurl;
				}
			        else
			         return apiconn[0].config.baseurl;
			}	
		}
		
		return false;
	} catch (error) {
		return false;
	}		
}



export default { OreCommURL, GetConnectors, GetConnectorConfig, GetConnectorsByType, GetAPIBaseURL,GetEnvironment,connectors,rconnectors,nodeauthkey }

