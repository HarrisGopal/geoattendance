/**
 * Sterlo Mobile library v1.0.0 (https://www.sterlo.io) 
 * Copyright 2022 Sterlo Platform Pvt Ltd. All rights reserved.
 * Module Name : Pages
 * Module Description : Runtime page activity will be handled using below functions
 */
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Linking, Image, SafeAreaView,BackHandler, StatusBar, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreTextBox from 'react-native-oreopscomponent/components/OreTextBox';
import OreCheckBox from 'react-native-oreopscomponent/components/OreCheckBox';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './Login_Config'; 
import {OreAlert,OreConfirmationAlert} from 'react-native-oreopscomponent/components/OreAlert';
import Oreframework from 'react-native-oreopscore/components/OreOPS/general/Ore_Framework';
import OreModelHandler from '../databinding/Ore_ModelHandler';
import OreApibinding from '../databinding/Ore_Databinding';
import OreDatabinding from '../databinding/Ore_Controlbinding';
import Spinner from 'react-native-loading-spinner-overlay';
import orethemebuilder from '../oreconfig/Ore_Themebuilder';
import Geolocation from '@react-native-community/geolocation';
import Moment from 'moment';

let OreStyle = orethemebuilder.getStylePath()
 
export default class Login extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
			 window.Page_01=this;
			this.state = {
				orepageproperty:PropertyJson,
				ParamJson: Paramjson,
				pagename: "Page_01",
				spinner: false,
				isvalid: true,
				GlobalVariables: GlobalVariables,
				ApiResponse:[],
				datamodal: OreApibinding.GetScreenModelData(Datamodel), 
			}
		}
	componentDidMount =async(evt)=>{
		    
		this.props.navigation.addListener('willFocus',async()=>{
		this.setState({ spinner: true })
		 window.Page_01 = this;
setTimeout(async() => {
		 await OreApibinding.GetScreenModelDataNew(this, Datamodel); Orefuncs.SetDate(this.state);
		 await OreApibinding.AutoBind(this);
		
		try {
			var Value = {"icon": "eye-slash"};
			Value=JSON.stringify(Value);
			var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
			correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
			correctJson = JSON.parse(correctJson);
			await Orefuncs.SetProperty("Icon_1", this.state, correctJson);
			var Value = { secureTextEntry: true };
			Value=JSON.stringify(Value);
			var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
			correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
			correctJson = JSON.parse(correctJson);
			await Orefuncs.SetProperty("Password", this.state, correctJson);
			var codeval = "";
			 var resp ="";
			await Orefuncs.GetCacheData("ruserid").then((response) => {
				if(response == undefined)
				{
				 resp="";
				}
				else if(codeval != "Select" &&codeval != undefined && codeval != ""){
					 resp = JSON.parse(response);
					var dobjcode = codeval;
					OreApibinding.ModelSet(this, dobjcode, resp);
				}
				else{
					resp =  Orefuncs.OreDataValidate(response);
				}
			});
			 var guserid=resp ;
			this.setState({ guserid: resp });
			var codeval = "";
			 var resp ="";
			await Orefuncs.GetCacheData("ruserpass").then((response) => {
				if(response == undefined)
				{
				 resp="";
				}
				else if(codeval != "Select" &&codeval != undefined && codeval != ""){
					 resp = JSON.parse(response);
					var dobjcode = codeval;
					OreApibinding.ModelSet(this, dobjcode, resp);
				}
				else{
					resp =  Orefuncs.OreDataValidate(response);
				}
			});
			 var guserpass=resp ;
			this.setState({ guserpass: resp });
			var codeval = "";
			 var resp ="";
			await Orefuncs.GetCacheData("rrember").then((response) => {
				if(response == undefined)
				{
				 resp="";
				}
				else if(codeval != "Select" &&codeval != undefined && codeval != ""){
					 resp = JSON.parse(response);
					var dobjcode = codeval;
					OreApibinding.ModelSet(this, dobjcode, resp);
				}
				else{
					resp =  Orefuncs.OreDataValidate(response);
				}
			});
			 var grember=resp ;
			this.setState({ grember: resp });
			if(grember == 1)
			{
				Orefuncs.SetValue("UserID", this.state, guserid)
				Orefuncs.SetValue("Password", this.state, guserpass)
				Orefuncs.SetValue("", this.state, grember)
			}
			else
			{
				Orefuncs.SetValue("UserID", this.state, "")
				Orefuncs.SetValue("Password", this.state, "")
				Orefuncs.SetValue("checkbox_1", this.state, "0")
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

}, 100);
})
  BackHandler.addEventListener(
'hardwareBackPress',
this.handleBackButtonClick,
); 
	}
	 handleBackButtonClick= async ()=>{
 if (this.state.orepageproperty["Page_01"]["Default"]["canBackPress"] == "false")
	 {
	 if (this.props.navigation.isFirstRouteInParent())
	 {
	Orefuncs.AppTerminate();
	 }
	 else
	 {
	Orefuncs.NavigateBack(this.props.navigation);
	}
	return true;
	}
	 return true;
	}
	
 componentWillUnmount=()=>{
	BackHandler.removeEventListener(
	'hardwareBackPress',
	this.handleBackButtonClick,
	);
	}
	
	/* OreTextBox : UserID; */
	UserID_onChangeText=(evt)=>{
		this.state.orepageproperty['UserID']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreTextBox : Password; */
	Password_onChangeText=(evt)=>{
		this.state.orepageproperty['Password']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreIcon : Icon_1; */
	Icon_1_onPress= async ()=>{
		this.setState({ spinner: true })
		
		try {
			var Getsecure = Orefuncs.OreDataValidate(Orefuncs.GetProperty("Password", this.state, "secureTextEntry"));
			if(Getsecure == true)
			{
				var Value = { secureTextEntry: false };
				Value=JSON.stringify(Value);
				var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
				correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
				correctJson = JSON.parse(correctJson);
				await Orefuncs.SetProperty("Password", this.state, correctJson);
				var Value = {"icon": "eye"};
				Value=JSON.stringify(Value);
				var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
				correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
				correctJson = JSON.parse(correctJson);
				await Orefuncs.SetProperty("Icon_1", this.state, correctJson);
			}
			else
			{
				var Value = { secureTextEntry: true };
				Value=JSON.stringify(Value);
				var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
				correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
				correctJson = JSON.parse(correctJson);
				await Orefuncs.SetProperty("Password", this.state, correctJson);
				var Value = {"icon": "eye-slash"};
				Value=JSON.stringify(Value);
				var correctJson = Value.replace(/(['"])?([a-z0-9A-Z_]+)(['"]):/g, '"$2": ');
				correctJson = correctJson.replace('https": //', 'https://').replace('http": //', 'http://');
				correctJson = JSON.parse(correctJson);
				await Orefuncs.SetProperty("Icon_1", this.state, correctJson);
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

	}
	/* OreCheckbox : checkbox_1; */

	checkbox_1_onValueChange= async (evt,item)=>{
		this.state.orepageproperty['checkbox_1']["Property"]["selectItem"]= evt;this.state.orepageproperty['checkbox_1']["Property"]["selectItemCount"]= evt.length; 
		this.setState({orepageproperty: this.state.orepageproperty});
	}
		
	/* OreButton : Button_1; */
	Button_1_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		setTimeout(async () => {
		 let validstatus=Orefuncs.Validate('form','','',this.state);
		 this.setState({isvalid:validstatus});
		 if(!validstatus){
			 this.setState({ spinner: false }); 
			 return false; 
		 }

		 /* Form Submit */
		 await OreApibinding.ModelCallFromScreen(this, 'Button_1');

		if(!this.state.isvalid)
	{
	this.setState({ spinner: false });
	return false;
	}
	
		 /* User Events */
		 
		 /* After Submit */
		
		try {
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433346","code").then((res) => { return res.data })) == 5)
			{
				if(Orefuncs.OreDataValidate(await Orefuncs.GetValue("checkbox_1", this.state)) == 1)
				{
					await Orefuncs.storeData("ruserid", await Orefuncs.GetValue("UserID", this.state))
					await Orefuncs.storeData("ruserpass", await Orefuncs.GetValue("Password", this.state))
					await Orefuncs.storeData("rrember", await Orefuncs.GetValue("checkbox_1", this.state))
					if ("false" == "True") {
						Orefuncs.NavigatewithResetpage(this.props.navigation, "Homepage", "")
					}
					else
					{
						Orefuncs.NavigateTo(this.props.navigation, "Homepage", "")
					}
				}
				else
				{
					await Orefuncs.storeData("ruserid", "")
					await Orefuncs.storeData("ruserpass", "")
					await Orefuncs.storeData("rrember", "0")
					if ("false" == "True") {
						Orefuncs.NavigatewithResetpage(this.props.navigation, "Homepage", "")
					}
					else
					{
						Orefuncs.NavigateTo(this.props.navigation, "Homepage", "")
					}
				}
			}
			else
			{
				OreAlert.alert("Alert", (Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "Loginres","msg").then((res) => { return res.data }))).toString());
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
		}, 0);
}


	/* OreText : Text_1; */
	Text_1_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Forgotpassword')
	}

	callnanoflow = (evt) => {
		Orefuncs.callnanoflow(evt, this, Nanojson)
	}
render() {
	return (
		<ImageBackground imageStyle={{resizeMode: 'stretch'}} style={[OreStyle.PageStyle, this.state.orepageproperty['Page_01']["styles"]]} source={{uri:this.state.orepageproperty['Page_01']["Property"]["backgroundImage"]}}> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					<StatusBar translucent={false}/> 
				<View style ={ { height:Oreframework.getH(300,318,560)} }>
					<OreTextBox style={this.state.orepageproperty['UserID']["styles"]} type={this.state.orepageproperty['UserID']["Property"]["type"]} value={this.state.orepageproperty['UserID']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['UserID']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['UserID']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['UserID']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['UserID']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['UserID']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['UserID']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['UserID']["Property"]["maxLength"]} property={this.state.orepageproperty['UserID']["Property"]} disabled={this.state.orepageproperty['UserID']["Property"]["disabled"]} textstyle={this.state.orepageproperty['UserID']["textstyle"]} viewstyle={this.state.orepageproperty['UserID']["viewstyle"]} title={this.state.orepageproperty['UserID']["title"]} inputRef={(input) => {this.UserID = input}} onChangeText={this.UserID_onChangeText} />
					<OreTextBox style={this.state.orepageproperty['Password']["styles"]} type={this.state.orepageproperty['Password']["Property"]["type"]} value={this.state.orepageproperty['Password']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['Password']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['Password']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['Password']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['Password']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['Password']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['Password']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['Password']["Property"]["maxLength"]} property={this.state.orepageproperty['Password']["Property"]} disabled={this.state.orepageproperty['Password']["Property"]["disabled"]} textstyle={this.state.orepageproperty['Password']["textstyle"]} viewstyle={this.state.orepageproperty['Password']["viewstyle"]} title={this.state.orepageproperty['Password']["title"]} inputRef={(input) => {this.Password = input}} onChangeText={this.Password_onChangeText} />
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} viewStyle={this.state.orepageproperty['Icon_1']["viewStyle"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} onPress={this.Icon_1_onPress}/>:<View style={{ height: Oreframework.getH(20,318,560), width: Oreframework.getW(20,318,560), top: Oreframework.getH(275.7,318,560), left: Oreframework.getW(276.6,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} onPress={this.Icon_1_onPress}/></View>}
					<OreImage style={this.state.orepageproperty['Image_3']["styles"]}  source={this.state.orepageproperty['Image_3']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_3']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_3']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_3']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_3']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_3']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_3']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_3']["Property"]} uri={this.state.orepageproperty['Image_3']["Property"]["source"]}/>
				</View>
				<View style ={ { height:Oreframework.getH(250,318,560)} }>
					<OreImage style={this.state.orepageproperty['Image_1']["styles"]}  source={this.state.orepageproperty['Image_1']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_1']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_1']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_1']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_1']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_1']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_1']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_1']["Property"]} uri={this.state.orepageproperty['Image_1']["Property"]["source"]}/>
					<View style={{ height: Oreframework.getH(82.0875,318,560), width: Oreframework.getW(82.0875,318,560), top: Oreframework.getH(123.63,318,560), left: Oreframework.getW(118.225,318,560), position:'absolute', alignItems: 'center' }}><OreShapes style={this.state.orepageproperty['Oval_1']["styles"]} viewStyle={this.state.orepageproperty['Oval_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Oval_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Oval_1']["Property"]["source"]}}  property={this.state.orepageproperty['Oval_1']["Property"]}/></View>
					<OreCheckBox style={this.state.orepageproperty['checkbox_1']["styles"]} textstyle={this.state.orepageproperty['checkbox_1']["textstyle"]} title={this.state.orepageproperty['checkbox_1']["Default"]["txtctrlcaption"]}  dataSource={this.state.orepageproperty['checkbox_1']["Property"]["data"]} disabled={this.state.orepageproperty['checkbox_1']["Property"]["disabled"]} tintColors={this.state.orepageproperty['checkbox_1']["Property"]["tintColors"]} selectedItems={this.state.orepageproperty['checkbox_1']["Property"]["selectItem"]} nameField={this.state.orepageproperty['checkbox_1']["Property"]["nameField"]} valueField={this.state.orepageproperty['checkbox_1']["Property"]["valueField"]} maxCount={this.state.orepageproperty['checkbox_1']["Property"]["maxSelectCount"]} flexDirection={this.state.orepageproperty['checkbox_1']["Property"]["flexDirection"]} onValueChange={this.checkbox_1_onValueChange}/>
					<OreButton controlid='50004' controlname='Button_1' disabled={this.state.orepageproperty['Button_1']["Property"]["disabled"]} style={this.state.orepageproperty['Button_1']["styles"]} property={this.state.orepageproperty['Button_1']["Property"]} textstyle={this.state.orepageproperty['Button_1']["textstyle"]} title={this.state.orepageproperty['Button_1']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_1']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_1 = input}} onPress={this.Button_1_onPress} />
					<OreText style={this.state.orepageproperty['Text_1']["styles"]}  title={this.state.orepageproperty['Text_1']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_1']["Property"]["disabled"]} property={this.state.orepageproperty['Text_1']["Property"]} numberOfLines={this.state.orepageproperty['Text_1']["Property"]["numberOfLines"]} onPress={this.Text_1_onPress} />
					<OreImage style={this.state.orepageproperty['Image_2']["styles"]}  source={this.state.orepageproperty['Image_2']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_2']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_2']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_2']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_2']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_2']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_2']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_2']["Property"]} uri={this.state.orepageproperty['Image_2']["Property"]["source"]}/>
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
