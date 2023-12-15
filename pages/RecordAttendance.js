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
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import OreButton from 'react-native-oreopscomponent/components/OreButton';
import OreFlatList from 'react-native-oreopscomponent/components/OreFlatList';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';
import OreImage from 'react-native-oreopscomponent/components/OreImage';
import OreTextBox from 'react-native-oreopscomponent/components/OreTextBox';
import OreCustomList from './RecordAttendance_List';
 
import {PropertyJson,Nanojson,Paramjson, Datamodel, GlobalVariables} from './RecordAttendance_Config'; 
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
 
export default class RecordAttendance extends Component {
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
		DATA:PropertyJson['Flat_2']["Property"]["data"], 
		text:''
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
			var dev=await Orefuncs.GetDeviceInfo("Device_UniqueID")
			await OreApibinding.ModelSave(this, "O433357", "API#O433356#1#homeres").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			await OreApibinding.ModelSave(this, "O433819", "API#O433809#1#Locationres").then((response) => {
				if(response == undefined || response.status == false){
				this.setState({ spinner: false });
					return;
				}
			})
			var Locationdata;
			await Orefuncs.GetLocalStorageDirect("location").then((response) => {
				if(response == undefined)
				{
				 Locationdata="";
				}
				else{
					Locationdata = response;
				}
			});
			Orefuncs.SetText("Location", this.state, Locationdata)
			Orefuncs.SetText("Text_15", this.state, Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "Locationres","formatted_address").then((res) => { return res.data })))
			Orefuncs.SetValue("TextBox_1", this.state, Locationdata)
			Orefuncs.SetValue("TextBox_2", this.state, await Orefuncs.GetValue("Text_15", this.state))
			Orefuncs.SetValue("TextBox_3", this.state, dev)
			OreAlert.alert("Location", (Locationdata).toString());
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","attstatus").then((res) => { return res.data })) == 20 || Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","attstatus").then((res) => { return res.data })) == 30)
			{
				Orefuncs.SetText("Button_1", this.state, "Check In")
				await OreApibinding.SetDataBinding(this,"Flat_2")
			}
			else
			{
				Orefuncs.SetText("Button_1", this.state, "Check Out")
				await OreApibinding.SetDataBinding(this,"Flat_2")
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
		Orefuncs.NavigateTo(this.props.navigation,'Homepage')
	}
	/* OreHeader : Header_1; */
	Header_1_righticon1press= async ()=>{
		Orefuncs.NavigateTo(this.props.navigation,'Settings')
	}
	/* OreHeader : Header_1; */
	Header_1_righticon2press= async ()=>{
		 Orefuncs.NavigateTo(this.props.navigation, 'Settings')
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
		
		try {
			/*OreAlert.alert("Alert", (Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "homeres","attstatus").then((res) => { return res.data }))).toString());*/
			var dev=await Orefuncs.GetDeviceInfo("Device_UniqueID")
			Orefuncs.SetValue("TextBox_3", this.state, dev)
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","mobdevid").then((res) => { return res.data })) == "")
			{
				OreAlert.alert("Aleart", ("Please Activate Your devcice").toString());
			}
			else
			{
				if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","mobdevid").then((res) => { return res.data })) == dev)
				{
					await OreApibinding.ModelSave(this, "O433902", "API#O433345#5#locationcheck").then((response) => {
						if(response == undefined || response.status == false){
						this.setState({ spinner: false });
							return;
						}
					})
					if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433902","Status").then((res) => { return res.data })) == true)
					{
						if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","attstatus").then((res) => { return res.data })) == 30 || Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433357","attstatus").then((res) => { return res.data })) == 20)
						{
							var directValue = 10
							var response = OreApibinding.ModelSetFieldDir(this, "O433915", "attstatus", directValue);
							if(response == undefined || response.status == false){
								this.setState({ spinner: false });
								OreAlert.alert("Model Set Failed", response.data);
								return;
							}
							var directValue = dev
							var response = OreApibinding.ModelSetFieldDir(this, "O433915", "psMobDevid", directValue);
							if(response == undefined || response.status == false){
								this.setState({ spinner: false });
								OreAlert.alert("Model Set Failed", response.data);
								return;
							}
							var ctrlValue = await Orefuncs.GetValue("Text_15", this.state)
							var response = OreApibinding.ModelSetFieldDir(this, "O433915", "formatted_address", ctrlValue);
							if(response == undefined || response.status == false){
								this.setState({ spinner: false });
								OreAlert.alert("Model Set Failed", response.data);
								return;
							}
							await OreApibinding.ModelSave(this, "O433914", "API#O433356#4#SavedataRes").then((response) => {
								if(response == undefined || response.status == false){
								this.setState({ spinner: false });
									return;
								}
							})
							OreAlert.alert("Status", ("Checked in successfully").toString());
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
							var directValue = 20
							var response = OreApibinding.ModelSetFieldDir(this, "O433915", "attstatus", directValue);
							if(response == undefined || response.status == false){
								this.setState({ spinner: false });
								OreAlert.alert("Model Set Failed", response.data);
								return;
							}
							await OreApibinding.ModelSave(this, "O433914", "API#O433356#4#SavedataRes").then((response) => {
								if(response == undefined || response.status == false){
								this.setState({ spinner: false });
									return;
								}
							})
							OreAlert.alert("Status", ("Checked out successfully").toString());
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
						OreAlert.alert("All", ("Location is Not Valid").toString());
					}
				}
				else
				{
					OreAlert.alert("Aleart", ("This device is not register").toString());
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


	/* OreTextBox : TextBox_1; */
	TextBox_1_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_1']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreTextBox : TextBox_2; */
	TextBox_2_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_2']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		}
		
	/* OreTextBox : TextBox_3; */
	TextBox_3_onChangeText=(evt)=>{
		this.state.orepageproperty['TextBox_3']["Property"]["value"]= evt;
		this.setState({orepageproperty: this.state.orepageproperty});
		OreApibinding.GetValue(this);
		}
		
	/* OreListView : Flat_2; */
	Flat_2_onLoad= async (item, index)=>{
	}
	/* OreListView : Flat_2; */
	Flat_2_onPress= async (item, index)=>{
		Orefuncs.SetLocalStorage("Flat_2_O433277",item);
		
		
	}
	/* OreListView : Flat_2; */
	Flat_2_onLongPress= async (item, index)=>{
		
		}
	/* OreListView : Flat_2; */
	Flat_2_onRefresh=async()=>{

		this.state.orepageproperty["Flat_2"]["Property"]["isrefreshing"] = true;

		let selectedItem = this.state.orepageproperty["Flat_2"]["Property"]["selectedItem"];

		let selectedKeys = this.state.orepageproperty["Flat_2"]["Property"]["selectedKeys"];
		selectedItem.length = 0;
		if(selectedKeys){
		selectedKeys.length = 0;;
		this.state.orepageproperty["Flat_2"]["Property"]["selectedKeys"] = selectedKeys;
		this.setState({ orepageproperty: this.state.orepageproperty });
		}
			this.state.orepageproperty["Flat_2"]["Property"]["selectcount"] = 0;

		this.state.orepageproperty["Flat_2"]["Property"]["selectedItem"] = selectedItem;

		this.state.orepageproperty["Flat_2"]["Property"]["data"] = [];

		this.state.orepageproperty["Flat_2"]["Property"]["data1"] = [];

		this.state.orepageproperty["Flat_2"]["Property"]["offset"] = 0;
		if(this.state.orepageproperty["Flat_2"]["Property"]["onDemandLoading"]){
		this.state.orepageproperty["Flat_2"]["Property"]["scrollComplete"] = false; }

		this.state.orepageproperty["Flat_2"]["Property"]["searchValue"] = "";

		this.setState({ orepageproperty: this.state.orepageproperty });

		await OreApibinding.AutoBind(this);

		this.state.orepageproperty["Flat_2"]["Property"]["isrefreshing"] = false;

		this.setState({ orepageproperty: this.state.orepageproperty });
		
		
	}
	/* OreListView : Flat_2; */
	Flat_2_onRender= (item, indexindex, controlName, type)=>{
		
		
	}
	/* OreListView : Flat_2; */
	Flat_2onPress_Swipe=async(item, index, iconCode)=>{

		switch (iconCode) {
		}
		}
	SearchFilterFunctionFlat_2=(text) =>{
		const textData = text.toLowerCase();
		this.state.orepageproperty['Flat_2']["Property"]["searchValue"]= text;
		this.setState({orepageproperty: this.state.orepageproperty});
		if (!this.state.orepageproperty['Flat_2']["Property"]["onDemandSearch"]) {
		 const newData = this.state.orepageproperty['Flat_2']["Property"]["data1"].filter(item => {
		return Object.keys(item).some(key =>
		JSON.stringify(item).toString().toLowerCase().includes(textData) 
		);
		});
		if(newData != ""){
			this.state.orepageproperty['Flat_2']["Property"]["data"]= newData; 
			}else{
			this.state.orepageproperty['Flat_2']["Property"]["data"]= newData;
			
		}
		if(text == ""){
			this.state.orepageproperty['Flat_2']["Property"]["data"]= this.state.orepageproperty['Flat_2']["Property"]["data1"];}
}
	}
onChangedemandFlat_2=async()=>{
		if(!this.state.orepageproperty['Flat_2']["Property"]["searchtextlength"] || this.state.orepageproperty['Flat_2']["Property"]["searchValue"].trim().length == 0 || this.state.orepageproperty['Flat_2']["Property"]["searchtextlength"] <=0 || this.state.orepageproperty['Flat_2']["Property"]["searchValue"].length >= this.state.orepageproperty['Flat_2']["Property"]["searchtextlength"]){
		var modelCode = this.state.orepageproperty['Flat_2']["Property"]["datamodelsearch"];
		if (modelCode != undefined && modelCode != null && modelCode != '') {
		modelCode = modelCode.split('#')[0]; 
		await OreApibinding.SearchModelSet(this, modelCode , this.state.orepageproperty['Flat_2']["Property"]["datafieldsearch"], this.state.orepageproperty['Flat_2']["Property"]["searchValue"]);
		var controlname = 'Flat_2';
		this.state.orepageproperty['Flat_2'].Property.contentLoader = 'flex';
		OreApibinding.SetDataBinding(this, controlname, "Flat");}
		}
		else
		{alert("Please enter minimum of "+this.state.orepageproperty['Flat_2']["Property"]["searchtextlength"]+ " Characters")
		}
		}
onEndReachedFlat_2=()=>{
		setTimeout(async() => {
		if (this.state.orepageproperty['Flat_2']["Property"]["onDemandLoading"] && this.state.orepageproperty['Flat_2']["Property"]["fromApi"]) {
		var modelCode = this.state.orepageproperty['Flat_2']["Property"]["datamodelpagination"];
		if (modelCode != undefined && modelCode != null && modelCode != '') {
		modelCode = modelCode.split('#')[0];
		await OreApibinding.SearchModelSet(this, modelCode, this.state.orepageproperty['Flat_2']["Property"]["datafieldpagination"], this.state.orepageproperty['Flat_2']['Property']['offset']);
		var controlname =  'Flat_2';
		OreApibinding.SetDataBinding(this, controlname, "Flat");
		}
		}else{
		const datatest = this.state.orepageproperty['Flat_2']["Property"]["data1"].slice((this.state.orepageproperty['Flat_2']['Property']['offset'] * this.state.orepageproperty['Flat_2']['Property']['load']),((this.state.orepageproperty['Flat_2']['Property']['offset'] + 1) * this.state.orepageproperty['Flat_2']['Property']['load']))
		this.state.orepageproperty['Flat_2']["Property"]["data"] = [...this.state.orepageproperty['Flat_2']["Property"]["data"], ...datatest]
		this.state.orepageproperty['Flat_2']['Property']['offset'] = this.state.orepageproperty['Flat_2']['Property']['offset'] + 1;
		if (this.state.orepageproperty['Flat_2']["Property"]["data"].length == this.state.orepageproperty['Flat_2']["Property"]["data1"].length){
		this.state.orepageproperty['Flat_2']["Property"]["scrollComplete"] = true}
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
 	 		<View >
				<OreHeader title={this.state.orepageproperty['Header_1']["Property"]["title"]} lefticon={this.state.orepageproperty['Header_1']["Property"]["lefticon"]}  lefticonsize={this.state.orepageproperty['Header_1']["Property"]["lefticonsizevalue"]}          style={this.state.orepageproperty['Header_1']["styles"]} textstyle={this.state.orepageproperty['Header_1']["textstyle"]} disabled={this.state.orepageproperty['Header_1']["Property"]["disabled"]}  lefticontype={this.state.orepageproperty['Header_1']["Property"]["lefticontype"]}    placement={this.state.orepageproperty['Header_1']["Property"]["textAlign"]} lefticonnpmtype={this.state.orepageproperty['Header_1']["Property"]["lefticonnpmtype"]} righticon1npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon1npmtype"]} righticon2npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon2npmtype"]} righticon3npmtype={this.state.orepageproperty['Header_1']["Property"]["righticon3npmtype"]} lefticonpress={this.Header_1_lefticonpress}righticon1press={this.Header_1_righticon1press}righticon2press={this.Header_1_righticon2press}/>
			</View> 
			<ScrollView  style = {{ overflow: "scroll" }} >
			<SafeAreaView style={{flex: 1}}>
				<Spinner visible={this.state.spinner} />
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={{ flexGrow: 1 }}>
					 
				<View style ={ { height:Oreframework.getH(320,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_2']["styles"]}  title={this.state.orepageproperty['Text_2']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_2']["Property"]["disabled"]} property={this.state.orepageproperty['Text_2']["Property"]} numberOfLines={this.state.orepageproperty['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_3']["styles"]}  title={this.state.orepageproperty['Text_3']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_3']["Property"]["disabled"]} property={this.state.orepageproperty['Text_3']["Property"]} numberOfLines={this.state.orepageproperty['Text_3']["Property"]["numberOfLines"]} />
					<OreText style={this.state.orepageproperty['Text_4']["styles"]}  title={this.state.orepageproperty['Text_4']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_4']["Property"]["disabled"]} property={this.state.orepageproperty['Text_4']["Property"]} numberOfLines={this.state.orepageproperty['Text_4']["Property"]["numberOfLines"]} />
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} viewStyle={this.state.orepageproperty['Icon_2']["viewStyle"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(51.6875,318,560), width: Oreframework.getW(47.2875,318,560), top: Oreframework.getH(205.2,318,560), left: Oreframework.getW(6.9125,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_2']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_2']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_2']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_2']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_2']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_2']["styles"]} inputRef={(input) => {this.Icon_2 = input}} disabled={this.state.orepageproperty['Icon_2']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_2']["Property"]["iconnpmtype"]} /></View>}
					<OreText style={this.state.orepageproperty['Location']["styles"]}  title={this.state.orepageproperty['Location']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Location']["Property"]["disabled"]} property={this.state.orepageproperty['Location']["Property"]} numberOfLines={this.state.orepageproperty['Location']["Property"]["numberOfLines"]} />
					<OreButton controlid='50007' controlname='Button_1' disabled={this.state.orepageproperty['Button_1']["Property"]["disabled"]} style={this.state.orepageproperty['Button_1']["styles"]} property={this.state.orepageproperty['Button_1']["Property"]} textstyle={this.state.orepageproperty['Button_1']["textstyle"]} title={this.state.orepageproperty['Button_1']["Default"]["txtctrlcaption"]} activeOpacity={this.state.orepageproperty['Button_1']["Property"]["activeOpacity"]} inputRef={(input) => {this.Button_1 = input}} onPress={this.Button_1_onPress} />
					<OreText style={this.state.orepageproperty['Text_6']["styles"]}  title={this.state.orepageproperty['Text_6']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_6']["Property"]["disabled"]} property={this.state.orepageproperty['Text_6']["Property"]} numberOfLines={this.state.orepageproperty['Text_6']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_2']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_2']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_2']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_2']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_2']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_15']["styles"]}  title={this.state.orepageproperty['Text_15']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_15']["Property"]["disabled"]} property={this.state.orepageproperty['Text_15']["Property"]} numberOfLines={this.state.orepageproperty['Text_15']["Property"]["numberOfLines"]} />
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_4']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_4']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_4']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_4']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_4']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_4']["styles"]} viewStyle={this.state.orepageproperty['Icon_4']["viewStyle"]} inputRef={(input) => {this.Icon_4 = input}} disabled={this.state.orepageproperty['Icon_4']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_4']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(47.8375,318,560), width: Oreframework.getW(46.8375,318,560), top: Oreframework.getH(14.387500000000003,318,560), left: Oreframework.getW(29.0875,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_4']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_4']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_4']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_4']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_4']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_4']["styles"]} inputRef={(input) => {this.Icon_4 = input}} disabled={this.state.orepageproperty['Icon_4']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_4']["Property"]["iconnpmtype"]} /></View>}
					<OreImage style={this.state.orepageproperty['Image_1']["styles"]}  source={this.state.orepageproperty['Image_1']["Property"]["type"]=='Asset' && this.state.orepageproperty['Image_1']["Property"]["assetlink"]!=require('../') ? this.state.orepageproperty['Image_1']["Property"]["assetlink"]:{uri:this.state.orepageproperty['Image_1']["Property"]["source"]}} disabled={this.state.orepageproperty['Image_1']["Property"]["disabled"]} imageStyle={this.state.orepageproperty['Image_1']["imageStyle"]} activeOpacity={1} blurRadius={0} resizeMode={'stretch'}  asset={this.state.orepageproperty['Image_1']["Property"]["assetlink"]} property={this.state.orepageproperty['Image_1']["Property"]} uri={this.state.orepageproperty['Image_1']["Property"]["source"]}/>
					<OreText style={this.state.orepageproperty['Text_16']["styles"]}  title={this.state.orepageproperty['Text_16']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_16']["Property"]["disabled"]} property={this.state.orepageproperty['Text_16']["Property"]} numberOfLines={this.state.orepageproperty['Text_16']["Property"]["numberOfLines"]} />
					<OreShapes style={this.state.orepageproperty['Rectangle_3']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_3']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_3']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_3']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_3']["Property"]}/>
					<OreTextBox style={this.state.orepageproperty['TextBox_1']["styles"]} type={this.state.orepageproperty['TextBox_1']["Property"]["type"]} value={this.state.orepageproperty['TextBox_1']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_1']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_1']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_1']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_1']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_1']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_1']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_1']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_1']["Property"]} disabled={this.state.orepageproperty['TextBox_1']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_1']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_1']["viewstyle"]} title={this.state.orepageproperty['TextBox_1']["title"]} inputRef={(input) => {this.TextBox_1 = input}} onChangeText={this.TextBox_1_onChangeText} />
					<OreTextBox style={this.state.orepageproperty['TextBox_2']["styles"]} type={this.state.orepageproperty['TextBox_2']["Property"]["type"]} value={this.state.orepageproperty['TextBox_2']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_2']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_2']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_2']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_2']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_2']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_2']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_2']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_2']["Property"]} disabled={this.state.orepageproperty['TextBox_2']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_2']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_2']["viewstyle"]} title={this.state.orepageproperty['TextBox_2']["title"]} inputRef={(input) => {this.TextBox_2 = input}} onChangeText={this.TextBox_2_onChangeText} />
					<OreTextBox style={this.state.orepageproperty['TextBox_3']["styles"]} type={this.state.orepageproperty['TextBox_3']["Property"]["type"]} value={this.state.orepageproperty['TextBox_3']["Property"]["value"]}  secureTextEntry={this.state.orepageproperty['TextBox_3']["Property"]["secureTextEntry"]} keyboardType={this.state.orepageproperty['TextBox_3']["Property"]["keyboardType"]} placeholder={this.state.orepageproperty['TextBox_3']["Property"]["placeHolder"]} placeholderTextColor={this.state.orepageproperty['TextBox_3']["Property"]["placeHolderTextColor"]} multiline={this.state.orepageproperty['TextBox_3']["Property"]["multiline"]} numberOfLines={this.state.orepageproperty['TextBox_3']["Property"]["numOfLines"]} maxLength={this.state.orepageproperty['TextBox_3']["Property"]["maxLength"]} property={this.state.orepageproperty['TextBox_3']["Property"]} disabled={this.state.orepageproperty['TextBox_3']["Property"]["disabled"]} textstyle={this.state.orepageproperty['TextBox_3']["textstyle"]} viewstyle={this.state.orepageproperty['TextBox_3']["viewstyle"]} title={this.state.orepageproperty['TextBox_3']["title"]} inputRef={(input) => {this.TextBox_3 = input}} onChangeText={this.TextBox_3_onChangeText} />
				</View>
				<View style ={ { height:Oreframework.getH(75,318,560)} }>
					<OreText style={this.state.orepageproperty['Text_8']["styles"]}  title={this.state.orepageproperty['Text_8']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_8']["Property"]["disabled"]} property={this.state.orepageproperty['Text_8']["Property"]} numberOfLines={this.state.orepageproperty['Text_8']["Property"]["numberOfLines"]} />
					{Platform.OS == "ios" ? <OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} viewStyle={this.state.orepageproperty['Icon_3']["viewStyle"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} />:<View style={{ height: Oreframework.getH(41.5375,318,560), width: Oreframework.getW(42.5375,318,560), top: Oreframework.getH(36.66,318,560), left: Oreframework.getW(263.188,318,560), position:'absolute', alignItems: 'center' }}><OreIcon icon={this.state.orepageproperty['Icon_3']["Property"]["icon"]} iconColor={this.state.orepageproperty['Icon_3']["Property"]["iconcolor"]} iconSize={this.state.orepageproperty['Icon_3']["Property"]["size"]} activeOpacity={0.5} type={this.state.orepageproperty['Icon_3']["Property"]["type"]}  iconType={this.state.orepageproperty['Icon_3']["Property"]["iconType"]} style={this.state.orepageproperty['Icon_3']["styles"]} inputRef={(input) => {this.Icon_3 = input}} disabled={this.state.orepageproperty['Icon_3']["Property"]["disabled"]} iconnpmtype={this.state.orepageproperty['Icon_3']["Property"]["iconnpmtype"]} /></View>}
					<OreShapes style={this.state.orepageproperty['Rectangle_1']["styles"]} viewStyle={this.state.orepageproperty['Rectangle_1']["viewStyle"]} imageStyle={this.state.orepageproperty['Rectangle_1']["imageStyle"]} source={{uri:this.state.orepageproperty['Rectangle_1']["Property"]["source"]}}  property={this.state.orepageproperty['Rectangle_1']["Property"]}/>
					<OreText style={this.state.orepageproperty['Text_17']["styles"]}  title={this.state.orepageproperty['Text_17']["Default"]["txtctrlcaption"]} disabled={this.state.orepageproperty['Text_17']["Property"]["disabled"]} property={this.state.orepageproperty['Text_17']["Property"]} numberOfLines={this.state.orepageproperty['Text_17']["Property"]["numberOfLines"]} />
				</View>
				<View style ={ { height:Oreframework.getH(273,318,560),overflow :"hidden"} }>
					<OreFlatList  horizontal ={this.state.orepageproperty['Flat_2']["Property"]["isHorizontal"]} searchTextStyle  = {this.state.orepageproperty['Flat_2']["searchTextStyle"]} searchViewStyle = {this.state.orepageproperty['Flat_2']["searchViewStyle"]} source ={{uri:this.state.orepageproperty['Flat_2']["Property"]["source"]}}  viewStyle = {this.state.orepageproperty['Flat_2']["viewStyle"]} imageStyle = {this.state.orepageproperty['Flat_2']["imageStyle"]}    dataSource = {this.state.orepageproperty['Flat_2']["Property"]["data"]} disabled ={this.state.orepageproperty['Flat_2']["Property"]["disabled"]} searchValue ={this.state.orepageproperty['Flat_2']["Property"]["searchValue"]} property={PropertyJson['Flat_2']["Property"]} swipeEvents = {this.state.orepageproperty['Flat_2']["swipeEvents"]} searchevt = {text => this.onChangedemandFlat_2(text)} onChangeTextSearch = {text => this.SearchFilterFunctionFlat_2(text)} searchIconClose = {()=>this.SearchFilterFunctionFlat_2('')}               dynamicComponent={OreCustomList} dynamicComponentType={this.state.orepageproperty['Flat_2']["Property"]["dynamicComponentStyle"]} onLoad={this.Flat_2_onLoad.bind(this)}onPress={this.Flat_2_onPress.bind(this)}onLongPress={this.Flat_2_onLongPress.bind(this)}onRefresh={this.Flat_2_onRefresh.bind(this)} onRender={this.Flat_2_onRender.bind(this)} onPress_Swipe ={this.Flat_2onPress_Swipe.bind(this)} onEndReached={this.onEndReachedFlat_2.bind(this)}  />
				</View>	
				</KeyboardAvoidingView>
			</SafeAreaView>
			</ScrollView > 
			
		</ImageBackground >

   );
  }
 }
