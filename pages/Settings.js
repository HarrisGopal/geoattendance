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
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './Settings_Config'; 
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
 
export default class Settings extends Component {
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
	
	/* OreHeader : Header_1; */
	Header_1_lefticonpress= async ()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
	}
	/* OreHeader : Header_1; */
	Header_1_righticon1press= async ()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
	}
	/* OreHeader : Header_1; */
	Header_1_righticon2press= async ()=>{
		 Orefuncs.NavigateTo(this.props.navigation, 'Homepage')
	}
	/* OreText : Text_2; */
	Text_2_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'ManageDevice')
	}
	/* OreText : Text_3; */
	Text_3_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Profile')
	}
	/* OreIcon : Icon_6; */
	Icon_6_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Profile')
	}
	/* OreButton : Button_1; */
	Button_1_onPress= async (evt)=>{
		 this.setState({ spinner: true });

		 /* User Events */
		
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

		this.setState({ spinner: false });
}



	callnanoflow = (evt) => {
		Orefuncs.callnanoflow(evt, this, Nanojson)
	}
render() {
	return (
		<ImageBackground imageStyle={{resizeMode: 'stretch'}} style={[OreStyle.PageStyle, this.state.orepageproperty['Page_01']["styles"]]} source={{uri:this.state.orepageproperty['Page_01']["Property"]["backgroundImage"]}}>
 	 		<View >
				<OreHeader title={this.state.orepageproperty['Header_1']["Property"]["title"]} lefticon={this.state.orepageproperty['Header_1']["Property"]["lefticon"]}  lefticonsize={this.state.orepageproperty['Header_1']["Property"]["lefticonsizevalue"]}          style={this.state.orepageproperty['Header_1']["styles"]} textstyle={this.state.orepageproperty['Header_1']["textstyle"]} disabled={this.state.orepageproperty['Header_1']["Property"]["disabled"]}  lefticontype={this.state.orepageproperty['Header_1']["Property"]["lefticontype"]}    placement={this.state.orepageproperty['Header_1']["Property"]["textAlign"]} lefticonnpmtype={this.state.orepageproperty['Header_1']["Property"]["lefticonnpmtype"]} righticon1npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon1npmtype"]} righticon2npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon2npmtype"]} righticon3npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon3npmtype"]} lefticonpress={this.Header_1_lefticonpress}righticon1press={this.Header_1_righticon1press}righticon2press={this.Header_1_righticon2press}/>
			</View> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					 
				<View style ={ { height:Oreframework.getH(303,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} onPress={this.Text_2_onPress} />
					<OreText style={this.state.orepageproperty['Text_3']["styles"]}  title={this.state.orepageproperty['Text_3']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_3']["Property"]["disabled"]} property={this.state.orepageproperty['Text_3']["Property"]} numberOfLines={this.state.orepageproperty['Text_3']["Property"]["numberOfLines"]} onPress={this.Text_3_onPress} />
					<OreText style={this.state.orepageproperty['Text_6']["styles"]}  title={this.state.orepageproperty['Text_6']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_6']["Property"]["disabled"]} property={this.state.orepageproperty['Text_6']["Property"]} numberOfLines={this.state.orepageproperty['Text_6']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_3']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_3']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_3']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_3']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_3']["Property"]}/>
					<OreShapes style={this.state.orepageproperty['Rectangle_4']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_4']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_4']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_4']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_4']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_7']["styles"]}  title={this.state.orepageproperty['Text_7']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_7']["Property"]["disabled"]} property={this.state.orepageproperty['Text_7']["Property"]} numberOfLines={this.state.orepageproperty['Text_7']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_8']["styles"]}  title={this.state.orepageproperty['Text_8']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_8']["Property"]["disabled"]} property={this.state.orepageproperty['Text_8']["Property"]} numberOfLines={this.state.orepageproperty['Text_8']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_9']["styles"]}  title={this.state.orepageproperty['Text_9']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_9']["Property"]["disabled"]} property={this.state.orepageproperty['Text_9']["Property"]} numberOfLines={this.state.orepageproperty['Text_9']["Property"]["numberOfLines"]} />
					<OreImage style={this.state.orepageproperty['Image_2']["styles"]}  source={this.state.orepageproperty['Image_2']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_2']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_2']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_2']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_2']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_2']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_2']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_2']["Property"]} uri={this.state.orepageproperty['Image_2']["Property"]["source"]}/>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_6']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_6']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_6']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_6']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_6']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_6']["styles"]} viewStyle={this.state.orepageproperty['Icon_6']["viewStyle"]} inputRef={(input) => {this.Icon_6 = input}} disabled={this.state.orepageproperty['Icon_6']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_6']["Property"]["iconnpmtype"]} onPress={this.Icon_6_onPress}/>:<View style={{ height: Oreframework.getH(44.7969,318,560), width: Oreframework.getW(43.7969,318,560), top: Oreframework.getH(203.694,318,560), left: Oreframework.getW(-1,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_6']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_6']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_6']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_6']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_6']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_6']["styles"]} inputRef={(input) => {this.Icon_6 = input}} disabled={this.state.orepageproperty['Icon_6']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_6']["Property"]["iconnpmtype"]} onPress={this.Icon_6_onPress}/></View>}
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_7']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_7']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_7']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_7']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_7']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_7']["styles"]} viewStyle={this.state.orepageproperty['Icon_7']["viewStyle"]} inputRef={(input) => {this.Icon_7 = input}} disabled={this.state.orepageproperty['Icon_7']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_7']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(44.7969,318,560), width: Oreframework.getW(43.7969,318,560), top: Oreframework.getH(257.792,318,560), left: Oreframework.getW(-1,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_7']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_7']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_7']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_7']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_7']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_7']["styles"]} inputRef={(input) => {this.Icon_7 = input}} disabled={this.state.orepageproperty['Icon_7']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_7']["Property"]["iconnpmtype"]} /></View>}
				</View>
				<View style ={ { height:Oreframework.getH(338,318,560)} }>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} viewStyle={this.state.orepageproperty['Icon_3']["viewStyle"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(50,318,560), width: Oreframework.getW(50,318,560), top: Oreframework.getH(276.91,318,560), left: Oreframework.getW(-2,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} /></View>}
					<OreShapes style={this.state.orepageproperty['Rectangle_1']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_1']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_1']["Property"]}/>
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_4']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_4']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_4']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_4']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_4']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_4']["styles"]} viewStyle={this.state.orepageproperty['Icon_4']["viewStyle"]} inputRef={(input) => {this.Icon_4 = input}} disabled={this.state.orepageproperty['Icon_4']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_4']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(50,318,560), width: Oreframework.getW(50,318,560), top: Oreframework.getH(216.30,318,560), left: Oreframework.getW(-2,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_4']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_4']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_4']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_4']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_4']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_4']["styles"]} inputRef={(input) => {this.Icon_4 = input}} disabled={this.state.orepageproperty['Icon_4']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_4']["Property"]["iconnpmtype"]} /></View>}
					<OreText style={this.state.orepageproperty['Text_4']["styles"]}  title={this.state.orepageproperty['Text_4']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_4']["Property"]["disabled"]} property={this.state.orepageproperty['Text_4']["Property"]} numberOfLines={this.state.orepageproperty['Text_4']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_5']["styles"]}  title={this.state.orepageproperty['Text_5']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_5']["Property"]["disabled"]} property={this.state.orepageproperty['Text_5']["Property"]} numberOfLines={this.state.orepageproperty['Text_5']["Property"]["numberOfLines"]} />
					<OreImage style={this.state.orepageproperty['Image_1']["styles"]}  source={this.state.orepageproperty['Image_1']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_1']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_1']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_1']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_1']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_1']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'stretch'}  asset={this.state.orepageproperty['Image_1']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_1']["Property"]} uri={this.state.orepageproperty['Image_1']["Property"]["source"]}/>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_5']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_5']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_5']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_5']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_5']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_5']["styles"]} viewStyle={this.state.orepageproperty['Icon_5']["viewStyle"]} inputRef={(input) => {this.Icon_5 = input}} disabled={this.state.orepageproperty['Icon_5']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_5']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(50,318,560), width: Oreframework.getW(50,318,560), top: Oreframework.getH(283.21,318,560), left: Oreframework.getW(195,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_5']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_5']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_5']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_5']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_5']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_5']["styles"]} inputRef={(input) => {this.Icon_5 = input}} disabled={this.state.orepageproperty['Icon_5']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_5']["Property"]["iconnpmtype"]} /></View>}
					<OreButton controlid='50024' controlname='Button_1' disabled={this.state.orepageproperty['Button_1']["Property"]["disabled"]} style={this.state.orepageproperty['Button_1']["styles"]} property={this.state.orepageproperty['Button_1']["Property"]} textstyle={this.state.orepageproperty['Button_1']["textstyle"]} title={this.state.orepageproperty['Button_1']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_1']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_1 = input}} onPress={this.Button_1_onPress} />
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
