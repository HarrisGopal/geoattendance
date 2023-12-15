import React, { Component, useState } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet, TextInput, Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import OreIcon from 'react-native-oreopscomponent/components/OreIcon';
import { Avatar } from 'react-native-elements';
import orethemebuilder from '../oreconfig/Ore_Themebuilder';
let OreStyle = orethemebuilder.getStylePath()
let GlobalCSS = orethemebuilder.getPropertyPath()

import Oreframework from 'react-native-oreopscore/components/OreOPS/general/Ore_Framework';
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';

import { PropertyJson } from './EmployeeWiseAdmin_Config'; 
import OreText from 'react-native-oreopscomponent/components/OreText';
import OreShapes  from 'react-native-oreopscomponent/components/OreShapes';


//Global name from IDE for each controls
const OreControlType = { 
    	Flat_1:"Flat_1"
}

//Global Methods 
const OreCustomList = {
  //Method for find runtime height & width for page and control
  getDesign(name, props, item, index) {
	
	const Swipe = () => {
			if (props.property.swipeStyle == "icon") {
				/// Icon Only ///
				return (
					<View style={{ flexDirection: "row", justifyContent: "flex-end", backgroundColor: (props.property.swipeColor ? props.property.swipeColor : GlobalCSS.color.primaryColor) }}>
						{(props.swipeEvents != undefined) ? props.swipeEvents.map((item, index, array) => {
							return <OreIcon
								style={{ justifyContent: "center", marginRight: 10, margin: 10, }}
								icon={item.mnuicon}
								iconnpmtype={item.iconnpmtype}
								iconType={props.property.swipe_icontype ? props.property.swipe_icontype : 'regular'}
								iconSize={props.property.swipe_iconsize ? props.property.swipe_iconsize : 25}
								iconColor={item.bgcolor ?item.bgcolor : GlobalCSS.color.labelFontColor}
								onPress={() => props.onPress_Swipe(item, index, item.rnumber)} />
						}) : null}
					</View>
				);
			} else if (props.property.swipeStyle == "text") {
				/// Text Only ///
				return (
					<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: (props.property.swipeColor ? props.property.swipeColor : GlobalCSS.color.primaryColor) }}>
						{(props.swipeEvents != undefined) ? props.swipeEvents.map((item, index, array) => {
							return <Text
								numberOfLines={1}
								style={{ justifyContent: "center", marginRight: 10, margin: 10, color: props.property.swipe_iconcolor ? props.property.swipe_iconcolor : GlobalCSS.color.labelFontColor }}
								onPress={() => props.onPress_Swipe(item, index, item.rnumber)}>{item.ctrlcapt}</Text>
						}) : null}
					</View>
				);
			} else if (props.property.swipeStyle == "icontext") {
				/// Icon and Text ///
				return (
					<View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", backgroundColor: (props.property.swipeColor ? props.property.swipeColor : GlobalCSS.color.primaryColor) }}>
						{(props.swipeEvents != undefined) ? props.swipeEvents.map((item, index, array) => {
							return <TouchableOpacity onPress={() => props.onPress_Swipe(item, index, item.rnumber)}>
								<OreIcon
									style={{ justifyContent: "center", marginRight: 10, margin: 10, }}
									icon={item.mnuicon}
									iconnpmtype={item.iconnpmtype}
									iconType={props.property.swipe_icontype ? props.property.swipe_icontype : 'regular'}
									iconSize={props.property.swipe_iconsize ? props.property.swipe_iconsize : 25}
									iconColor={item.bgcolor ? item.bgcolor : GlobalCSS.color.labelFontColor}
								/>
								<Text
									numberOfLines={1}
									style={{ justifyContent: "center", marginRight: 10, margin: 10, color: props.property.swipe_iconcolor ? props.property.swipe_iconcolor : GlobalCSS.color.labelFontColor }}
								>{item.ctrlcapt}</Text>
							</TouchableOpacity>
						}) : null}
					</View>
				);
			}
		}
    switch (name) {
      case OreControlType.Flat_1:
		
		 var selectedItems = props.property.selectedItem;
		
		 if (!selectedItems || selectedItems == undefined || selectedItems == {} || selectedItems == '' || selectedItems == null) {
		selectedItems = []
		}
		var dex = selectedItems.findIndex((selectedItem) => selectedItem === index);
		props.onLoad(item, index);
		return (

		
				 <Swipeable key={item.code} renderRightActions={props.property.swipeEvents ? Swipe : null} renderLeftActions={props.property.swipeEvents ? Swipe : null} >
				 <TouchableOpacity activeOpacity={PropertyJson['Flat_1']['Property']['activeOpacity']?PropertyJson['Flat_1']['Property']['activeOpacity']:1}  onPress={() => props.onPress(item, index)} onLongPress={() => props.onLongPress(item, index)} style ={[ { height:Oreframework.getH(189.425,318,560)}, { borderColor: GlobalCSS.color.borderColor }, PropertyJson['Flat_1']['listViewItemStyle'],PropertyJson['Flat_1']['listViewItemStyle'] ? PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != undefined && PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != '' && PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != 'solid' ? PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != undefined &&PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != "" && PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != 0 ?null : { borderRadius: 1 } : { borderStyle: 'solid' } : null,((dex > -1) ? {backgroundColor: PropertyJson['Flat_1']['Property']['selectedBGColor'] ? PropertyJson['Flat_1']['Property']['selectedBGColor'] : GlobalCSS.color.borderColor, margin : 5} : null) ,(PropertyJson['Flat_1']['Property']['isSeparator'] && PropertyJson['Flat_1']['Property']['sep_size']) ? (PropertyJson['Flat_1']['Property']['flatListType'] == '1' && index == 0) ? { } : (PropertyJson['Flat_1']['Property']['flatListType'] == '1' && index != 0) ? { borderTopWidth: (PropertyJson['Flat_1']['Property']['sep_size'] / 2), borderColor: PropertyJson['Flat_1']['Property']['sep_color']} : (PropertyJson['Flat_1']['Property']['flatListType'] == '2' && index == 0) ? { } : (PropertyJson['Flat_1']['Property']['flatListType'] == '2' && index != 0) ? { borderLeftWidth: PropertyJson['Flat_1']['Property']['sep_size'] / 2 , borderColor: PropertyJson['Flat_1']['Property']['sep_color']} : (PropertyJson['Flat_1']['Property']['flatListType'] == '3') ? { borderWidth: PropertyJson['Flat_1']['Property']['sep_size'] / 2, borderColor: PropertyJson['Flat_1']['Property']['sep_color'] } : null : null]}>
					<OreText style={[PropertyJson['Text_2']["styles"], props.onRender(item, index, 'Text_2', "styles")]}  title={Orefuncs.getdatafromobjectorarrayusingstringpath(item,PropertyJson['Text_2']["Property"]["datafield"])} disabled={PropertyJson['Text_2']["Property"]["disabled"]} property={PropertyJson['Text_2']["Property"]} numberOfLines={PropertyJson['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_3']["styles"], props.onRender(item, index, 'Text_3', "styles")]}  title={PropertyJson['Text_3']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_3']["Property"]["disabled"]} property={PropertyJson['Text_3']["Property"]} numberOfLines={PropertyJson['Text_3']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_4']["styles"], props.onRender(item, index, 'Text_4', "styles")]}  title={Orefuncs.getdatafromobjectorarrayusingstringpath(item,PropertyJson['Text_4']["Property"]["datafield"])} disabled={PropertyJson['Text_4']["Property"]["disabled"]} property={PropertyJson['Text_4']["Property"]} numberOfLines={PropertyJson['Text_4']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_5']["styles"], props.onRender(item, index, 'Text_5', "styles")]}  title={Orefuncs.getdatafromobjectorarrayusingstringpath(item,PropertyJson['Text_5']["Property"]["datafield"])} disabled={PropertyJson['Text_5']["Property"]["disabled"]} property={PropertyJson['Text_5']["Property"]} numberOfLines={PropertyJson['Text_5']["Property"]["numberOfLines"]} />
					<View style={{ height: Oreframework.getH(61.4125,318,560), width: Oreframework.getWN(61.4125,318,560), top: Oreframework.getH(37.8889,318,560), left: Oreframework.getWN(12.8889,318,560), position:'absolute', alignItems: 'center' }}><OreShapes style={[PropertyJson['Square_1']["styles"], props.onRender(item, index, 'Square_1', "styles")]} viewStyle={PropertyJson['Square_1']["viewStyle"]} imageStyle={PropertyJson['Square_1']["imageStyle"]} source={{uri:PropertyJson['Square_1']["Property"]["source"]}}  property={PropertyJson['Square_1']["Property"]}/></View>
					<View style={{ height: Oreframework.getH(61.4125,318,560), width: Oreframework.getWN(61.4125,318,560), top: Oreframework.getH(108.528,318,560), left: Oreframework.getWN(12.8889,318,560), position:'absolute', alignItems: 'center' }}><OreShapes style={[PropertyJson['Square_2']["styles"], props.onRender(item, index, 'Square_2', "styles")]} viewStyle={PropertyJson['Square_2']["viewStyle"]} imageStyle={PropertyJson['Square_2']["imageStyle"]} source={{uri:PropertyJson['Square_2']["Property"]["source"]}}  property={PropertyJson['Square_2']["Property"]}/></View>
					<OreText style={[PropertyJson['Text_6']["styles"], props.onRender(item, index, 'Text_6', "styles")]}  title={PropertyJson['Text_6']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_6']["Property"]["disabled"]} property={PropertyJson['Text_6']["Property"]} numberOfLines={PropertyJson['Text_6']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_7']["styles"], props.onRender(item, index, 'Text_7', "styles")]}  title={Orefuncs.getdatafromobjectorarrayusingstringpath(item,PropertyJson['Text_7']["Property"]["datafield"])} disabled={PropertyJson['Text_7']["Property"]["disabled"]} property={PropertyJson['Text_7']["Property"]} numberOfLines={PropertyJson['Text_7']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_8']["styles"], props.onRender(item, index, 'Text_8', "styles")]}  title={Orefuncs.getdatafromobjectorarrayusingstringpath(item,PropertyJson['Text_8']["Property"]["datafield"])} disabled={PropertyJson['Text_8']["Property"]["disabled"]} property={PropertyJson['Text_8']["Property"]} numberOfLines={PropertyJson['Text_8']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_9']["styles"], props.onRender(item, index, 'Text_9', "styles")]}  title={PropertyJson['Text_9']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_9']["Property"]["disabled"]} property={PropertyJson['Text_9']["Property"]} numberOfLines={PropertyJson['Text_9']["Property"]["numberOfLines"]} />
					
		</TouchableOpacity></Swipeable>
	)
			break;

    }
  }
}
//#endregion
export default OreCustomList;