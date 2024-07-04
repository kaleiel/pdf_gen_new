export interface RGB {
    red: number,
    green: number,
    blue: number,
}
export type boxsizing = [all:number] | [top:number,left:number,right:number,bottom:number] | [block:number,inline:number] | [top:number, inline:number, bottom:number]
export type coords = [x:number,y:number]

export interface TextDescription {
    fontName: string
    fontStyle: string
    fontColor: RGB 
    fontSize: number
    lineHeight?: number
    align: "left" | "center" | "right" | "justify"
    valign: "top" | "bottom" | "center",
    maxWidth?: number
}
export interface FontDefintion {
    fontName: string
    fontData : string
    fontStyle: string
}
export interface TextLine {
    pos?:[x:number,y:number]
    text:string
    desc:TextDescription
    width?:number // line width in inches
    maxLineWidth?:number // max line width in inches
    postioning?: "relative" | "absolute"
    float?: boolean
    lines?:number

    absX?: number //final x rendered in inches
    absY?: number //final y rendered in inches

    margin?:number
}
export interface ImageContent{
    pos:[x:number,y:number]
    url:string
    width:number
    height:number
    align: "left" | "center" | "right"
    format: "JPEG" | "PNG"

    float?: boolean
    absX?: number //final x rendered in inches
    absY?: number //final y rendered in inches

    padding?:boxsizing
    margin?:boxsizing
    isImage?:boolean
}
export interface Line{
    x1:number
    y1:number
    x2:number
    y2:number
    color:RGB
    thickness:number
}