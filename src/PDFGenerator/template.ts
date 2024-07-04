import { PDFSect} from "./section"

import { FontDefintion, RGB, TextDescription, boxsizing } from "./interfaces"
import { boxInit, defaultColors, defaultFont } from "./utils"


export class PDFTemplate {
    constructor(Name:string, ...presetFonts: TextDescription[]){
        this.fileName = Name.slice(-3) == "pdf"? Name : Name + ".pdf"
    }

    //name of file
    fileName: string
    
    //page measurments base unit
    unit: "in" = "in"
    coeff: number = this.unit == "in" ? 1/72 : 1 // coefficient for converting points to inches
    
    //page orientation
    orientation: "p" = "p" 

    //page format
    private format?: [w:number, l:number] 
    setFormat(format: [w:number, l:number]){
        this.format = format
    }
    get getFormat(){
        return this.format ?? [8.27,11.69]
    }

    // background color of entire page
    private pageBG?: RGB
    setPageBG(pageBG:RGB){
        this.pageBG = pageBG
    }
    get getPageBG(){
        return this.pageBG ?? defaultColors.white
    }

    //padding of the page
    private padding: boxsizing = [0]
    setPadding(padding:boxsizing){
        this.padding = padding
    }
    get getPadding(){
        return boxInit(this.padding ?? [0])
    }

    //empty spacing section adder
    sectSpacing(spacing:number = 0.3){
        let spacingSect = new PDFSect()
        spacingSect.setHeight(spacing)
        this.Sections.push(spacingSect)
    }

    //customizable default font for entire page
    private font?:TextDescription = defaultFont
    setFont(font:TextDescription){
        this.font = font
        //sets font of section if not defined
        this.Sections.forEach(section => {
            if(section instanceof PDFSect) {
                if(section.isFontNull) {
                    section.setFont(font)
                }
            }
        })
    }
    get getFont(){
        return this.font ?? defaultFont
    }
    
    private Sections: (PDFSect|[number,PDFSect, PDFSect, number?])[] = []
    get getSections(){
        return this.Sections
    }
    appendSection = (sect: PDFSect) => {
        if(sect.isFontNull){
            sect.setFont(this.getFont)
        }
        sect.sectionIndex = this.Sections.length
        this.Sections.push(sect)
    }

    appendSections = (sect: PDFSect[]) => {
        sect.forEach(s => {
            this.appendSection(s)
        })
    }

    appendBisection = (widthFirstPercent: number, section1: PDFSect, section2: PDFSect, spaceBtwn?: number) => {
        if(section1.isFontNull){
            section1.setFont(this.getFont)
        }
        if(section2.isFontNull){
            section2.setFont(this.getFont)
        }
        section1.sectionIndex = this.Sections.length
        section2.sectionIndex = this.Sections.length

        this.Sections.push([widthFirstPercent, section1, section2, spaceBtwn])
    }
}
