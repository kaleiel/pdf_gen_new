import jsPDF from 'jspdf'
import { PDFBlock } from "./block"
import { RGB, TextDescription} from "./interfaces"
import { PDFTemplate } from "./template"
import { defaultColors, defaultFont } from "./utils"

export class PDFSect {
    sectionIndex: number = 0
    vLinedBlocks: boolean = false
    vLinedBlocksThickness: number = 0
    hLinedBlocks: boolean = false
    hLinedBlocksThickness: number = 0
    constructor(vLined?: boolean, linedBlocksThickness?: number, hLined?: boolean, hlinedBlocksThickness?: number) {
        this.vLinedBlocks = vLined ?? false
        this.vLinedBlocksThickness = linedBlocksThickness ?? this.getBorder.thickness
        this.hLinedBlocks = hLined ?? false
        this.hLinedBlocksThickness = hlinedBlocksThickness ?? this.vLinedBlocksThickness ?? this.getBorder.thickness
    }

    //height of a section
    private height: number = 0.25
    setHeight(height: number) {
        this.height = height
    }
    get getHeight() {
        return this.height
    }

    //bisected height of a section
    private bisectedHeight: number = 0.25
    setBisectedHeight(height: number) {
        this.bisectedHeight  = height
    }
    get getBisectedHeight() {
        return this.bisectedHeight
    }
    // background color of the section
    bgColor?: RGB | null
    setSectBGToTransparent() {
        this.bgColor = null
    }
    setSectBG(bgColor: RGB) {
        this.bgColor = bgColor
    }
    get getSectBG() {
        return this.bgColor
    }

    //border of the section
    private border: boolean = false
    private borderThickness: number = 2
    private borderColor: RGB = defaultColors.black
    setBorder(border: boolean, borderThickness?: number, borderColor?: RGB) {
        this.border = border
        if (border && borderThickness) {
            this.borderThickness = borderThickness
        }
        if (border && borderColor) {
            this.borderColor = borderColor
        }
    }
    get getBorder() {
        return this.border ? { thickness: this.borderThickness, color: this.borderColor } : { thickness: 0, color: defaultColors.black }
    }

    //default font for the section (optional)
    private font?: TextDescription
    setFont(font: TextDescription) {
        this.font = font
        // sets font of block if not defined 
        this.Blocks.forEach(block => {
            if (block.isFontNull) {
                block.setFont(font)
            }
        })
    }
    get getFont() {
        return this.font ?? defaultFont
    }
    get isFontNull() {
        return this.font == null
    }

    private Blocks: PDFBlock[] = []
    get getBlocks() {
        return this.Blocks
    }

    appendBlock = (block: PDFBlock) => {
        if (block.isFontNull) {
            block.setFont(this.getFont)
        }
        block.blockIndex = this.Blocks.length
        this.Blocks.push(block)
    }
    getSection = (block: number) => {
        return this.Blocks.at(block)
    }
    delSection = (block: PDFBlock | number) => {
        if (typeof block == "number") {
            delete this.Blocks[block]
        } else {
            delete this.Blocks[this.Blocks.indexOf(block)]
        }
    }
    calcWidth = (template: PDFTemplate) => {
        // calculate section proportion
        let SectionWidth = template.getFormat[0]
        SectionWidth -= (template.getPadding[1] + template.getPadding[2])
        return SectionWidth
    }
    calcBisectedWidth = (widthFirstPercent: number, i: number, template: PDFTemplate) => {
        return this.calcWidth(template)*(i==0?widthFirstPercent/100:(100-widthFirstPercent)/100)
    }
    calcBisectedHeight = (percentage: number, first:boolean, doc: jsPDF, template: PDFTemplate) => {
        let H = this.calcHeight(doc, template, true, percentage, first)
        this.setBisectedHeight(H)

        return H
    }
    calcHeight = (doc: jsPDF, template: PDFTemplate, ...bisection: any[]) => {
        let SectionWidth = this.calcWidth(template)
        SectionWidth -= this.getBorder.thickness * 2 * template.coeff
        let SectionHeight = this.getHeight
        this.getBlocks.forEach(block => {
            let blockHeight = block.getPadding[0] + block.preRender(doc, template, SectionWidth, ...bisection) + block.getPadding[3]

            SectionHeight = Math.max(blockHeight, SectionHeight)
            
            block.setHeight(blockHeight)
        })
        this.setHeight(SectionHeight)

        return SectionHeight
    }
    render = (doc: jsPDF, template: PDFTemplate, verticalCursor: number, horizontalCursor: number, proportion:[width:number, height:number], bisected:boolean = false, widthPrcent?:number, first?:boolean) => {
        // let horizontalCursor = template.getPadding[1]
        let SectionWidth = proportion[0]
        let SectionHeight = proportion[1]

        // render section border
        if (this.getBorder.thickness > 0) {
            doc.setFillColor(this.getBorder.color.red, this.getBorder.color.green, this.getBorder.color.blue)
            doc.rect(horizontalCursor, verticalCursor, SectionWidth, SectionHeight, 'F')

            //adjust total section width and height for the border
            SectionWidth -= this.getBorder.thickness * 2 * template.coeff
            SectionHeight -= this.getBorder.thickness * 2 * template.coeff
            horizontalCursor += this.getBorder.thickness * template.coeff
            verticalCursor += this.getBorder.thickness * template.coeff
        }
        // render section background
        let sectBG: RGB = this.getSectBG ?? template.getPageBG
        doc.setFillColor(sectBG.red, sectBG.green, sectBG.blue)
        doc.rect(horizontalCursor, verticalCursor, SectionWidth, SectionHeight, 'F')

        let totalGoneW = 0
        let goneI = 0
        this.getBlocks.forEach((block) => {
            if(block.getWidthPrcnt > 0 && block.getWidthPrcnt < 100){
                let w = SectionWidth * block.getWidthPrcnt / 100
                if(w+totalGoneW<=100){
                    totalGoneW += w
                    goneI++
                }
            }
        })
        let goneW = 0
        this.getBlocks.forEach((block) => {
            let w = 0
            if(block.getWidthPrcnt > 0 && block.getWidthPrcnt < 100){
                w = SectionWidth * block.getWidthPrcnt / 100
                goneW += w
                if(goneW > totalGoneW){
                    w = (SectionWidth-totalGoneW)/(this.getBlocks.length-goneI)
                }
            } else {
                w = (SectionWidth-totalGoneW)/(this.getBlocks.length-goneI)
            }
            let blockWidthNoPadding = w

            block.render(doc, template, this, SectionHeight, blockWidthNoPadding, verticalCursor, horizontalCursor, bisected, widthPrcent, first)
            // add vertically lined blocks if enabled
            if (this.vLinedBlocks && block.sectVLines) {
                doc.setDrawColor(this.getBorder.color.red, this.getBorder.color.green, this.getBorder.color.blue)
                doc.setLineWidth(this.vLinedBlocksThickness * template.coeff)
                let xPos = horizontalCursor + blockWidthNoPadding
                doc.line(xPos, verticalCursor, xPos, verticalCursor + SectionHeight)
            }
            horizontalCursor += blockWidthNoPadding
        })
    }
    splitRender = (...args: any) => {
        // TODO Split rendering on page end
    }
}