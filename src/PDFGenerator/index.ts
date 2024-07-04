import jsPDF from 'jspdf'
import { PDFTemplate } from './template'
import { PDFBlock } from './block'
import { PDFSect } from './section'
import { FontDefintion } from './interfaces'
import { SegoeUI, defaultFontDef } from './utils'
export class PDFGenerator {
    template: PDFTemplate
    constructor(template: PDFTemplate) {
        this.template = template
        this.doc = new jsPDF({
            orientation: this.template.orientation,
            unit: this.template.unit,
            format: this.template.getFormat
        })
    }
    doc: jsPDF
    generatePDF(...fonts: FontDefintion[]) {
        this.initFonts(SegoeUI)
        for (let font of fonts) {
            this.initFont(font)
        }
        //DEFAULT FONT IS SEGOE UI
        this.initFont(defaultFontDef)

        let coeff = this.template.unit == "in" ? 1 / 72 : 1 // coefficient for converting points to inches

        //run through section heights, define number of pages, and add page background
        let PageWidth = this.template.getFormat[0]
        PageWidth -= (this.template.getPadding[1] + this.template.getPadding[3])
        let PageLength = 0
        this.template.getSections.forEach(Section => {
            if (Section instanceof PDFSect) {
                PageLength += Section.getBorder.thickness * 2 * coeff
                PageLength += Section.calcHeight(this.doc, this.template)
            }
            else {
                let widthFirstPercent = Math.min(50,Math.max(Section[0], 10))
                let sectH1 = Section[1].calcBisectedHeight(widthFirstPercent, true, this.doc, this.template)
                let sectH2 = Section[1].calcBisectedHeight(widthFirstPercent, false, this.doc, this.template)
                PageLength += Math.max(sectH1, sectH2)
            }
        })
        let numPages = Math.ceil(PageLength / this.template.getFormat[1])

        /*first page bg*/
        this.doc.setFillColor(this.template.getPageBG.red, this.template.getPageBG.green, this.template.getPageBG.blue)
        this.doc.rect(0, 0, PageWidth, this.template.getFormat[1], 'F')

        for (let i = 0; i < numPages - 1; i++) {
            this.doc.addPage()

            /*pagebg*/
            this.doc.setFillColor(this.template.getPageBG.red, this.template.getPageBG.green, this.template.getPageBG.blue)
            this.doc.rect(0, 0, PageWidth, this.template.getFormat[1], 'F')
        }
        this.doc.setPage(1) // go back to first page
        let currPage = 1

        //initialize vertical and horizontal cursors
        let verticalCursor = this.template.getPadding[0]
        let horizontalCursor = this.template.getPadding[1]
        //begin render the page
        this.template.getSections.forEach((Section, i) => {
            if (Section instanceof PDFSect) {
                let SectionHeight = Section.getHeight
                let SectionWidth = Section.calcWidth(this.template)
                
                if (verticalCursor + SectionHeight < this.template.getFormat[1] - this.template.getPadding[3]) {
                    // if there is space on the page
                    Section.render(this.doc, this.template, verticalCursor, horizontalCursor, [SectionWidth, SectionHeight])
                    verticalCursor += SectionHeight
                    horizontalCursor = this.template.getPadding[1]
                } else {
                    let availableSpace = this.template.getFormat[1] - this.template.getPadding[3] - verticalCursor
                    Section.splitRender(this.doc, this.template, horizontalCursor, verticalCursor, availableSpace)
                    currPage++
                    this.doc.setPage(currPage)
                    verticalCursor = this.template.getPadding[0]
                    horizontalCursor = this.template.getPadding[1]
                }
            }else{
                //BISECTION
                let bisections = [Section[1], Section[2]] 
                let bisectionH = 0
                bisections.forEach((section, i) => {
                    let SectionHeight = section.calcBisectedHeight(Section[0], i==0, this.doc, this.template)
                    let SectionWidth = section.calcBisectedWidth(Section[0], i, this.template)

                    if (verticalCursor + SectionHeight < this.template.getFormat[1] - this.template.getPadding[3]) {
                        // if there is space on the page
                        section.render(this.doc, this.template, verticalCursor, horizontalCursor, [SectionWidth, SectionHeight], true, Section[0], i==0)
                        bisectionH = Math.max(bisectionH, SectionHeight)
                        horizontalCursor += SectionWidth + (Section[3]??0)
                    } else {
                        let availableSpace = this.template.getFormat[1] - this.template.getPadding[3] - verticalCursor
                        section.splitRender(this.doc, this.template, horizontalCursor, verticalCursor, availableSpace)
                        currPage++
                        this.doc.setPage(currPage)
                        verticalCursor = this.template.getPadding[0]
                        horizontalCursor += SectionWidth
                    }

                })
                verticalCursor += bisectionH
                horizontalCursor = this.template.getPadding[1]
            }
        })
    }

    initFont(font: FontDefintion) {
        this.doc.addFileToVFS(`${font.fontName}.ttf`, font.fontData);
        this.doc.addFont(`${font.fontName}.ttf`, `${font.fontName}`, `${font.fontStyle}`);
        this.doc.setFont(`${font.fontName}`, `${font.fontStyle}`);
    }
    initFonts(fonts: FontDefintion[]) {
        for (let font of fonts) {
            this.initFont(font)
        }
    }
}
export { PDFTemplate, PDFBlock, PDFSect }