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
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './Homepage_Config'; 
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
 
export default class Homepage extends Component {
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
			await OreApibinding.ModelSave(this, "O433357", "API#O433356#1#homeres").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			await OreApibinding.ModelSave(this, "O433358", "API#O433345#3#Avatar").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			await OreApibinding.ModelSave(this, "O433364", "API#O433345#4#EmployeeProfile").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
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
		try {
			
			this.setState({ spinner: false });
			let cnfrm_result = await OreConfirmationAlert("Logout", "Are you sure want to  Logout ?", "Yes", "No");
			this.setState({ spinner: true });
			if (cnfrm_result == true){
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "Login", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "Login", "")
				}
			}
			else{
				
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

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
	/* OreHeader : Header_1; */
	Header_1_righticon1press= async ()=>{
		
		
		try {
			
			this.setState({ spinner: false });
			let cnfrm_result = await OreConfirmationAlert("Logout", "Are you Sure want to Logout?", "Yes", "No");
			this.setState({ spinner: true });
			if (cnfrm_result == true){
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "Login", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "Login", "")
				}
			}
			else{
				
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

	}
	/* OreButton : Button_1; */
	Button_1_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		 /* User Events */
		 
		 /* After Submit */
		
		try {
			try {	
			var dobjcode ="O433768";
					 var currentlocation=await Orefuncs.GetGeolocation();
				if(currentlocation == undefined){
				this.setState({ spinner: false });
				return;
			}
			else{currentlocation = currentlocation.coords
				OreApibinding.ModelSet(this, dobjcode, currentlocation);
			}
			}	catch(ex){
			OreAlert.alert(ex.message);}
		
			// --------- Start of Direct Code --------- //
		
			var lat = currentlocation.latitude;
			var longt = currentlocation.longitude
			
			var trimlat =  Number((lat).toFixed(6));
			var trimlongt = Number((longt).toFixed(6));
			
			var Loc = trimlat+","+trimlongt
		
			// --------- End of Direct Code ----------- //
		
			await Orefuncs.SetLocalStorage("location", Loc)
			if ("false" == "True") {
				Orefuncs.NavigatewithResetpage(this.props.navigation, "RecordAttendance", "")
			}
			else
			{
				Orefuncs.NavigateTo(this.props.navigation, "RecordAttendance", "")
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

		this.setState({ spinner: false });
}


	/* OreButton : Button_3; */
	Button_3_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		setTimeout(async () => {
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
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433731","flag").then((res) => { return res.data })) == 1)
			{
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "AdminParameterPage", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "AdminParameterPage", "")
				}
			}
			else
			{
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "EmployeeParameter", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "EmployeeParameter", "")
				}
			}
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
				<OreHeader title={this.state.orepageproperty['Header_1']["Property"]["title"]} lefticon={this.state.orepageproperty['Header_1']["Property"]["lefticon"]}  lefticonsize={this.state.orepageproperty['Header_1']["Property"]["lefticonsizevalue"]} righticon1={this.state.orepageproperty['Header_1']["Property"]["righticon1"]}  righticon1size={this.state.orepageproperty['Header_1']["Property"]["righticon1sizevalue"]}       style={this.state.orepageproperty['Header_1']["styles"]} textstyle={this.state.orepageproperty['Header_1']["textstyle"]} disabled={this.state.orepageproperty['Header_1']["Property"]["disabled"]}  lefticontype={this.state.orepageproperty['Header_1']["Property"]["lefticontype"]} righticon1type={this.state.orepageproperty['Header_1']["Property"]["righticon1type"]}   placement={this.state.orepageproperty['Header_1']["Property"]["textAlign"]} lefticonnpmtype={this.state.orepageproperty['Header_1']["Property"]["lefticonnpmtype"]} righticon1npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon1npmtype"]} righticon2npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon2npmtype"]} righticon3npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon3npmtype"]} lefticonpress={this.Header_1_lefticonpress}righticon1press={this.Header_1_righticon1press}/>
			</View> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					 
				<View style ={ { height:Oreframework.getH(304,318,560)} }>
					<OreButton controlid='50007' controlname='Button_1' disabled={this.state.orepageproperty['Button_1']["Property"]["disabled"]} style={this.state.orepageproperty['Button_1']["styles"]} property={this.state.orepageproperty['Button_1']["Property"]} textstyle={this.state.orepageproperty['Button_1']["textstyle"]} title={this.state.orepageproperty['Button_1']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_1']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_1 = input}} onPress={this.Button_1_onPress} />
					<OreButton controlid='50009' controlname='Button_3' disabled={this.state.orepageproperty['Button_3']["Property"]["disabled"]} style={this.state.orepageproperty['Button_3']["styles"]} property={this.state.orepageproperty['Button_3']["Property"]} textstyle={this.state.orepageproperty['Button_3']["textstyle"]} title={this.state.orepageproperty['Button_3']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_3']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_3 = input}} onPress={this.Button_3_onPress} />
					<OreShapes style={this.state.orepageproperty['Rectangle_1']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_1']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_1']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_3']["styles"]}  title={this.state.orepageproperty['Text_3']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_3']["Property"]["disabled"]} property={this.state.orepageproperty['Text_3']["Property"]} numberOfLines={this.state.orepageproperty['Text_3']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_4']["styles"]}  title={this.state.orepageproperty['Text_4']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_4']["Property"]["disabled"]} property={this.state.orepageproperty['Text_4']["Property"]} numberOfLines={this.state.orepageproperty['Text_4']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_5']["styles"]}  title={this.state.orepageproperty['Text_5']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_5']["Property"]["disabled"]} property={this.state.orepageproperty['Text_5']["Property"]} numberOfLines={this.state.orepageproperty['Text_5']["Property"]["numberOfLines"]} />
					<OreImage style={this.state.orepageproperty['Image_1']["styles"]}  source={this.state.orepageproperty['Image_1']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_1']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_1']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_1']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_1']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_1']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_1']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_1']["Property"]} uri={this.state.orepageproperty['Image_1']["Property"]["source"]}/>
				</View>
				<View style ={ { height:Oreframework.getH(170,318,560)} }>
					<OreImage style={this.state.orepageproperty['Image_2']["styles"]}  source={this.state.orepageproperty['Image_2']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_2']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_2']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_2']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_2']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_2']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_2']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_2']["Property"]} uri={this.state.orepageproperty['Image_2']["Property"]["source"]}/>
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
