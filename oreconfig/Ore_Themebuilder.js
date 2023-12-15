/**
 * OREOPS Mobile library v1.0.0 (https://www.oreops.com) 
 * Copyright 2021 OREOPS Framework Pvt Ltd. All rights reserved.
 * Module Name : Themebuilder
 * Module Description : Runtime theme change will be handled using below functions
 */
import { OreStyleLight, OreLightGlobal } from 'react-native-oreopscomponent/components/OreStyle/OreStyleLight';
import { OreStyleDark, OreDarkGlobal } from 'react-native-oreopscomponent/components/OreStyle/OreStyleDark'
import { OreStyleGreen, OreGreenGlobal } from 'react-native-oreopscomponent/components/OreStyle/OreStyleGreen'
import AppConfig from '../AppConfig.json'
//Global Methods 
const orethemebuilder = {
    getStylePath() {
        let data = 'react-native-oreopscomponent/components/OreStyle/OreStyleLight'
        let themecss = AppConfig[1].Settings.Theme
        if (themecss == undefined || themecss == null) {
            themecss = 'blue'
        }
        switch (themecss) {
            case 'blue':
                data = OreStyleLight
                break;
            case 'dark':
                data = OreStyleDark
                break;
            case 'green':
                data = OreStyleGreen
                break;
        }
        return data;
    },

    getPropertyPath() {
        let data = 'react-native-oreopscomponent/components/OreStyle/OreStyleLight'
        let themecss = AppConfig[1].Settings.Theme
        if (themecss == undefined || themecss == null) {
            themecss = 'blue'
        }
        switch (themecss) {
            case 'blue':
                data = OreLightGlobal
                break;
            case 'dark':
                data = OreDarkGlobal
                break;
            case 'green':
                data = OreGreenGlobal
                break;
        }
        return data;
    }
}

export default orethemebuilder;