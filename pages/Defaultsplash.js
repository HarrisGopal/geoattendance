import React, { Component, useRef } from 'react';
import { StyleSheet, AppRegistry, Text, View, Animated, Image, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Orefuncs from 'react-native-oreopscore/components/OreOPS/general/Ore_GlobalMethods';
import {OreAlert,OreConfirmationAlert} from 'react-native-oreopscomponent/components/OreAlert';
import Oreframework from 'react-native-oreopscore/components/OreOPS/general/Ore_Framework';
import OreApibinding from '../databinding/Ore_Databinding';
import Spinner from 'react-native-loading-spinner-overlay';
import {PropertyJson,Nanojson,Paramjson, Datamodel} from './Defaultsplash_Config'; 

const commonParams = {
  "logoassetlink": require('../assets/Library/Media/CompanyLogo.png'),
  "logotype": "Path",
  "logosource": "https://studiocdn.sterlo.io/V1/img/identity/productlogo.png",
  "bgassetlink": require('../assets/Library/Media/CompanyLogo.png'),
  "bgtype": "URL",
  "timeoutDuration": 3000,
  "navigateTo": "Index",
  "networkCheck": true,
  "networkMessage": "Please check the network connection and try again.",
  "displayType": "style1",
  "animation": true,
  "animationType": "fade",
  "animationDuration": 2000,
  "backgroundColor": "#ffffff"
}

const styleParams = {
  "logotype": "Path",
  "bgtype": "URL",
  "logosource": "https://studiocdn.sterlo.io/V1/img/identity/productlogo.png",
  "bgassetlink": "assets/Library/Media/CompanyLogo.png",
  "logoassetlink": "assets/Library/Media/CompanyLogo.png",
  "timeoutDuration": 3000,
  "navigateTo": "Index",
  "networkCheck": true,
  "networkMessage": "Please check the network connection and try again.",
  "displayType": "default",
  "animation": true,
  "animationType": "fade",
  "animationDuration": 2000,
  "logoWidth": 310,
  "logoHeight": 50,
  "color": "#000000",
  "backgroundColor": "#ffffff",
  "justifyContent": "center",
  "fontSize": Oreframework.normalize(20),
  "fontWeight": "normal",
  "paddingTop": Oreframework.getH(50),
  "formvalidation": false,
  "immediatevalidation": false,
  "position": "absolute",
  "overall": 560.8,
  "assetlink": "assets/Library/Media/CompanyLogo.png",
  "assetimage64": "data:image/png;base64,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UmVhZHlxyWU8AAADcWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmNmOTZjZTUzLTk4NTEtYTU0Ny1hMjc1LTQ2YTcxMzRkYTM3ZCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NEJCMDEzODJGRTQxMUVDOEYwN0JFMUUyQjQwNUU1QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NEJCMDEzNzJGRTQxMUVDOEYwN0JFMUUyQjQwNUU1QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2Y5NmNlNTMtOTg1MS1hNTQ3LWEyNzUtNDZhNzEzNGRhMzdkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmNmOTZjZTUzLTk4NTEtYTU0Ny1hMjc1LTQ2YTcxMzRkYTM3ZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkHc0G8AADWzSURBVHjaYvj//z8DNfBzQ7PHxKhjoJaF39asiyRGHQtj4hqgtYwMMPB/fjCYo1e9//+lVkcwmzFx7X+Gf/8YGJiYGLABkB6uLf+W/Q9mWA4y7//8ELg+kBxYP1wxzKsJQIVQtsG8M/+1ZlwD82cduJc4e/edYqzBg6QHxobR9p0H94nnb34OFotfDVfHgs3FYuw3Gb4wCzIcfybtlLbg3DyYr4kBBysdbBkjlv9n4GSDhxYDIyPctxhhlL4h+78AyyWGo3GejJZSfPvQ5UtXXe7AZ6GdmvARkGUM338hhfl/uOUYPpwZMJURPX5Q4uDXH4buMN0KfJYaKQqcOVvnbAoXgPoQzASHMR0BPEh//PjBB2O3NjeeQVe4beuWGmT+58+fJNHVTJ08aQvCjKaL2CwECCC6+pCJGoZ8X7shkhh1LCgJAZo49JuP/r9Yaw3JtElAeZCKP3+BqpkZPkzzFxDI2vgBruE3UJyVmQGS2SFJHqwveuX/XG+NiZN338lHyewMsav+H73z1hqWIbXnXvuvNfHC/1WnnwSuOPE4nNiM/vH7Hz6G2JX/sWV+rBndZ8Wc/9tCItTD1p+5GdZzfd2/FRHMxAYnHwfzJwZmZoY1Z54GgbILPGFAQ48FW4kix8dz60S8AyNDPKLsI9bChgCtutCpJ9b+XxrOiF4Wo1hWvVX//7zAiygGa4pzX0WOV0IW1/trNjesudyEkuQHInODk35XR9tRED2hr3cniN6yeVMDMJNuBrGnT5uyAaY4Pzf7DYz97dtXfhBdXFTwFtnARQsXzIMHaX3tdWQ5gACie7GFDzyTVf4PKlOlHt1hpIZ5GBU5tkoaxtYp2P5vWYGlpZ6CwEl0dfJFW+8/ev9DAUXw52+G/8siGJHTCVYALBv+LwljlHbpgtgJUh+54j8DBytDPTCBNwDTHUZRCzUPo5LCFXOMcav/MzAzMRytcbSxUhY6iqxQa/rV30y/frMw/vrNsCJGy0RbkvssSqEGrEL/r4hECSXZgi2Pnnz4Ift/QQgjLofhEwcVfAxsLAw32t3V1SV4buFUB+KDyio0e1iIiV6XZRu/C/FwsMjxi1w+++KvLshjStOu/ef695dBTISfYUuWiampggBGhfh4go8cJckKVBwxJqz+r1G58ybcI0nYAwbcRIhdjSiFFocyEvRc8oaWT8KsLBy/WbgYPn97qFtjaVELEr+XpcUonLvp7bsvv4Xylp6feLza0ZoW+fD/glBGkIfAscMISbNYi09QzAE9RHTMNe6Ofs3P8pd3uu9CXjZm9i/o8m8n+wmzJa75deLOOyuQ5eK8bC8e9fvIsTEz/g6femL5qrNPI0COudTsqqsrw3eFbA/OC2aEJX+c9QJQdPOF5344PVfkqdbJwAQsrQQ4nrz5ek+t3nWpKCGLf80PYYOxZx+8nySau+n1t19/uWIs5BaBHIVNT5GHaicp4jAP3n39TQmfvgM3X1uhxSaisdHc1HC2pKjgKYz/6tUrZRj7wvnzATD2v3//mJH1TZzQtwNIgwunzZs21oHoDevXNX/+9EkUvUGTnZn+7evXL4Iw/oH9+9Nu3rxhg2pe/3Zkfklx4TMYu7G+7iqMXVdbfQtZ3ffv3/nhHc3nz9UBAmhQ1XO/TpyyYWRj/clqZHh60DSWqQH+3rqt9SY8+jAjIyPVzCTJc8euvHSjlef+PHigKNjXHcWsIH+XWmay4G05/PvH8H8honjNmn1254WJXhhB+/LTTzGJ9PUvQS0KZL1zk00TkuwUFq46/TQ0fNqJVfhaQZKbfix6//Wv0EyRj6lp9oJzYEU/tkIJ1tFfnW0RvPDYw7gt55/7YyaFf8THnHbLsb//BXgYLj3+ZIYSOvGr/0jkb0F4DNTNApXZTEwMyfPPLmAMX05epgYNGgB1brzw3BdDDjSoAPRyiIn0OrwxB6s3Pv34y8efueEjyETYIA9KaAnyMv37+YshavG1k1eqLMDyrVtuVPxlYgL3vC4C6zI9tLoMVDfNybFMDDOVXh0Ga2FEAZtU7CwMahK8N262u2nijM0VkUzA2PsXMOHoJuRmlUD2xvcg2kpF+AhMKYgANtG0gE206yQ3v0wXnvjJzMXF8IeDh4GR4zfDuWffrI2kuI5eefJRZ3uRjcuf3/9ENSR4b2Grm3AaSrjc+M/wF5gKgN3QLz//8vCwM4MbER+//REA0UerHGwJ5jliPMfF/IaNlZGLYW+cI+/2u+9Dtjz4HB6+7t4Rrv+cDJ49B6P/LwwjvYgjIrHe7vVRVi3bfpc3ac1nUDuzZv3VRpA4KyPDb3S1GmXbr8HNBDXi10QTbluGrJ71lZuZnUGUj+m21/Itb3/942T78oeN4XaOHaSr8Y/MooyI4FAR5boHDgU2iDNbN92oA9eH84LZMBQzIxUfLMzExRwb4ysuBmZOho/fv6j+/8fCcDQuHdVZLMzkeY7IYmZRmllM3KzTSxjjgS1+0MAw8ugkcix3eqiriHHfIrqeK9qa/56L5Q0DDxDP9o1ROIDuMahF4H4XFlC6Ev9wKjEg1lJuKTiWoSPe6H1GRMn/n5mkPMfM8ESAg5Ht/5Sg5Uw4SjRIax2YbEAd3fUF1n4BRlKbH7z5Jq+Ys+kBAycrQ8/ma+X/l4QzkpMsYSDKQm7JsuOPYhh+/sFSFf8Hu23f9VdOt158VkVOGTg913/A/Xmdy1JpXnaRZwS7I/GQHnzg5OObEHURK9gDPxeGsVGSLEFgaZppLMhz3xaGcmE0sZggoZS16PwU9Eoc7jl2FqafyF2OQoedkkRnH2grxrpl/+ET995ZSQlwPtlZYuuuJcV7AyOpe6t3MrAwMYjycrxCFs92Vp7w7dcfbj0Z/ou4Ric5WZm+o4tHmMkuUxNHrd8gUfp/cI1+0XQIHdgfEkCaEKhes3pVD3xMsK72Kow9ob9328sXL9SgEwv8IIzRevr2TRDeiZ01E9yu/PTpkzSIfv36FThvPHz40BiXw6oqyu/D2EB9ErjU7dm9qwDcUd2/Lxvmjlu3btr//v2bE8VzmzZuqEWaDeEOCQ0rgdc5qirHYOyCwmIvcQkJcLHLwcHxEYQxmn9cXO8R+YLpL6Rj/I/x0KGDabAcN2li/84HD+6boeutrqy429bRqQhid3d2HKmpqriGM3aYmf9BxocY/8HcoaamfrCro/0AQAB2rQUsqmoLn3M48wBhZpxuQCBTiiWIfqOlaJZh1k27FwkFlStqhKikluErNKQ0TFPCe28JonRlRLMSMzTMgW46KmojiqAoJijIMCAPYZ7Me9p7YMY5Zx4MRF67n+v7znfOnD37nLP3v9Zea/1r/1+r5e+Rtrlxx9SC069DVs27ID8UHz3qwsP0ffgjiGylNTrmlObCxYmmuOEhVWx845HryX3nS41I6hvD7QZYpTfbwuI+FZy8mjOjT5TIjxVNU/acrn2rtK59bLtCOxB3Q3UctkddOPeJo0tfDczy9qK1kPtcE8uC8ktFkX0aC/CKqZFdY9mTsPFQ53z9MXNTONtP8ywEVK5lZ/5cvcg6TEidHuJygPmNUBR1wyqGwsASmDItaOvXQtEMEFs905t5R5G4g8ZeRXlOCBazXG2Qj52zQyjEQLtOrTNe3T61Ry5j0icn/yuoaplMyFtcECpi1Kj3RNPgdU9EjVPpLjPBS/ayo23tCg3b3JQd99zCRWFP5Zgo+CPXUz76/trHhMTRQSRvLdmC2wmJvEu77fWb9u+z39slgRzyhCCuzIkfM9+WlzG4v5N3MRuxbBgxIsnhwWnkXMneMnK9RcWNOVAlRFmeiAGyTzo9GrJeYKj8OMwuIszFhzukWgPTNCAzaED7aRRMlR7DXTFr3KB8aF0avZFSVtc+atWB8vQzlc0vIXTcFAZoEJSKzvvW+PMHkyeNHTxQmBP/nM14EnYJ91rnnD5MeuOmqJD3yRbninwYEZx24XZ7aKGZtHKnItj8b42GvY6ZiAqRdERi7sXdFgNRaclgG60v06JGJPsy6WKnFmcvODGRYIu+k9zXfiNSkjLZphZJluoOzfCIQzWVKMyu9HoEhRss4BkAqAVpWFVyKLHOCBk/D+r9b1fpEOOBGJfNf262kOeGY3regjHxTsmMbrLNLD2Rbs4szizD1vKrfm2SD7MooDsugRtJyM8CCkejxR1UWRQHzIk6dyaN6oZa2ARgcYeBxUWaQanaMtWGxPtdRLozuSNTPhNbcKbSC29F3PF7iNFNjowPHPAT6klFDIwBiNJzAPJ2Yd3R7sFQc0ub35scFnxnCMcHGcbxRp4f6iuW82YyevPOfYtD3+wJtL7SUj3Jjc1TgiBY5t+STh1zxPriK+T/0WK/uQ8acB2izyP8rUGzJyqtgQoOmp2D3q9RZaNCPjj+SMENL5yK6MEjVVoMKY+PoFMwVH1XqR40p+ByKdAkn3PNmvCR/5GCjIeKiK7UItI2CUxWTFqoz5vFgXb6QEKyfgoUoYXhcfnAGaAmZCobpCNm7Dh/8Lul42ea9KO7mGFZtda/8rw/iy52rlQoMiq1+LL92gJcYmPQfgGutVMWsOSH7FsMCgDNiIODgvyFPuDe3w7sUwH3A1wHjkiBfu147cXISRyfAsv3/aPMaCma4BhypV4Swg1gVvzZUgddbjRu3koCFeLwxYbodP7NpNV5lzIsoIGpzk0InTdhKPu8K8/0ZtDuwijapsEd7588TqKWPrHy2IY7DArNBBAEzQAOta6dPco74Ny2v86e4Kjv5wmhS97ZX5bZpf1Ay5KPl2vzZlMAhro/G3imbTJm6wLjWf11RQZCwS2grQsPSntzAmefq6H+qbWTXu7Jx/UZOIVW9vgHxxPFEDQImEpnQF5/euo/53Cjk1zpv+yVIVm3WxWDM/i/rjaBBzSWknBIC5cDUVakH1hSGp3156YUX6pokI6GfuPIionh07i+hQ/Sx9nl3AlLY9d7osb4H9w0I2T9Q8GcqHQydlpRRLMHiDrHPTk9M2rksqV9ec5ns0eugQc6p2tbnglAcB6UVHjfD5gi0+5UEzp5DCWT6EjE5hM/1GVGcjhs9/oH6ePsggfHQutyAVwOsyx/yfhZPaaQOgPV2scFreVf6zGP6+3HafQK5v4LCwo3//1Ev+mteR/mNbEsePyGn87L5FoGQu2OxCBYuO1yAnOhDTHclNTI4Zv+F1GlI1HyZnl4xOcr2Ux62+WPXn3WlT50ipu610N4RDL3v1xpkIaM9GdU/pHvcJjHwRqJRNLhZ68N1lkUCgXbIROm11Mdtd26VROqVqm8CEGOROInl8u8u99HsAetVmtTYmxtbRnc1NQ0jHxfrVZ72RkfZqWkdkv2NTXV4wwGg9PVB4z3Mau5sck3NRq1p/naGjTrWhkhsu/stNS9dDqdO2El1OtpcE7gQe4nl8sfr6+v5zoE7rP0rcVMJkv8r+0ZReS2X86fiwUTSj8lECwmt61LXlNbUnLmLRuubmdWPjwPGRIopNHpMgLtxWSK8/bydsH3kT1QcRF/hfXvutrasUV8/nJfX98bNgl53t5dRIXo8NNqNHRwf6dSqWBBwK3bV69MugvPgYFDf8EwzGk0S6VSO2uqq18ASsdoa2t7krA8KhWPaTQa97SNG8rI/TLStwnsPW/b1i0WFkpw8sRC67aSM6fjZFKpD9wwSgKblZX5xVcBAQHlmOOotEs7lyeteM02R0SNLBZLXFx0fJX1/S9zdu3/ZMvWpya+FJadvGYVIVBYkLAwFgyCr1QqWeWXy8Jt+WoD5uA7CBbY3NIc+Ebk9I3bM9L5LjwDValVjLnz5iemrFt3E0MxQoK/KPHtaKAYy8HED0x6790OZ8BRKBQlrNB+tX/fF/7+/gSGJI/Hy/b09GpJSf1w9NmzJXHkb2psbAy+d48INp1GbwcyiH/8x5UvvDiRRxoz5objKoOBuGNJJKofnpi4JBbuPv5NAPauBKqJqwu/mazsCCIIKCCi4AZSUPurUMF9a6vVWhek1YL6a+VHrfVUpWj9rbVUXFBRsIqVYm1FFK11twoogoKIAioiSwiasiQhZJ//vUBCMhlWoT+c4z1nTnJm5i3zvnn33nffvXfeyrhmqGrFF8dFZ5Pn2ZUWMrpa395upFKRRMIutbKvw3uYd9mNVPwtSvrEcRkiVIHWhektcFRyVVxH6+p97DRWeTOrfLqvR+/kbogbZhG1ez7AG7AjlF0TuDfxOVnq43TU1pzNpbq2POrOuRPrfccM79/85isVveJLrA5efx6UnM2dUcQTOcoUSpaZAaPa08E8A7YZO9Xd5iJVuS2JuV+11fVBTTZm7IogX6ef6mRK9k6mmwNQRw/JlWCzuv4kOFZaOu4AG5Nn80bY/9baNrachv2jN/Zv9QSX/WYGdH5b+z13RJ9EDEXYt5OhgLub/b1GOPXIJF/JflkzcnFk6h2FVE7kRM1odY++SXy8KfzXh1tU5i68mWJiGRjiZPEwa9vE4TSs0cufvNPdFnLva5aVFT5+OK9WZmm14gxP077WHtjRlJcBn8ZmHGurvwmisDOPN8NJEq4pqx1y3cZ+n1717uxOkXHzo++nATYT4IYsLKeYP6Kl+59whQORZT383JMtKmMzjrdk3AOPygXD6AtOKr47n7+uYwRby7cEjnaIAyKtzWtDpsoJqFWzLSG7ETQI186Ad0K7lHLymCvyxA2YGAGBAwYsMC8qvdnNw+NpJQsGrbuQp97L0htNtDuAotOUFLIGvqUbfnv0/dRdt8+9uWRrpXiYPPCQ5l7YvWXR6YdbKnMhp2KyKuJAY2qRgrWTXXa9kYyj8opak/BwX41I1miPgwI6Zom33n39rIyKyOfmxOel4xAwosFRiEbDsZwyofdQO2M9T+BcjmBQwP60n3WiftCgiGRgsrf9+S2zBoe59zHPYdIx6WuBtGdcStHCtfHZuwANaxxp+JOS91oVVBYTNCKg/lojZRZVv3Pg2vPVWqYMcGiJdyCO6QZSWRoxK1szYIcDPYNjLhUEqbduAIsGUp9XjvqXc9O72zN/vJWs3d9ZY52alIuI2RwK1MdEm5Csp7Sc9A45z+XWiK0brZ5KQMTNafGdLKiSDv0gvuAhrqz37AIN4CmlCmXupn/pqdi6Xl71r7DfQKsrV7/yndBcOwl3S+d8Enn7V9VbLJED7bwxZPo9k/PBR/vSEjUnYJ/kcXPpEF9K/5bmZJyaRn57PS0dgqWxY+JAKomdzaJUtATSXtYrkyo09Un1+6st4+B7TshjZ+H/KKucnfg0E4Pyh2CxgJLFBIhdEvAXM2DiDzi17+rM6pMPdwIjLdc8eGycOWhLS6AhmjfS/pT4+MdsUCVqFrTOolsb3vNVvZRAjYWSyeVLrKnuHb3t2m1tmT3AwTyvS63jivhiVxpWy6BhDKCAh5IOAVSgTVDkX6kEHyfkpxaEemoG+Wp2uf/G6a7hno49Mlh0XP6ionaAMYOGpzzh+Y1263mtpfZYdExCJC76x0FTzTAaJu3d04hTXi22VfM3r/CrGaURU/uQ731WXOOi0Rgh90nf5D+ySwG3MCkli01DDkMyQCMYYLCVWcodjmQ0k8kCUriYpdNpcrGcMGTTMVEOV+Q1xsv5ZWIeLyz+QaXqgSLnui2c4WF9orus0u+Hj/fsveosVz2byioE9vD9pGs7OwXEZPyk9rhGZGzIFKB1W0t1Ix9KSrBomIKO13t/dQhwHKHIGQdCFhNDfpUMIFJIQNy0EWP9fsng2RixCo5Nd/XJrxQPm3KqMLeQV+dojBMQXALI4KKzpIIHZHBdNsPjvW4DmmrBbsqqYDNpYvgy1jupMujA7/ubV/76yvc9jcZ85WmgxnkIPu/dMP8Wl0YKJYEZfPa7mOpa6AzXHREN+Rk7RMYFJZ/JYdHEgIHXqg43SxqKMSCufeJl6WXDvD0k5rZ04blHGZVioSOdqXKjrMnJLAAFecVAJlOCgfZm+d3Rppm22X+U9hrmVna5r/r/geuFwTqKF9RmB/U2aZ18Q9YVigMqLooOU05ei4QOBMGH6gcCrQ4+hxDEv+87cHtqZsw7R5KI0/nP1lqwpbDfQvCuLePi8+Ah2CRLEF2vHteLKBRu1B2B8+hjlo1MYhqCWu7y4w+i0N8Vh9MPNmJKgHNrfKZ15FLzjVllyB+HH7GRbk3IAQ2ySQaTofSNO0Kw6QagBxTKYoUcDLK0So+d5qMRyoPtzXSyouRz+K6gm1LSGp/p7+++Xb9Og0AdPJ+3InCM41EdE5ZYDqa721xoLTq25uwyqkum7MZYhTcCrkossFMoq40ZOEulkCDFREnQcTO4OFVA1mDIMKhK+mCukxGDoRNHPdPDNlk7N7JSpsC6K3AzPWzOI2A07vSQPY4Ku5KuMRrDJ4v41CuktfXRMIwo+3Gafaeu476+tD2XTZMAJiZSyTYmLlKxS5m8Cmz3nzwucc4CCzJoiHoY0qt0sl8w6UidTu+u4O1e4r1S2wymY+kXSUHoxP67O7rNdgMnkPKtZQqeWb1sE0HwkHyrAWP7Ov38x4IN2LBe9jeaK7+EZPPLfFHlHXWtcHmbeP5HJ7qEX8EX452jdIzPWmwvaKrrgc5oE2+vwfW/19Y8NqBJ60GDBw74ROyH4T1WjZyzqDUNxwR6BoNarYfFMLAy7v7+BQfT41oqezOfNwabl0BApq9Kl9YVwFs1c9BuvXGrk4HogOErOqO9dsk4kYzfUyrjWjBwNlDICTDBZdYPswbPb/P2yq1tk0aP3Xo1RWMSguDFp5csir9RuGjpJJfojTPdtjlYGqrc/GQKgpGYWfZ+4OH0uDqZ0kBlp4TzTUHDaXYhySVlkdP7/D+B2zPfPWTvuSerNbIOgjjO0/ZqW+shAIGRU6eSydvJ4h69idLNd/KvxblsugyKqToQMT3JnE03qmnPw47pb5G6Y5772vUJ2T9owCPq1eqYv4qCY268CFbZBFVyA2vMHUbKbWnbw6CsK8y6id72Fy+hLZx6Aya4stZnUlvrQDrbzN2pSc3d066NVImcby6SFPYaauN56ocZV7D2gqamL6cMiLj5td9YlYwgsxoUmYMCBpFqTZXwTaYAq/ycI++F+Y/qCsBdDB0zTZ1O36G36Qsc67wI2zazyr03Jxev8vltmJWxS05HdQJ9u4M4+Qm29EhGdOylp0EqdtNcxlg4ODaWhpy8HVPcWmP7+6cI9ljpaGf6oqhC6JQRNt67LQyyQ4BbNq7fXr5Y1hhAoUklQdDW+qeadtaDx3zmFYyO3DK+W+SfT0MuP66YyKkW2yqUBMOIRRcMsjXJ/XSM45Hgcf1iWluni7XxU52M1goCTeQmR8qAQatTZeBWvziythl17m7yH2m3+iynpzHj79aWCZ3qugNqea1uo7+1ccFbF/ROoHtF1Z7ejub3O3V2vwWue1KT85PPr7GRSBpjvjTKiURi0lTcXP11cZOsVMDn9youLvbQ1aKUDBQHJhDwrdFBbouqHqp4Nqo4utpaYU/NEkYrD6M2ofyN3IYcjk2RghTvJ5VK9cZFIZezqLVEJZPinMZziCrWTiBAsYI1tnBS6YkyVXwhwqWpD7KlpaYsfvmyaPiVy5dXa5+P/DHiDxS3FbZpYw5VuTX/WV0Or5uSz6OP6vB4rx3hINDRoGt/zADVdyH53DfwIUy0y0QfPHCaXM/2bd+mod/q6mob7fNnk85sJd+7bm1oeXZ21gz0f/26NcXk6yGrV/2N4trq6kSmqF/NfaDu1K8nI9Bv7qOcSXIIkva1/Pw83683rH9GVQ7eP4V8rqAgfywKpVKNy66IP8nXv/9u+82Gjyng2udDQ77goV/4sjk3OeNMTExe9e3r8KCqqlJnYYvjuJLJZAqhoqJXtqqysu/2HTud9+2J1HM9R8F4lpY9i1AAIYY15vCA/xUoiSaTxaplsVgCUlt66nR5OWcAmplmZmZccr/I96JgxNSUlMUq4y0pcBECbx/2TbgHg8GoY7MN+C0FNmbcu6cKwj8ed+wwjaYbs330SOzR2XPmfkkpiyi2rFB8YXPPCLkH8/WrV+gTIDplzc3Ny0pKit17WVs/bxK4y5cv/fv6tavLtTOpqge6tLRk2DB3dz1fxr17dp//Jf7EvsLCQr2gdYxiYNtl0N0bZVlUVDT8xvXrLZqSUFDksuUrPtoaHpaNkQYIzfQGPRzPevDgw6qqqmYtL0s/D5qPHsN//AQ9f0gIfm1uTs7UhF/i97TJSNKgZpAvGBoaCvr07asX3bopLNwdtiXZE7nrQpPA+fj4Hhvn53+Agt8z0EyEs+ellCQD+/XrlxawOPCz/QcPGT/MztIx2yD2UFpS4s7j8RyVSgWDYpBxClmgdy4/74mvnZ39Y05Z6VAySBR1qlbty1asnEXOD2xhYfESsXvEchlMpqilxVR/F5dbwZ8vEY6fMFEHOAjW3vCt24YsDFi89HHuIz1LCXxeBw6Ho5Pwzdm5f+qh6IM/C4VCy1cVXBc9k6JIZIqiWMky/u7dOx8bGxvzuNxyt/8J0N51gEVxtOHd642jd7ChYEVRRMEONlSi/hZi71hQsETEQqSJBTWJHdQoigErIoIoCNilKcZCEbECSofjevtn9g5FuKMIIkn4nmcf7rjdnd2Zeb8y85U2rbKNGkc8HqXcx28XOzhkqZTLJQF2g/1b92pYq0t/3BqpLZK4jRpMFV7b9lbs+X1NVbAuSqXKityJxW2d01Tzu43a6KslgR3+fhW/71vT2iPj2yRcG/3zCRi8nLDwOVKRCJFWsmsaXIhELIJGIr6to+qnf6QNN9M3LpVEwPFOug8f9KOfhS+SkDkCMRX6w4DZhxJwOCGVhOdSiThe2/Rqo1oSDstEi7S0D7EUc4i5t91+gI2JRqN8YJ2PJEelvmf1hde7HEq8um/FgAnf80nLuSJmxOO88eeT3k+/97J4cHEZV+tzslro2wRdYqoFNcvDM2VZpGBArtzHSVOdWjTUVCthlk37vyZYGESS68leH/zw/cw5OxLOfFV5tiVIIEJMumhlZ+8c+3kVrrBSqKXvGpEvZnEJn1O/VCeOANnnOth5lV2nQ18YkZTSc8v1J9lZRaZVRSm/ItA3ZDUKP8d/fEcDNXJ+c75CXhlfv9P6yBx+GY+iMAMJX4SYm+ulpW61syLgUKz6p63/7Rvx996O+m79Dezcs27DfibI8gD8CMBJEUK1gKGGkOupv8NvZBTb01VpCAoAF/2scLzrsdQrfyzu91Oz9YsUwR2IzV6xMyLdPf9TpSE2Waqlk1E4eZQR8cvkLGYLtcIe50+FB5Y/Akw4m+46d3fP7POLtYlGYs1LSXicEAvQIrew1g/elUEhVH6lBqGIlEklVpSKxBrKkpiQCTjB199RXpr3qL5dN15P/1BYaQzr+Naa93wRub93bHLG9rFdVeT1fZtsa/LEKpbesSng3hSEoWBXWyRGOnfQepnkYTewCmyQ6GQC57v2N9C4iWBM/zGLJq5n0y9FZpT8RANgk5KJWFYAmhoNiXpe5OB6Mu1KU+9/JS1/gtaK8ELCzFDx6r+e7M9nCQyxASB8hy6CQASc9P7r0sE23jcfQi1jdmBSEJAK5H+T+kQn4dmJYGKr0EgshQlqAAjzCioNrX3j7oskTV9PAMwSb+MXdze/oNJAEcDhM6irUkrub7G1gckDfsyiCU/YcAkHA9BRVPlWIyoT1/WX8pJJOEUVkhXR2iuvzkdklU1mMKmIFA6cVHY9PGhA4kSmFztIgp9e2T+7V6Ml3eW0fIcpe++GSWD9ZQiuulQK+H6wXYFY9hf0hzqDVKJOJ5XQSQQ27Bo2X0QrYQs0S1kCDawvoMs8zEmmqN+kcrWUSkLOPHw/90x01lzH0aZnQpdZzRbCOjdcYcMSnEK1CbYhree5+Q2IiwHvxuaJ6M01wYC6mHfXw9am75YbaWK4oV3TwZlIQJ6/Kuk1Eqh0CRuG2jalrfG/3414ll1s/jlpUI3FHWD3Cx5ssbXWZpCKvsFYb1qyWcBRoJ1PkIbMaKg+iRqsiczLL+boKc7MB9NtSZG0nfYWvY2Yac01YGuj34VeelkxVaUW2CTgO1b3DqERiUhURqkD/lz6pd+nd/tfg/pPLCUN8o27m5pZ2P9zcRFl/ckXIlQ6ibN4WKfA5XYmR7rpqzQqx0B8RuGwXVcz3KIf543DbD5iNXCgMnuGiKLCcK9RDva9dLHc4LMGGoXMCpsd0pD7Rz39NGb89vhohRMNklCEdG2n/iJ92+geP4Krmxsyn93YMGyknW98vMxRG63FyG+l5Y2Ydjgx9PzyAT9/SxvLTj0+eD3xvT2mlShKBQf6OHazna2ZHiNLuRRAFAIVT8BJ3x6a2N5QjfK+qX3RYDFeAXRjrJJqPQQ4fLNxx/UJH89czGE7MlQoAF8QXJLPkg2mg0PBX6n8M5R0VzLLJosvZF3eP9W0zrK2H0p5ht03Rb9gwfRyZKLirpbKJIKrQ7e9e2b0Xo+vkaqtMTSiq/YteMDP70Hb8wMTT8Q9yhsFOAWWZs5zZh8PWLjzW+/PFYipdWspKORPOKhy4VHkh+xS23bVTgh1sZn+8293z9XSIuQBdRdu5TiuZJILDszq49KYe/tHZ60LiMpYoRhsMul0bu2QKUO6aN77pocH96zkiRjNo1I2hlpwbWXT7TdBlzKLZ6pRYSE6PHhnHDiIMr9Q6dcSDrMPwGc6VC9flU8UXMyODpjSeayi+xayBNpm7teyOKVcmmwBQCxfcURlqhn4i4rEkhX2ZvvBwK9u7vcyVqfk3twwDKu8ERifs3DWoA5n6TB6/ntTK0hm4WhldL5widWKVYGJh2qBA34G/zsYkb5Kl0n56OHQ1a8h97yYmjfZ7dSj3QqTnKKyFdT9S6ycp1kaXmoNdm2r3Pj2uZf15+XMvLmaFFieU4hIURzAGQCdFIAOgEIowWH/wwP9X1qlCsoBSCMRkei3lWMWhOXEHZ/caVTNWqvaKqRCdsBkTArnlQs6Zn5im6fnsSxefWL3zC3hdvpUxm1XXMHTfJ5TMc33Yjp+fF/9kB7Gqo9IBLTZ99WcRnT6E/mP0UrbToeLWHwtr5A0b2Wg+/VM2jYAuoKa1Z9rUvKbMstp++5dVLiyKAfbFsfe3ivtTA419bnxuObJeNU4wLXAHvnOB38fvZTxdoEGBZZaFWHAkmJgA2oR+AyTahwf32u0SIISF0ZmRlKB/caTIBgIDZnUvHGd1EJmdlML6KBKfMkRSenJuewh8a8rHBLfsezelHDNuHyYrQrISmhKAWkGV22EAiFSUc5GPn4sQ7wde7ltHGfm/6+b6a3Iv8FzYjefErZAY/+VF6sVgo5KQJYGPDyqA9TLSRb6Cleg35VwjYdvj08A0wKtJb7lYHMaZ3bYZ3L3rU3TDGCGMyk6fMetWCL+yzZCvcQTIUvtTQ+6jzPb02ol3O9JKUfCMjMXa1AocrDJVUkg2STgc6VAguyxs5hjbaAaA88/MrbT/5hkYnF/PeZtvlhCvfyyaO7FzOJFp5/lreOJUISEJyAE+UatBBgwKI2CqNCkCLeCjRR8LEHKSysRCUzAga0gShFNVUrxsuEmx5A2+u60b2bvNaUAdMFxr+ZWZan5CjFAak3eeyf8ztaRg2AilRrrCcwBPjcTOVwhvdbyPwQbV4ilKA+Y23dFczGr3FKuUaOuAc9QwhFqtFqV8lDK/QNhGU+XapAB2BCuTH0EYJNIZeojSyBGfIYOcLLvpIcV0M4uY/W6/yFvwo3XhTPKeGIqmUBE8HKA0ok4wCRxcD0CgSvRNkYa15f11fc7HZs5ad/lF2tkWbvlXLFqI1ckQQzVqB+wjHBt1CJ0ekn/eWVcodrVB+9+Ugg6YD7Y+sUnPNk2xrybPgPLyiqUSIkAbA8+FnL0qzsWVJcswy0M4i46D5zWGt+5VQDu2OOEPy5nJDurk2mgzzmfQSaV222gD6XO/Sw8y3gsPfvQC6xSroBBIZIRqBDiAcA0KDhMInJFUuxaKwOduHnmHXdYG6jHVG/nOpMySAYwBSsIeBTJL+fpl/NETFVK60ly82+nCBebiUM5woQ7Tz8Oq+XFAzQPoVhCHOgdm5i5094U5r0esj3hVsab0u4KPX6EIqS3qebjm+uHjm72BxVLGn2+on3mHw64009i9oan33WBYJMAsEGJJANblSqJQwjA2Dr3PNELARIMBb+rU+DvEiCUUCDFJEgHNY3smT27bR/Xuf0pHIIq3d0d0U0nXlYHXlobdICbFn6q1Am6+3aey0iT/f+6md2KU+4mbBhm18/rZnJadpEF3Aj/igCDrGALmTa+cfe1VMifkjOLrLFFkpo2KTANOhqq5jzcbGvTrCnT4D4cHidN8hzV31SvEfuvcKOdiBe0KsCFPo3aFZ4eu0YGNnY1sOG/SDnwPwx0cgByxWIEhxIRu47dTs4y7++jT1fJaWh7sEzRSHO9G7GP8kbXWtmSG+uuQan7ehgyn9l1045vWzRpGYIAebjF1rrHlutPX+VWdKmVFxEww9eFnE7w+Mpp4LM0ESM6GtSC1K0j+1G+U5QG9LVkNIO/5w/zpbz0Inx7RHrYejWKFMu2TQIHUZ55m4jKsnDLMnGzAfMqQVRJ4sLFfa1doma5EqNmOqO/WNsuaAzYqujUEqv5DFWyYt8+ROYFMtIrNs7t/LPt37sPIp98HNscPoT/BoK+jameIy31tGj5SGMiyME4wjo3qV6j+gL7u6y1v+cPAVxE+gXfyPQQdwg2Eior4UJEOZ9BRgCHUFyM6DEoWetspkwKn+GDnpi0Vmd8F8v9damMDSF9VXJ+queofmTICRVVF5bvBflfTXdH55yT7rqWta45353FFzNmHkk8DR2WJ+y9c404O1R4JOH1kv+ySllF0HZ+7DXKQpVBLlfMEGurbdADP2nrSCsjJQU1/vOAu5511vNaxonNqmQgTFDuF+mGQklWhBipqDx1G7LULnT6QXT3GHezfgY9wpv7GUx16S8LDkzS6aynkoWlS0YVgA4urgBpt+Hc093ojFCpvktErn9U1lpY3bOx7b3IY3VddDwlED//gpi58AIrJOnDbMwzAidzll5+PDmQ6RRWnvymrN9/XdLBhZEUT6ga4vl1l1uXYq59tzaPGFK1gtlEfiSt60csfKcZqEXVmZvZwR7R6YFbmWQmYE4cYLehCFfIQwxUu7yYYu7kYqZlfrOlnoVJwbNe7hhrdvT2m4VORx4ex1a9cGjtTVhIABQfWQIDt/NP97iFPtmDxbOBc2kMMttAnZKrrUIpVKEQWDBuDPrcfarg6cJ9Gy5LQMNcYcjye6Py/O012wA2C0skYVqtvZryP7vO5y46D3T8L9lwNamzDv3VHQ9bmwG/xqRIUCmqkCMKxMiVDcPGKYol/BbiKymriG18i6Wo8aorb5oULSCWIOd+GerYYoC7kxO0MSbjd28mWRWArADRoLV/59DT1bWH7uDLP3Jwlwzt8Cc8AhJeL3YJSj0gEIjJClfBqhnwVdESHIGYnv2JbQoPJYZJ3RO+KmyGK0Ts+hneOOtsPUOTTixB2gixbK/2KMpt2Jix2+NvyPbbvtTdRrgi5MRK63kTzPWuNVd7JGI9iVOJTUzZAgAH66G2COAevjmxPurZZj91WrsKOzNnN0vjaQGtbYCXDu94DB5wH25b+IuNB2OyXTiVfBoGGgiw5pIQcMLAao58EdK5nVrWrhm93Sb3NQhvg1htGtNDJybI2Xr2vH33g2WZCTAuh+yc12/9/EHtTzVrY9KWiaIgNPx5ELSCJ2RiQZHK4uHEUjCXvsqsjia/O7OylPO+4zaHtxQcSuS39kGGhvsuR/ON8IDfXxdx2p99+G76xZTcqWnvyvqKOELZ+8HAUiynCVK7asznnCbySAbwh0AnCi3bqyf/PNA4dIZ1+xAdlW8IglRCcHMY4QqUB/6KxAiLJ1L55rkorTb2ilIsABDAWvXfYzzmWrc7A8uquwel7oLf10zqsdvN3nT3d1nPYPMbEDz97RIOjlNb5uUmEIxDK+cKmZU8MUMgxiYcCtQGAYNCYKtSieV0Mp7T1kvNBLxjKSeKKvlaUasHOfyT36MNcG3URi1IbZmX26iNWpAavWhyYN8fV/Pz87pQqFQOj8ulmPfuc23adMcNOBxOaaxQ0MkTx9KfPxuuwmSyuOAaY+N2f8+dv8CJSqXWW0JVLBaTt3psftG7j0U4aGdtg2waoZAa8teZ37IyM4fSGfRyPp9PVlNTK3BdvXY8LP9T83xY1eTY0cC/wG9IJYulTSAS+SQisYKpqvpphfOqybA2kqJ2Tp8K+lNPT+/ZqNFj9ip7FlgV7FTQyYAP79/1pFCo7NLSEt3pjjPcLfv3P6/smhvXozcUFBSYzJ4z10nZOZWVlTpeWz1e9OzZK2LegoULPqu5XI7aHn//m8udnadqamq9rqufXufkDDgbGuIvEAjoJBKRz6qsVAfvk73KZfVEBGl8Sgk2m625c7vffadly6cbGRk9qTaGpB1+vg/Be6/pYmp6qy4B4Ovt+cjIuF3a/AUL5zekzb27/W9NcHDwMjXrGlffua9f5wy8cP7c3vVu7oOrv9/RwCOhZuD6ocOGByq7NiU5yfGvM8F7NbW0CqBWiMfhxUuXr5gCq/kou+ZaVOTGe3fvzKEzGGWgb1Q7d+5yr9GAK68o1wET372PRd8w+D38cti2I4cPXgITU6luXV5Wpj/Gfty+EbZ2WD2n6GtRmwIOH7y4eu0vI+tr79DB/ZfG2o/3S01Jnn7//r35NjaDTtZ1fnJy0s9hFy/s9PXbYVJf8bAq0tPTT9/isdUCfj586EAY6Px7tnYj6zXMYVkiCO66zgk+HRQAnV+9fLb1bvAiiFBIU1bW8MskFpEAQ8gzMjZ+vGnjhtdbPb3MyWQKC5Z/4nDY6vJ6XEpNiV07/O5279HzuvumzUObi3vT6fTiyVOmuIOxveDt69e1irmdOH4sCAAivh6wIceOBgQPGGh9CgIj5sb1dYCR7anXjuZy1WAprgatW4jFBC6HU6s4AiyvCPqcUte1sERVhw4d/3ZZvca+IW0lJyXOuHP71jK/HbvaN0nCEQgE4YMH9x3fvn1rkZPzyrKivNxozbr1dYZDkCkU9tUr4evAAywoLS3Vd/hpom9DwHYtMnIznUYvHTxkyHFra+tgjy2bskxMTB7o6uop9dq+lRC/YvSYsbsbCjYldm1jHKHqPHfRYqdZubm5PXf777qe++F9z58mTvIDjOdgc0xwWMLSZtDgYKsBA0M3uW/IWeniOgHWgKvvutwPH3qXlJS0BxP6tyot4mhgQHBxcZEug8GoXLxk6WwAnm/aD7QAjPjvJ08czgSfPgQk9NKkpMSZhYWFJoudls6o67rbtxKW8bg8ZpW24LF5YzYA6B0wyZOQ5iNUSR1yaX1jTiaT2ZkZGTY7d/g9FIvEiK6ubs6iJU6zECUbRv2tBoT06Nnr2umgk4eAEJhiNWDARSDh1zUacCKRiAiL/sGbNfQaPo9Hn/DTxN1gou0HolULdGamoZHRcyBJlHrk57x6ZR0fH7dy3IQJPnE3Y11hX1n07Xf24IH94Z5ePr2UqbCAQwZHXY3wAOrB4SaArlnJ0NDw2S/r3bCifwnxcav8fH1SNm3xsGzy7EHheAhJKirMj3t++0N77x7/m/p6+i+oNFp5XfuGoO//BmpOUWzMjdXjJzj4wNKgy5avmAakImXrr1uew+K83wo4bEVx3vwlvt5ej+7eub34ZmzMasBc62TI+fn53a9GXPEcO278NtlYI4hlf6szAUcOn/fy9u0hK92qmDD1Do9vUOoDJpP5iVVRoQnrywJz5nOgcVlpmaG2tvbbuq6Farepmdl91zVr7RvaDzQarWzOvPkr4FFcXNzReflSTqMBx1BR+Shp5F4FGLwCIBk58s9FcHLs2rn9FuDOfw4ZMvSEgpejAX35D6dly6ZCvfcrJR9FpeC33wD3XKmoLXC/wH79LM8dDThyKjMrcxiRQORD9gU7a9HiJfMU1ZKt0UmFYIBZDXkvKpVWBDhfnXbo9ehoN6DLu5LJJAFAiLhDhw6PVq9dN7IebloGJkRR3WBDxQwGM6+6Tbp23Xq7mJgba1JTUyYTlNidcpJ4/OrZJyMjfQSwA1OBuqQNJy2K4sTQtoR1i5vGCFAxGLtpfr6+Nxc7OTmpAtVX6YNIJIRTJ08cmTN33qJe5r0jq/8Gaw8D+//wEqelc5RdD2zzd8D+DiSSSGKYm8asq1kS0CoUnq+jo5vl5r7RBth9UUDCGxMIeAEYw/J5CxYs6dixU53FJEGffHzz5k23zZvcMe1KyBcg8xctXtm9e/cYReeDvh1+/OjR44ApEqBwAOp/wWaPX/v/HwvctB1r85UUAAAAAElFTkSuQmCC",
  "zIndex": 1
}
const AnimationView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: commonParams.animationDuration,
            }
        ).start();
    }, [fadeAnim])

    const springAnim = useRef(new Animated.Value(0.3)).current  // Initial value for opacity: 0
    React.useEffect(() => {
        Animated.spring(
            springAnim,
            {
              toValue: 1,
              friction: 1
            }
          ).start()
    }, [springAnim])

    if (commonParams.animationType == 'fade') {
        return (
            <Animated.Image
			    resizeMode = {'contain'}
                source={commonParams.logoassetlink}    // Special animatable View
                style={{
                    ...props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}>
                {props.children}
            </Animated.Image>
        );
    } else if (commonParams.animationType == 'spring') {
        return (
            <Animated.Image
			    resizeMode = {'contain'}
                source={commonParams.logoassetlink}   // Special animatable View
                style={{
                    ...props.style,
                    transform: [{scale: springAnim}],         // Bind opacity to animated value
                }}>
                {props.children}
            </Animated.Image>
        );
    } else {
        return (
            <Animated.Image
			    resizeMode = {'contain'}
                source={commonParams.logoassetlink}   // Special animatable View
                style={{
                    ...props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}>
                {props.children}
            </Animated.Image>
        );
    }
}

export default class SplashScreen extends Component {
    constructor() {
        super()
        this.state = {
        orepageproperty: PropertyJson,
            ParamJson: Paramjson,
            pagename:"splash",
            spinner: false,
            isvalid: true,
            datamodal: Datamodel,
        }
    }

    
	/* Splash : Page_Splash; */
	componentDidMount= async (evt)=>{
		var orelist = this;  setTimeout(function () {
		orelist.Hide_Splash_Screen();}, commonParams.timeoutDuration);
		
	}
    callnanoflow = (evt) => {
        Orefuncs.callnanoflow(evt, this, Nanojson)
    }
   callback = () => {
        if (commonParams.networkCheck) {
            if(Orefuncs.isNetworkAvailable()){
                this.openNewPage()
            }else{
                this.showAlert()
            }
            
        } else{ 
            this.openNewPage()
        }
    }

    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
        if (commonParams.networkCheck) {
            if(Orefuncs.isNetworkAvailable()){
                this.openNewPage()
            }else{
                this.showAlert()
            }
            
        } else{ 
            this.openNewPage()
        }
         this.onPageTimeout()
    }

     onPageTimeout = async() => {
        
		try {
			if(Orefuncs.OreDataValidate(await OreApibinding.GetModalFieldData(this, "O433349","pinflag").then((res) => { return res.data })) == "Y")
			{
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
				if ("false" == "True") {
					Orefuncs.NavigatewithResetpage(this.props.navigation, "Index", "")
				}
				else
				{
					Orefuncs.NavigateTo(this.props.navigation, "Index", "")
				}
			}
		}
		catch(ex) {
			OreAlert.alert(ex.message);
		}
		
		this.setState({ spinner: false });

    }

    showAlert = () => {
        OreAlert.alert("Network Error", commonParams.networkMessage, "Try Again", this.callback, false)
    }

    openNewPage = () => {
        if (commonParams.navigateTo != "" && commonParams.navigateTo != undefined && commonParams.navigateTo != 'undefined'	) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: commonParams.navigateTo })],
               
            });
            this.props.navigation.dispatch(resetAction)
        }
    }

    render() {
        if (commonParams.displayType == 'style1' && commonParams.animation) {
            return (
                <ImageBackground style={[{ flex: 1, width: "100%", height: "100%" }, { backgroundColor: commonParams.backgroundColor }]} source={ {uri:commonParams.bgsource} } imageStyle={{resizeMode: 'stretch'}}>
                    <View style={[styles.container, styles.rootStyle]}>
                        <AnimationView style={styles.logoStyle}
						resizeMode = {'contain'}
                             source={ commonParams.logoassetlink }>
                        </AnimationView>
                        <Text style={[{ marginTop: 10 }, styles.titleStyle]}>{commonParams.title}</Text>
                    </View>
                </ImageBackground>
            )
        }
        else if (commonParams.displayType == 'style1' && !commonParams.animation) {
            return (
                <ImageBackground style={[{ flex: 1, width: "100%", height: "100%" }, { backgroundColor: commonParams.backgroundColor }]} source={ {uri:commonParams.bgsource} } imageStyle={{resizeMode: 'stretch'}}>
                    <View style={[styles.container, styles.rootStyle]}>
                        <Image style={styles.logoStyle}
						resizeMode = {'contain'}
                            source={ commonParams.logoassetlink }>
                        </Image>
                        <Text style={[{ marginTop: 10 }, styles.titleStyle]}>{commonParams.title}</Text>
                    </View>
                </ImageBackground>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
 rootStyle: {
        padding : styleParams.padding,
        paddingTop: styleParams.paddingTop,
        paddingBottom : styleParams.paddingBottom,
        paddingLeft : styleParams.paddingLeft,
        paddingRight : styleParams.paddingRight,
        justifyContent: styleParams.justifyContent,
    },
    logoStyle: {
        width: styleParams.logoWidth,
        height: styleParams.logoHeight
    },
    titleStyle: {
        fontSize: styleParams.fontSize,
        color: styleParams.color,
        fontWeight: styleParams.fontWeight,
        marginTop: 10
    }
})
AppRegistry.registerComponent('SplashScreen', () => SplashScreen); 