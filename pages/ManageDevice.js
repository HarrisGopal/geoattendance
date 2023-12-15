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
import OreHeader from 'react-native-oreopscomponent/components/OreHeader';
import OreTextBox from 'react-native-oreopscomponent/components/OreTextBox';
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreText from 'react-native-oreopscomponent/components/OreText';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './ManageDevice_Config'; 
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
 
export default class ManageDevice extends Component {
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
			await OreApibinding.ModelSave(this, "O433364", "API#O433345#4#EmployeeProfile").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			await OreApibinding.ModelSave(this, "O433731", "API#O433356#2#roleres").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			var device=await Orefuncs.GetDeviceInfo("Device_UniqueID")
			Orefuncs.SetText("Text_3", this.state, device)
			Orefuncs.SetValue("TextBox_2", this.state, "Exec [EricaT].[uisp_Up_Mbl_MobileDeviceId] '" + await OreApibinding.GetModalFieldData(this, "O433364","empcode").then((res) => { return res.data }) + "','" + device + "',1")
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433731","flag").then((res) => { return res.data })) == 1)
			{
				await Orefuncs.SetVisible("Rectangle_2", this.state);
				await Orefuncs.SetVisible("Button_2", this.state);
				await Orefuncs.SetVisible("TextBox_1", this.state);
			}
			else
			{
				await Orefuncs.SetHide("Button_2", this.state);
				await Orefuncs.SetHide("TextBox_1", this.state);
				await Orefuncs.SetHide("Rectangle_2", this.state);
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
	
	/* OreHeader : Header_1; */
	Header_1_lefticonpress= async ()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Settings')
	}
	/* OreButton : Button_1; */
	Button_1_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		setTimeout(async () => {
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
			OreAlert.alert("Activation Message", (Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "Activationresponse","msg").then((res) => { return res.data }))).toString());
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
		}, 0);
}


	/* OreTextBox : TextBox_2; */
	TextBox_2_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_2']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreTextBox : TextBox_1; */
	TextBox_1_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_1']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreButton : Button_2; */
	Button_2_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		setTimeout(async () => {
		 let validstatus=Orefuncs.Validate('form','','',this.state);
		 this.setState({isvalid:validstatus});
		 if(!validstatus){
			 this.setState({ spinner: false }); 
			 return false; 
		 }

		 /* Before Submit */
		
		try {
			var device=await Orefuncs.GetDeviceInfo("Device_UniqueID")
			Orefuncs.SetValue("TextBox_2", this.state, "Exec [EricaT].[uisp_Up_Mbl_MobileDeviceId] '" + await Orefuncs.GetValue("TextBox_1", this.state) + "','" + device + "',0")
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		if(!this.state.isvalid)
	{
	this.setState({ spinner: false });
	return false;
	}
	
		 /* Form Submit */
		 await OreApibinding.ModelCallFromScreen(this, 'Button_2');

		if(!this.state.isvalid)
	{
	this.setState({ spinner: false });
	return false;
	}
	
		 /* User Events */
		 
		 /* After Submit */
		
		try {
			OreAlert.alert("De-Activation Alert", (Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "Activationresponse","msg").then((res) => { return res.data }))).toString());
			Orefuncs.SetValue("TextBox_2", this.state, "Exec [EricaT].[uisp_Up_Mbl_MobileDeviceId] '" + await OreApibinding.GetModalFieldData(this, "O433364","empcode").then((res) => { return res.data }) + "','" + device + "',1")
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
		}, 0);
}



	callnanoflow = (evt) => {
		Orefuncs.callnanoflow(evt, this, Nanojson)
	}
