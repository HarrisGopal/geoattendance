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
import OreTextBox from 'react-native-oreopscomponent/components/OreTextBox';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './Index_Config'; 
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
 
export default class Index extends Component {
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
		    
		this.props.navigation.addListener('willFocus', async()=>{
		this.setState({ spinner: true })
		 window.Page_01 = this;
		Orefuncs.SetDate(this.state);
 setTimeout(async() => {
		await OreApibinding.GetScreenModelDataNew(this, Datamodel);
		 await OreApibinding.AutoBind(this);
		 this.setState({ spinner: false })
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
	
	/* OreTextBox : TextBox_1; */
	TextBox_1_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_1']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreButton : Button_3; */
	Button_3_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		setTimeout(async () => {
		 let validstatus=Orefuncs.Validate('form','','',this.state);
		 this.setState({isvalid:validstatus});
		 if(!validstatus){
			 this.setState({ spinner: false }); 
			 return false; 
		 }

		 /* Form Submit */
		 await OreApibinding.ModelCallFromScreen(this, 'Button_3');

		if(!this.state.isvalid)
	{
	this.setState({ spinner: false });
	return false;
	}
	
		 /* User Events */
		 
		 /* After Submit */
		
		try {
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433342","msg").then((res) => { return res.data })) == "Valid PIN")
			{
				var directValue = "Y"
				var response = OreApibinding.ModelSetFieldDir(this, "O433349", "pinflag", directValue);
				if(response == undefined || response.status == false){
					this.setState({ spinner: false });
					OreAlert.alert("Model Set Failed", response.data);
					return;
				}
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "Login", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "Login", "")
				}
			}
			else
			{
				OreAlert.alert("Something went wrong", (Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "PINPageres","msg").then((res) => { return res.data }))).toString());
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
		}, 0);
}


	/* OreButton : Button_4; */
	Button_4_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		 /* User Events */
		
		try {
			Orefuncs.SetValue("TextBox_1", this.state, "")
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
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
				<View style ={ { height:Oreframework.getH(318,318,560)} }>
					<OreTextBox style={this.state.orepageproperty['TextBox_1']["styles"]} type={this.state.orepageproperty['TextBox_1']["Property"]["type"]} value={this.state.orepageproperty['TextBox_1']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_1']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_1']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_1']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_1']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_1']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_1']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_1']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_1']["Property"]} disabled={this.state.orepageproperty['TextBox_1']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_1']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_1']["viewstyle"]} title={this.state.orepageproperty['TextBox_1']["title"]} inputRef={(input) => {this.TextBox_1 = input}} onChangeText={this.TextBox_1_onChangeText} />
					<OreButton controlid='50007' controlname='Button_3' disabled={this.state.orepageproperty['Button_3']["Property"]["disabled"]} style={this.state.orepageproperty['Button_3']["styles"]} property={this.state.orepageproperty['Button_3']["Property"]} textstyle={this.state.orepageproperty['Button_3']["textstyle"]} title={this.state.orepageproperty['Button_3']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_3']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_3 = input}} onPress={this.Button_3_onPress} />
					<OreImage style={this.state.orepageproperty['Image_2']["styles"]}  source={this.state.orepageproperty['Image_2']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_2']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_2']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_2']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_2']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_2']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_2']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_2']["Property"]} uri={this.state.orepageproperty['Image_2']["Property"]["source"]}/>
				</View>
				<View style ={ { height:Oreframework.getH(232,318,560)} }>
					<OreButton controlid='50014' controlname='Button_4' disabled={this.state.orepageproperty['Button_4']["Property"]["disabled"]} style={this.state.orepageproperty['Button_4']["styles"]} property={this.state.orepageproperty['Button_4']["Property"]} textstyle={this.state.orepageproperty['Button_4']["textstyle"]} title={this.state.orepageproperty['Button_4']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_4']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_4 = input}} onPress={this.Button_4_onPress} />
					<OreImage style={this.state.orepageproperty['Image_3']["styles"]}  source={this.state.orepageproperty['Image_3']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_3']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_3']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_3']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_3']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_3']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_3']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_3']["Property"]} uri={this.state.orepageproperty['Image_3']["Property"]["source"]}/>
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
