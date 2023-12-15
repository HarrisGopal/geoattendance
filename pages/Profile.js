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
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './Profile_Config'; 
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
 
export default class Profile extends Component {
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
	
	/* OreIcon : Icon_2; */
	Icon_2_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
	}
	/* OreIcon : Icon_3; */
	Icon_3_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
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
				<View style ={ { height:Oreframework.getH(294,318,560)} }>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} viewStyle={this.state.orepageproperty['Icon_2']["viewStyle"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} onPress={this.Icon_2_onPress}/>:<View style={{ height: Oreframework.getH(24.625,318,560), width: Oreframework.getW(37.625,318,560), top: Oreframework.getH(162,318,560), left: Oreframework.getW(2,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} onPress={this.Icon_2_onPress}/></View>}
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} viewStyle={this.state.orepageproperty['Icon_3']["viewStyle"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} onPress={this.Icon_3_onPress}/>:<View style={{ height: Oreframework.getH(24.625,318,560), width: Oreframework.getW(37.625,318,560), top: Oreframework.getH(10,318,560), left: Oreframework.getW(2,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} onPress={this.Icon_3_onPress}/></View>}
					<View style={{ height: Oreframework.getH(31.6719,318,560), width: Oreframework.getW(31.6719,318,560), top: Oreframework.getH(6,318,560), left: Oreframework.getW(5.69885,318,560), position:'absolute', alignItems: 'center' }}><OreShapes style={this.state.orepageproperty['Square_1']["styles"]} viewStyle={this.state.orepageproperty['Square_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Square_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Square_1']["Property"]["source"]}}  property={this.state.orepageproperty['Square_1']["Property"]}/></View>
					<OreText style={this.state.orepageproperty['Text_1']["styles"]}  title={this.state.orepageproperty['Text_1']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_1']["Property"]["disabled"]} property={this.state.orepageproperty['Text_1']["Property"]} numberOfLines={this.state.orepageproperty['Text_1']["Property"]["numberOfLines"]} />
					<OreImage style={this.state.orepageproperty['Image_1']["styles"]}  source={this.state.orepageproperty['Image_1']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_1']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_1']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_1']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_1']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_1']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'contain'}  asset={this.state.orepageproperty['Image_1']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_1']["Property"]} uri={this.state.orepageproperty['Image_1']["Property"]["source"]}/>
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_3']["styles"]}  title={this.state.orepageproperty['Text_3']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_3']["Property"]["disabled"]} property={this.state.orepageproperty['Text_3']["Property"]} numberOfLines={this.state.orepageproperty['Text_3']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_4']["styles"]}  title={this.state.orepageproperty['Text_4']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_4']["Property"]["disabled"]} property={this.state.orepageproperty['Text_4']["Property"]} numberOfLines={this.state.orepageproperty['Text_4']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_5']["styles"]}  title={this.state.orepageproperty['Text_5']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_5']["Property"]["disabled"]} property={this.state.orepageproperty['Text_5']["Property"]} numberOfLines={this.state.orepageproperty['Text_5']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_6']["styles"]}  title={this.state.orepageproperty['Text_6']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_6']["Property"]["disabled"]} property={this.state.orepageproperty['Text_6']["Property"]} numberOfLines={this.state.orepageproperty['Text_6']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_1']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_1']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_1']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_7']["styles"]}  title={this.state.orepageproperty['Text_7']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_7']["Property"]["disabled"]} property={this.state.orepageproperty['Text_7']["Property"]} numberOfLines={this.state.orepageproperty['Text_7']["Property"]["numberOfLines"]} />
				</View>
				<View style ={ { height:Oreframework.getH(324,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_8']["styles"]}  title={this.state.orepageproperty['Text_8']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_8']["Property"]["disabled"]} property={this.state.orepageproperty['Text_8']["Property"]} numberOfLines={this.state.orepageproperty['Text_8']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_9']["styles"]}  title={this.state.orepageproperty['Text_9']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_9']["Property"]["disabled"]} property={this.state.orepageproperty['Text_9']["Property"]} numberOfLines={this.state.orepageproperty['Text_9']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_10']["styles"]}  title={this.state.orepageproperty['Text_10']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_10']["Property"]["disabled"]} property={this.state.orepageproperty['Text_10']["Property"]} numberOfLines={this.state.orepageproperty['Text_10']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_11']["styles"]}  title={this.state.orepageproperty['Text_11']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_11']["Property"]["disabled"]} property={this.state.orepageproperty['Text_11']["Property"]} numberOfLines={this.state.orepageproperty['Text_11']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_12']["styles"]}  title={this.state.orepageproperty['Text_12']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_12']["Property"]["disabled"]} property={this.state.orepageproperty['Text_12']["Property"]} numberOfLines={this.state.orepageproperty['Text_12']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_13']["styles"]}  title={this.state.orepageproperty['Text_13']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_13']["Property"]["disabled"]} property={this.state.orepageproperty['Text_13']["Property"]} numberOfLines={this.state.orepageproperty['Text_13']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_14']["styles"]}  title={this.state.orepageproperty['Text_14']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_14']["Property"]["disabled"]} property={this.state.orepageproperty['Text_14']["Property"]} numberOfLines={this.state.orepageproperty['Text_14']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_15']["styles"]}  title={this.state.orepageproperty['Text_15']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_15']["Property"]["disabled"]} property={this.state.orepageproperty['Text_15']["Property"]} numberOfLines={this.state.orepageproperty['Text_15']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_16']["styles"]}  title={this.state.orepageproperty['Text_16']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_16']["Property"]["disabled"]} property={this.state.orepageproperty['Text_16']["Property"]} numberOfLines={this.state.orepageproperty['Text_16']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_17']["styles"]}  title={this.state.orepageproperty['Text_17']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_17']["Property"]["disabled"]} property={this.state.orepageproperty['Text_17']["Property"]} numberOfLines={this.state.orepageproperty['Text_17']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_18']["styles"]}  title={this.state.orepageproperty['Text_18']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_18']["Property"]["disabled"]} property={this.state.orepageproperty['Text_18']["Property"]} numberOfLines={this.state.orepageproperty['Text_18']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_19']["styles"]}  title={this.state.orepageproperty['Text_19']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_19']["Property"]["disabled"]} property={this.state.orepageproperty['Text_19']["Property"]} numberOfLines={this.state.orepageproperty['Text_19']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_22']["styles"]}  title={this.state.orepageproperty['Text_22']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_22']["Property"]["disabled"]} property={this.state.orepageproperty['Text_22']["Property"]} numberOfLines={this.state.orepageproperty['Text_22']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_23']["styles"]}  title={this.state.orepageproperty['Text_23']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_23']["Property"]["disabled"]} property={this.state.orepageproperty['Text_23']["Property"]} numberOfLines={this.state.orepageproperty['Text_23']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_24']["styles"]}  title={this.state.orepageproperty['Text_24']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_24']["Property"]["disabled"]} property={this.state.orepageproperty['Text_24']["Property"]} numberOfLines={this.state.orepageproperty['Text_24']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_25']["styles"]}  title={this.state.orepageproperty['Text_25']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_25']["Property"]["disabled"]} property={this.state.orepageproperty['Text_25']["Property"]} numberOfLines={this.state.orepageproperty['Text_25']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_26']["styles"]}  title={this.state.orepageproperty['Text_26']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_26']["Property"]["disabled"]} property={this.state.orepageproperty['Text_26']["Property"]} numberOfLines={this.state.orepageproperty['Text_26']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_27']["styles"]}  title={this.state.orepageproperty['Text_27']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_27']["Property"]["disabled"]} property={this.state.orepageproperty['Text_27']["Property"]} numberOfLines={this.state.orepageproperty['Text_27']["Property"]["numberOfLines"]} />
				</View>
				<View style ={ { height:Oreframework.getH(307,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_28']["styles"]}  title={this.state.orepageproperty['Text_28']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_28']["Property"]["disabled"]} property={this.state.orepageproperty['Text_28']["Property"]} numberOfLines={this.state.orepageproperty['Text_28']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_32']["styles"]}  title={this.state.orepageproperty['Text_32']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_32']["Property"]["disabled"]} property={this.state.orepageproperty['Text_32']["Property"]} numberOfLines={this.state.orepageproperty['Text_32']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_33']["styles"]}  title={this.state.orepageproperty['Text_33']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_33']["Property"]["disabled"]} property={this.state.orepageproperty['Text_33']["Property"]} numberOfLines={this.state.orepageproperty['Text_33']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_34']["styles"]}  title={this.state.orepageproperty['Text_34']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_34']["Property"]["disabled"]} property={this.state.orepageproperty['Text_34']["Property"]} numberOfLines={this.state.orepageproperty['Text_34']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_35']["styles"]}  title={this.state.orepageproperty['Text_35']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_35']["Property"]["disabled"]} property={this.state.orepageproperty['Text_35']["Property"]} numberOfLines={this.state.orepageproperty['Text_35']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_36']["styles"]}  title={this.state.orepageproperty['Text_36']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_36']["Property"]["disabled"]} property={this.state.orepageproperty['Text_36']["Property"]} numberOfLines={this.state.orepageproperty['Text_36']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_3']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_3']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_3']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_3']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_3']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_37']["styles"]}  title={this.state.orepageproperty['Text_37']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_37']["Property"]["disabled"]} property={this.state.orepageproperty['Text_37']["Property"]} numberOfLines={this.state.orepageproperty['Text_37']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_38']["styles"]}  title={this.state.orepageproperty['Text_38']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_38']["Property"]["disabled"]} property={this.state.orepageproperty['Text_38']["Property"]} numberOfLines={this.state.orepageproperty['Text_38']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_39']["styles"]}  title={this.state.orepageproperty['Text_39']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_39']["Property"]["disabled"]} property={this.state.orepageproperty['Text_39']["Property"]} numberOfLines={this.state.orepageproperty['Text_39']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_40']["styles"]}  title={this.state.orepageproperty['Text_40']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_40']["Property"]["disabled"]} property={this.state.orepageproperty['Text_40']["Property"]} numberOfLines={this.state.orepageproperty['Text_40']["Property"]["numberOfLines"]} />
				</View>
				<View style ={ { height:Oreframework.getH(237,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_41']["styles"]}  title={this.state.orepageproperty['Text_41']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_41']["Property"]["disabled"]} property={this.state.orepageproperty['Text_41']["Property"]} numberOfLines={this.state.orepageproperty['Text_41']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_42']["styles"]}  title={this.state.orepageproperty['Text_42']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_42']["Property"]["disabled"]} property={this.state.orepageproperty['Text_42']["Property"]} numberOfLines={this.state.orepageproperty['Text_42']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_43']["styles"]}  title={this.state.orepageproperty['Text_43']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_43']["Property"]["disabled"]} property={this.state.orepageproperty['Text_43']["Property"]} numberOfLines={this.state.orepageproperty['Text_43']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_44']["styles"]}  title={this.state.orepageproperty['Text_44']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_44']["Property"]["disabled"]} property={this.state.orepageproperty['Text_44']["Property"]} numberOfLines={this.state.orepageproperty['Text_44']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_45']["styles"]}  title={this.state.orepageproperty['Text_45']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_45']["Property"]["disabled"]} property={this.state.orepageproperty['Text_45']["Property"]} numberOfLines={this.state.orepageproperty['Text_45']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_46']["styles"]}  title={this.state.orepageproperty['Text_46']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_46']["Property"]["disabled"]} property={this.state.orepageproperty['Text_46']["Property"]} numberOfLines={this.state.orepageproperty['Text_46']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_49']["styles"]}  title={this.state.orepageproperty['Text_49']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_49']["Property"]["disabled"]} property={this.state.orepageproperty['Text_49']["Property"]} numberOfLines={this.state.orepageproperty['Text_49']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_50']["styles"]}  title={this.state.orepageproperty['Text_50']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_50']["Property"]["disabled"]} property={this.state.orepageproperty['Text_50']["Property"]} numberOfLines={this.state.orepageproperty['Text_50']["Property"]["numberOfLines"]} />
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