render() {
	return (
		<ImageBackground imageStyle={{resizeMode: 'stretch'}} style={[OreStyle.PageStyle, this.state.orepageproperty['Page_01']["styles"]]} source={{uri:this.state.orepageproperty['Page_01']["Property"]["backgroundImage"]}}>
 	 		<View >
				<OreHeader title={this.state.orepageproperty['Header_1']["Property"]["title"]} lefticon={this.state.orepageproperty['Header_1']["Property"]["lefticon"]}  lefticonsize={this.state.orepageproperty['Header_1']["Property"]["lefticonsizevalue"]}          style={this.state.orepageproperty['Header_1']["styles"]} textstyle={this.state.orepageproperty['Header_1']["textstyle"]} disabled={this.state.orepageproperty['Header_1']["Property"]["disabled"]}  lefticontype={this.state.orepageproperty['Header_1']["Property"]["lefticontype"]}    placement={this.state.orepageproperty['Header_1']["Property"]["textAlign"]} lefticonnpmtype={this.state.orepageproperty['Header_1']["Property"]["lefticonnpmtype"]} righticon1npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon1npmtype"]} righticon2npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon2npmtype"]} righticon3npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon3npmtype"]} lefticonpress={this.Header_1_lefticonpress}/>
			</View> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					 
				<View style ={ { height:Oreframework.getH(269,318,560)} }>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} viewStyle={this.state.orepageproperty['Icon_1']["viewStyle"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(75.9375,318,560), width: Oreframework.getW(76.9375,318,560), top: Oreframework.getH(44,318,560), left: Oreframework.getW(121,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} /></View>}
					<OreButton controlid='50005' controlname='Button_1' disabled={this.state.orepageproperty['Button_1']["Property"]["disabled"]} style={this.state.orepageproperty['Button_1']["styles"]} property={this.state.orepageproperty['Button_1']["Property"]} textstyle={this.state.orepageproperty['Button_1']["textstyle"]} title={this.state.orepageproperty['Button_1']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_1']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_1 = input}} onPress={this.Button_1_onPress} />
					<OreText style={this.state.orepageproperty['Text_1']["styles"]}  title={this.state.orepageproperty['Text_1']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_1']["Property"]["disabled"]} property={this.state.orepageproperty['Text_1']["Property"]} numberOfLines={this.state.orepageproperty['Text_1']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_3']["styles"]}  title={this.state.orepageproperty['Text_3']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_3']["Property"]["disabled"]} property={this.state.orepageproperty['Text_3']["Property"]} numberOfLines={this.state.orepageproperty['Text_3']["Property"]["numberOfLines"]} />
					<OreTextBox style={this.state.orepageproperty['TextBox_2']["styles"]} type={this.state.orepageproperty['TextBox_2']["Property"]["type"]} value={this.state.orepageproperty['TextBox_2']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_2']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_2']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_2']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_2']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_2']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_2']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_2']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_2']["Property"]} disabled={this.state.orepageproperty['TextBox_2']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_2']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_2']["viewstyle"]} title={this.state.orepageproperty['TextBox_2']["title"]} inputRef={(input) => {this.TextBox_2 = input}} onChangeText={this.TextBox_2_onChangeText} />
				</View>
				<View style ={ { height:Oreframework.getH(208,318,560)} }>
					<OreTextBox style={this.state.orepageproperty['TextBox_1']["styles"]} type={this.state.orepageproperty['TextBox_1']["Property"]["type"]} value={this.state.orepageproperty['TextBox_1']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_1']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_1']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_1']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_1']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_1']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_1']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_1']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_1']["Property"]} disabled={this.state.orepageproperty['TextBox_1']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_1']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_1']["viewstyle"]} title={this.state.orepageproperty['TextBox_1']["title"]} inputRef={(input) => {this.TextBox_1 = input}} onChangeText={this.TextBox_1_onChangeText} />
					<OreButton controlid='50006' controlname='Button_2' disabled={this.state.orepageproperty['Button_2']["Property"]["disabled"]} style={this.state.orepageproperty['Button_2']["styles"]} property={this.state.orepageproperty['Button_2']["Property"]} textstyle={this.state.orepageproperty['Button_2']["textstyle"]} title={this.state.orepageproperty['Button_2']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_2']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_2 = input}} onPress={this.Button_2_onPress} />
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
