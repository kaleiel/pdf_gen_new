import jsPDF from "jspdf"
import { boxsizing, RGB, TextDescription, TextLine, Line, ImageContent } from "./interfaces"
import { boxInit, defaultColors, defaultFont } from "./utils"
import { PDFTemplate } from "./template"
import { PDFSect } from "./section"
export class PDFBlock {
    id?: string

    blockIndex: number = 0

    // margin and padding for the block
    private padding?: boxsizing
    setPadding(padding: boxsizing) {
        this.padding = padding
    }
    get getPadding() {
        return boxInit(this.padding ?? [0])
    }

    //dynamically generated height and width
    private height?: number
    setHeight(height: number) {
        this.height = height
    }
    get getHeight() {
        return this.height ?? 0
    }
    private width: number = 0
    setWidthPrcnt(width: number) {
        this.width = width
    }
    get getWidthPrcnt() {
        return this.width
    }
    // dynamically generated bisected height and width
    private bisectedHeight?: number
    setBisectedHeight(height: number) {
        this.bisectedHeight = height
    }
    get getBisectedHeight() {
        return this.bisectedHeight ?? 0
    }

    private bisectedWidth?: number
    setWidth(width: number) {
        this.bisectedWidth = width
    }
    get getBisectedWidth() {
        return this.bisectedWidth ?? 0
    }

    // text alignment in the block
    textAlignH?: "left" | "center" | "right" | "justify"
    setTextAlignH(alignment: "left" | "center" | "right") {
        this.textAlignH = alignment
    }
    get getTextAlignH() {
        return this.textAlignH ?? "left"
    }

    // background color of the block
    bgColor?: RGB | null
    setBlockBGToTransparent() {
        this.bgColor = null
    }
    setBlockBG(bgColor: RGB) {
        this.bgColor = bgColor
    }
    get getBlockBG() {
        return this.bgColor ?? null
    }

    // border for the block
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
    //section lines inheritence
    sectHLines = true
    sectVLines = true
    constructor(widthPercentage?: number, Vlines?: boolean, Hlines?: boolean) {
        this.setWidthPrcnt(widthPercentage ?? 0)
        this.sectHLines = Hlines ?? true
        this.sectVLines = Vlines ?? true
    }

    // font for text in the block (optional)
    private font?: TextDescription
    setFont(font: TextDescription) {
        this.font = font
    }
    get getFont() {
        return this.font ?? defaultFont
    }
    get isFontNull() {
        return this.font == null
    }

    private pos = 0
    private elements: (any)[] = []

    textLines: TextLine[] = []
    images: ImageContent[] = []
    lines: Line[] = []

    addText(textLine: TextLine | string) {
        if (typeof textLine != "string") {
            this.textLines.push(textLine)
            this.elements.push(textLine)
        } else {
            let tL: TextLine = {
                text: textLine,
                desc: defaultFont,
                postioning: "relative"
            }
            this.textLines.push(tL)
            this.elements.push(tL)
        }
        this.pos++
    }

    addImage(image: string, pos: [x: number, y: number] = [0, 0], format: "PNG" | "JPEG" = "JPEG", width: number, height: number, align = "left") {
        let ic: ImageContent = {
            pos: pos,
            url: image,
            width: width,
            height: height,
            align: "left",
            format: format,
            isImage: true
        }
        this.images.push(ic)
        this.elements.push(ic)
        this.pos++
    }

