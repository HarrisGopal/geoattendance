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
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreFlatList from 'react-native-oreopscomponent/components/OreFlatList';
import OreCustomList from './ProductWise_List';
 
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './ProductWise_Config'; 
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
 
export default class ProductWise extends Component {
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
		DATA:PropertyJson['Flat_1']["Property"]["data"], 
		text:''
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
	
	/* OreIcon : Icon_2; */
	Icon_2_onPress=()=>{
		Orefuncs.NavigateTo(this.props.navigation,'AdminParameterPage')
	}
	/* OreListView : Flat_1; */
	Flat_1_onLoad= async (item, index)=>{
	}
	/* OreListView : Flat_1; */
	Flat_1_onPress= async (item, index)=>{
		OreApibinding.ModelSet(this,'O434106',item);
Orefuncs.SetLocalStorage("Flat_1_O433948",item);
		
		Orefuncs.NavigateTo(this.props.navigation, 'EmployeeWiseAdmin')
	}
	
	/* OreListView : Flat_1; */
	Flat_1_onLongPress= async (item, index)=>{
		
		}
	/* OreListView : Flat_1; */
	Flat_1_onRefresh=async()=>{

		this.state.orepageproperty["Flat_1"]["Property"]["isrefreshing"] = true;

		let selectedItem = this.state.orepageproperty["Flat_1"]["Property"]["selectedItem"];

		let selectedKeys = this.state.orepageproperty["Flat_1"]["Property"]["selectedKeys"];
		selectedItem.length = 0;
		if(selectedKeys){
		selectedKeys.length = 0;;
		this.state.orepageproperty["Flat_1"]["Property"]["selectedKeys"] = selectedKeys;
		this.setState({ orepageproperty: this.state.orepageproperty });
		}
			this.state.orepageproperty["Flat_1"]["Property"]["selectcount"] = 0;

		this.state.orepageproperty["Flat_1"]["Property"]["selectedItem"] = selectedItem;

		this.state.orepageproperty["Flat_1"]["Property"]["data"] = [];

		this.state.orepageproperty["Flat_1"]["Property"]["data1"] = [];

		this.state.orepageproperty["Flat_1"]["Property"]["offset"] = 0;
		if(this.state.orepageproperty["Flat_1"]["Property"]["onDemandLoading"]){
		this.state.orepageproperty["Flat_1"]["Property"]["scrollComplete"] = false; }

		this.state.orepageproperty["Flat_1"]["Property"]["searchValue"] = "";

		this.setState({ orepageproperty: this.state.orepageproperty });

		await OreApibinding.AutoBind(this);

		this.state.orepageproperty["Flat_1"]["Property"]["isrefreshing"] = false;

		this.setState({ orepageproperty: this.state.orepageproperty });
		
		
	}
	/* OreListView : Flat_1; */
	Flat_1_onRender= (item, indexindex, controlName, type)=>{
		
		
	}
	/* OreListView : Flat_1; */
	Flat_1onPress_Swipe=async(item, index, iconCode)=>{

		switch (iconCode) {
		}
		}
	SearchFilterFunctionFlat_1=(text) =>{
		const textData = text.toLowerCase();
		this.state.orepageproperty['Flat_1']["Property"]["searchValue"]= text;
		this.setState({orepageproperty: this.state.orepageproperty});
		if (!this.state.orepageproperty['Flat_1']["Property"]["onDemandSearch"]) {
		 const newData = this.state.orepageproperty['Flat_1']["Property"]["data1"].filter(item => {
		return Object.keys(item).some(key =>
		JSON.stringify(item).toString().toLowerCase().includes(textData) 
		);
		});
		if(newData != ""){
			this.state.orepageproperty['Flat_1']["Property"]["data"]= newData; 
			}else{
			this.state.orepageproperty['Flat_1']["Property"]["data"]= newData;
			
		}
		if(text == ""){
			this.state.orepageproperty['Flat_1']["Property"]["data"]= this.state.orepageproperty['Flat_1']["Property"]["data1"];}
}
	}
onChangedemandFlat_1=async()=>{
		if(!this.state.orepageproperty['Flat_1']["Property"]["searchtextlength"] || this.state.orepageproperty['Flat_1']["Property"]["searchValue"].trim().length == 0 || this.state.orepageproperty['Flat_1']["Property"]["searchtextlength"] <=0 || this.state.orepageproperty['Flat_1']["Property"]["searchValue"].length >= this.state.orepageproperty['Flat_1']["Property"]["searchtextlength"]){
		var modelCode = this.state.orepageproperty['Flat_1']["Property"]["datamodelsearch"];
		if (modelCode != undefined && modelCode != null && modelCode != '') {
		modelCode = modelCode.split('#')[0]; 
		await OreApibinding.SearchModelSet(this, modelCode , this.state.orepageproperty['Flat_1']["Property"]["datafieldsearch"], this.state.orepageproperty['Flat_1']["Property"]["searchValue"]);
		var controlname = 'Flat_1';
		this.state.orepageproperty['Flat_1'].Property.contentLoader = 'flex';
		OreApibinding.SetDataBinding(this, controlname, "Flat");}
		}
		else
		{alert("Please enter minimum of "+this.state.orepageproperty['Flat_1']["Property"]["searchtextlength"]+ " Characters")
		}
		}
onEndReachedFlat_1=()=>{
		setTimeout(async() => {
		if (this.state.orepageproperty['Flat_1']["Property"]["onDemandLoading"] && this.state.orepageproperty['Flat_1']["Property"]["fromApi"]) {
		var modelCode = this.state.orepageproperty['Flat_1']["Property"]["datamodelpagination"];
		if (modelCode != undefined && modelCode != null && modelCode != '') {
		modelCode = modelCode.split('#')[0];
		await OreApibinding.SearchModelSet(this, modelCode, this.state.orepageproperty['Flat_1']["Property"]["datafieldpagination"], this.state.orepageproperty['Flat_1']['Property']['offset']);
		var controlname =  'Flat_1';
		OreApibinding.SetDataBinding(this, controlname, "Flat");
		}
		}else{
		const datatest = this.state.orepageproperty['Flat_1']["Property"]["data1"].slice((this.state.orepageproperty['Flat_1']['Property']['offset'] * this.state.orepageproperty['Flat_1']['Property']['load']),((this.state.orepageproperty['Flat_1']['Property']['offset'] + 1) * this.state.orepageproperty['Flat_1']['Property']['load']))
		this.state.orepageproperty['Flat_1']["Property"]["data"] = [...this.state.orepageproperty['Flat_1']["Property"]["data"], ...datatest]
		this.state.orepageproperty['Flat_1']['Property']['offset'] = this.state.orepageproperty['Flat_1']['Property']['offset'] + 1;
		if (this.state.orepageproperty['Flat_1']["Property"]["data"].length == this.state.orepageproperty['Flat_1']["Property"]["data1"].length){
		this.state.orepageproperty['Flat_1']["Property"]["scrollComplete"] = true}
		}
		this.setState({ orepageproperty: this.state.orepageproperty });
		}, 1500);
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
				<View style ={ { height:Oreframework.getH(63,318,560)} }>
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} viewStyle={this.state.orepageproperty['Icon_1']["viewStyle"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(32,318,560), width: Oreframework.getW(35,318,560), top: Oreframework.getH(11,318,560), left: Oreframework.getW(7,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_1']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_1']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_1']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_1']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_1']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_1']["styles"]} inputRef={(input) => {this.Icon_1 = input}} disabled={this.state.orepageproperty['Icon_1']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_1']["Property"]["iconnpmtype"]} /></View>}
					<OreText style={this.state.orepageproperty['Text_1']["styles"]}  title={this.state.orepageproperty['Text_1']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_1']["Property"]["disabled"]} property={this.state.orepageproperty['Text_1']["Property"]} numberOfLines={this.state.orepageproperty['Text_1']["Property"]["numberOfLines"]} />
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} viewStyle={this.state.orepageproperty['Icon_2']["viewStyle"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} onPress={this.Icon_2_onPress}/>:<View style={{ height: Oreframework.getH(32,318,560), width: Oreframework.getW(35,318,560), top: Oreframework.getH(12,318,560), left: Oreframework.getW(7,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} onPress={this.Icon_2_onPress}/></View>}
				</View>
				<View>
					<OreFlatList  horizontal ={this.state.orepageproperty['Flat_1']["Property"]["isHorizontal"]} searchTextStyle  = {this.state.orepageproperty['Flat_1']["searchTextStyle"]} searchViewStyle = {this.state.orepageproperty['Flat_1']["searchViewStyle"]} source ={{uri:this.state.orepageproperty['Flat_1']["Property"]["source"]}}  viewStyle = {this.state.orepageproperty['Flat_1']["viewStyle"]} imageStyle = {this.state.orepageproperty['Flat_1']["imageStyle"]}    dataSource = {this.state.orepageproperty['Flat_1']["Property"]["data"]} disabled ={this.state.orepageproperty['Flat_1']["Property"]["disabled"]} searchValue ={this.state.orepageproperty['Flat_1']["Property"]["searchValue"]} property={PropertyJson['Flat_1']["Property"]} swipeEvents = {this.state.orepageproperty['Flat_1']["swipeEvents"]} searchevt = {text => this.onChangedemandFlat_1(text)} onChangeTextSearch = {text => this.SearchFilterFunctionFlat_1(text)} searchIconClose = {()=>this.SearchFilterFunctionFlat_1('')}               dynamicComponent={OreCustomList} dynamicComponentType={this.state.orepageproperty['Flat_1']["Property"]["dynamicComponentStyle"]} onLoad={this.Flat_1_onLoad.bind(this)}onPress={this.Flat_1_onPress.bind(this)} onLongPress={this.Flat_1_onLongPress.bind(this)}onRefresh={this.Flat_1_onRefresh.bind(this)} onRender={this.Flat_1_onRender.bind(this)} onPress_Swipe ={this.Flat_1onPress_Swipe.bind(this)} onEndReached={this.onEndReachedFlat_1.bind(this)}  />
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
