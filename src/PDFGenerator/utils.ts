import { boxsizing } from "./interfaces";
import { PDFTemplate } from "./template"
import { TextDescription, FontDefintion } from "./interfaces"

import { segoeuiNormal } from './fonts/segeoui';
import { segoeuiBold } from './fonts/segoeuibold';
import { segoeuiLight } from './fonts/segoeuilight';
import { segoeUIItalic } from './fonts/segoeuiitalic';
export function boxInit(box:boxsizing){
    return box.length == 1 ? [box[0],box[0],box[0],box[0]]  
    : box.length == 2 ? [box[0],box[1],box[1],box[1]]
    : box.length == 3 ? [box[0],box[1],box[1],box[2]]
    : [box[0],box[1],box[2],box[3]]
}
export function calcSectionWidth(template:PDFTemplate){
    return template.getFormat[0]-template.getPadding[1]-template.getPadding[3]
}


export let defaultColors =  {
    black: {green:0,blue:0,red:0},
    white: {green:255,blue:255,red:255},
    red: {green:0,blue:0,red:255},
    green: {green:255,blue:0,red:0},
    blue: {green:0,blue:255,red:0},
    lightGray: {green:211,blue:211,red:211},
    lightmidGray: {green:170,blue:170,red:170},
    midGray: {green:128,blue:128,red:128},
    darkGray: {green:50,blue:50,red:50}
}
export let defaultFontDef: FontDefintion = {
    fontName: "SegoeUI",
    fontData: segoeuiNormal,
    fontStyle: "normal"
}
export let defaultFont: TextDescription = {
    fontName: defaultFontDef.fontName,
    fontStyle: "normal",
    fontColor: defaultColors.black,
    fontSize: 12,
    align: "left",
    valign: "top"
}

export let SegoeUI: FontDefintion[]= [
    {
        fontName:"SegoeUI",
        fontData:segoeuiNormal,
        fontStyle:"normal"
    },
    {
        fontName:"SegoeUI",
        fontData:segoeuiLight,
        fontStyle:"light"
      },
      {
        fontName:"SegoeUI",
        fontData:segoeuiBold,
        fontStyle:"bold"
      },
      {
        fontName:"SegoeUI",
        fontData:segoeUIItalic,
        fontStyle:"italic"
      }
]