    addLine(x1: number, y1: number, x2: number, y2: number, color: RGB, thickness: number) {
        // this.lines.push({x1:0,y1:0,x2:0,y2:0,color:defaultColors.black,thickness:1})
        this.lines.push({ x1: x1, y1: y1, x2: x2, y2: y2, color: color, thickness: thickness })
    }
    preRender(doc: jsPDF, template: PDFTemplate, blockMaxWidth: number, bisected: boolean = false, widthPrcent?: number, first?: boolean) {
        let bisectionCoeff = bisected ? first ? (widthPrcent ?? 100) / 100 : (100 - (widthPrcent ?? 100)) / 100 : 1
        let vertCdelta = 0
        blockMaxWidth -= (this.getPadding[1] + this.getPadding[2])
        this.textLines.forEach((line,i) => {
            if(line.postioning != "absolute") {
                line.postioning = line.postioning ?? "relative"
                blockMaxWidth -= line.margin ?? 0

                // calculate line width
                let lineWidth = blockMaxWidth - ((line.margin ?? 0) * 2 * template.coeff)
                doc.setFontSize(line.desc.fontSize*bisectionCoeff)
                doc.setFont(line.desc.fontName, line.desc.fontStyle)
                let TotalTextWidth = doc.getTextWidth(line.text)

                if (line.float) {
                    lineWidth -= this.textLines[i-1]?.width ?? 0
                }
                //count number of \n in the text
                let spaceLines = 0
                let index = line.text.indexOf("\n")
                while (index !== -1) {
                    spaceLines++;
                    index = line.text.indexOf("\n", index + 1);
                }
                let nLines = Math.ceil(TotalTextWidth / lineWidth)
                line.width = Math.min(TotalTextWidth,lineWidth)
                nLines += spaceLines
                line.lines = nLines
                if(line.float) {
                    vertCdelta += ((line.lines ?? 1)-1) * (line.desc.fontSize ?? defaultFont.fontSize) * template.coeff * (line.desc.lineHeight ?? 1) + line.desc.fontSize/4 * doc.getLineHeightFactor() * template.coeff
                }else{
                    vertCdelta += (line.lines ?? 1) * (line.desc.fontSize ?? defaultFont.fontSize) * template.coeff * (line.desc.lineHeight ?? 1) + line.desc.fontSize/4 * doc.getLineHeightFactor() * template.coeff
                }
            }
        })
        return vertCdelta
    }
    render(doc: jsPDF, template: PDFTemplate, sect: PDFSect, SectionHeight: number, blockMaxWidth: number, vertC: number, horC: number, bisected: boolean = false, widthPrcent?: number, first?: boolean) {
        // draw block border (according to sectioin height)
        let bisectionCoeff = bisected ? first ? (widthPrcent ?? 100) / 100 : (100 - (widthPrcent ?? 100)) / 100 : 1
        let vertCdelta = vertC


        let blockTextHeight = this.preRender(doc, template, blockMaxWidth, bisected, widthPrcent, first)

        let bmw2 = blockMaxWidth
        if (this.getBorder.thickness > 0) {
            doc.setFillColor(this.getBorder.color.red, this.getBorder.color.green, this.getBorder.color.blue)
            doc.rect(horC, vertC, blockMaxWidth, blockTextHeight, "F")

            blockMaxWidth -= this.getBorder.thickness * 2 * template.coeff
            // blockTextHeight -= this.getBorder.thickness * 2 * template.coeff
            horC += this.getBorder.thickness * template.coeff
            vertCdelta += this.getBorder.thickness * template.coeff
        
        }
        if (this.getBlockBG) {
            doc.setFillColor(this.getBlockBG.red, this.getBlockBG.green, this.getBlockBG.blue)
            doc.rect(horC, vertCdelta, blockMaxWidth, SectionHeight, "F")
        }

        // doc.setFillColor(this.getBlockBG?.[0] ?? 255, this.getBlockBG?.[1] ?? 255, this.getBlockBG?.[2] ?? 255);
        // draw elements first
        let horC2 = horC
        horC += this.getPadding[1]
        blockMaxWidth -= (this.getPadding[1] + this.getPadding[2])
        let textElementsIndex = 0
        this.elements.forEach((element, i) => {
            if (!element.isImage) {

                let line = element // rename to 'element' to 'line'
                line.postioning = line.postioning ?? "relative"
                let prevLine = this.elements[i - 1]

                doc.setFontSize(line.desc.fontSize*bisectionCoeff)
                doc.setTextColor(line.desc.fontColor.red, line.desc.fontColor.green, line.desc.fontColor.blue)
                doc.setFont(line.desc.fontName, line.desc.fontStyle)
                blockMaxWidth -= line.margin ?? 0

                // doc.text(line.text, horC,vertCdelta+(line.font.fontSize??14)*template.coeff, {"maxWidth":blockMaxWidth})
                // doc.text(line.text, , , {"maxWidth":blockMaxWidth})
                let x = line.postioning == "absolute" ? horC + line.pos[0] : horC + (line.margin ?? 0)
                let spaceBNx = blockMaxWidth - (line.width ?? 0 /* line width is set in preRender*/)
                let spaceBNy = SectionHeight - (bisected ? this.getBisectedHeight : this.getHeight)
                if (spaceBNx > 0) {
                    if (line.desc.align == "right") {
                        x += spaceBNx

                    }
                    if (line.desc.align == "center") {
                        x += spaceBNx / 2
                    }
                }
                if (spaceBNy > 0 && textElementsIndex == 0) {
                    // only set vertical alignment once per block, all position relative elements will go in place
                    if (line.desc.valign == "bottom") {
                        vertCdelta += spaceBNy
                    }
                    if (line.desc.valign == "center") {
                        vertCdelta += spaceBNy / 2
                    }
                }
                let y = (line.postioning != "absolute" ? vertCdelta + (line.desc.fontSize ?? defaultFont.fontSize) * template.coeff : /*if absolute get pos*/ vertC + (line.pos ? line.pos[1] : 0))

                // change x and y for based on floating
                if (line.float && line.width && prevLine.absX && prevLine.absY && prevLine.width && !prevLine.float) {
                    let CharSpace = doc.getTextWidth(" ")
                    let prevLineW = prevLine.width

                    x = prevLine.absX + prevLineW + CharSpace
                    y = prevLine.absY
                    line.maxLineWidth = blockMaxWidth - (prevLine.absX + prevLineW + CharSpace)
                }

                doc.text(line.text, x, y, { "maxWidth": (line.maxLineWidth ?? blockMaxWidth) })
                line.absX = x
                line.absY = y
                let w = doc.getTextWidth(line.text)
                line.width = w > line.maxLineWidth ? line.maxLineWidth : w

                if (line.postioning != "absolute" && !line.float) {
                    vertCdelta += (line.lines ?? 1) * (line.desc.fontSize ?? defaultFont.fontSize) * template.coeff * (line.desc.lineHeight ?? 1) + line.desc.fontSize/4 * doc.getLineHeightFactor() * template.coeff
                } else {
                    vertCdelta += ((line.lines ?? 1)-1) * (line.desc.fontSize ?? defaultFont.fontSize) * template.coeff + line.desc.fontSize/4 * doc.getLineHeightFactor() * template.coeff
                }
                textElementsIndex++
            } else {
                let image = element

                //image content
                let x = image.pos[0] + horC
                let y = image.pos[1] + vertC
                let spaceBN = blockMaxWidth - (image.width ?? 0)
                if (spaceBN > 0) {
                    if (image.align == "right") {
                        x += spaceBN
                    }
                    if (image.align == "center") {
                        x += spaceBN / 2
                    }
                }

                let w = image.width
                let h = image.height

                let img = new Image(image.width, image.height)
                img.src = image.url
                doc.addImage(img, 'PNG', x, y, w, h, `${sect.sectionIndex}_${this.blockIndex}_${i}`, 'NONE', 0)
            }
            // draw horizon lines if active
            if (this.sectHLines && sect.hLinedBlocks && !element.float) {
                doc.setDrawColor(sect.getBorder.color.red, sect.getBorder.color.green, sect.getBorder.color.blue)
                doc.setLineWidth(sect.hLinedBlocksThickness * template.coeff)
                let yPos = vertCdelta
                doc.line(horC2, yPos, horC2 + bmw2, yPos)
            }
        })
        // superimpose lines last
        this.lines.forEach((line) => {
            let x = line.x1 + horC
            let y = line.y1 + vertC
            let x2 = line.x2 + horC
            let y2 = line.y2 + vertC
            doc.setLineWidth(line.thickness * template.coeff)
            doc.setDrawColor(line.color.red, line.color.green, line.color.blue)
            doc.line(x, y, x2, y2)
        })
    }
}
