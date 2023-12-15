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

import { PropertyJson } from './EmployeeReportPage_Config'; 
import OreText from 'react-native-oreopscomponent/components/OreText';


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
				 <TouchableOpacity activeOpacity={PropertyJson['Flat_1']['Property']['activeOpacity']?PropertyJson['Flat_1']['Property']['activeOpacity']:1}  onPress={() => props.onPress(item, index)} onLongPress={() => props.onLongPress(item, index)} style ={[ { height:Oreframework.getH(244.2,318,560)}, { borderColor: GlobalCSS.color.borderColor }, PropertyJson['Flat_1']['listViewItemStyle'],PropertyJson['Flat_1']['listViewItemStyle'] ? PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != undefined && PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != '' && PropertyJson['Flat_1']['listViewItemStyle'].borderStyle != 'solid' ? PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != undefined &&PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != "" && PropertyJson['Flat_1']['listViewItemStyle'].borderRadius != 0 ?null : { borderRadius: 1 } : { borderStyle: 'solid' } : null,((dex > -1) ? {backgroundColor: PropertyJson['Flat_1']['Property']['selectedBGColor'] ? PropertyJson['Flat_1']['Property']['selectedBGColor'] : GlobalCSS.color.borderColor, margin : 5} : null) ,(PropertyJson['Flat_1']['Property']['isSeparator'] && PropertyJson['Flat_1']['Property']['sep_size']) ? (PropertyJson['Flat_1']['Property']['flatListType'] == '1' && index == 0) ? { } : (PropertyJson['Flat_1']['Property']['flatListType'] == '1' && index != 0) ? { borderTopWidth: (PropertyJson['Flat_1']['Property']['sep_size'] / 2), borderColor: PropertyJson['Flat_1']['Property']['sep_color']} : (PropertyJson['Flat_1']['Property']['flatListType'] == '2' && index == 0) ? { } : (PropertyJson['Flat_1']['Property']['flatListType'] == '2' && index != 0) ? { borderLeftWidth: PropertyJson['Flat_1']['Property']['sep_size'] / 2 , borderColor: PropertyJson['Flat_1']['Property']['sep_color']} : (PropertyJson['Flat_1']['Property']['flatListType'] == '3') ? { borderWidth: PropertyJson['Flat_1']['Property']['sep_size'] / 2, borderColor: PropertyJson['Flat_1']['Property']['sep_color'] } : null : null]}>
					<OreText style={[PropertyJson['Text_2']["styles"], props.onRender(item, index, 'Text_2', "styles")]}  title={PropertyJson['Text_2']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_2']["Property"]["disabled"]} property={PropertyJson['Text_2']["Property"]} numberOfLines={PropertyJson['Text_2']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_3']["styles"], props.onRender(item, index, 'Text_3', "styles")]}  title={PropertyJson['Text_3']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_3']["Property"]["disabled"]} property={PropertyJson['Text_3']["Property"]} numberOfLines={PropertyJson['Text_3']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_4']["styles"], props.onRender(item, index, 'Text_4', "styles")]}  title={PropertyJson['Text_4']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_4']["Property"]["disabled"]} property={PropertyJson['Text_4']["Property"]} numberOfLines={PropertyJson['Text_4']["Property"]["numberOfLines"]} />
					<OreText style={[PropertyJson['Text_5']["styles"], props.onRender(item, index, 'Text_5', "styles")]}  title={PropertyJson['Text_5']["Default"]["txtctrlcaption"]} disabled={PropertyJson['Text_5']["Property"]["disabled"]} property={PropertyJson['Text_5']["Property"]} numberOfLines={PropertyJson['Text_5']["Property"]["numberOfLines"]} />
					
		</TouchableOpacity></Swipeable>
	)
			break;

    }
  }
}
//#endregion
export default OreCustomList;