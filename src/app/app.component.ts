import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PDFGenerator, PDFTemplate, PDFSect, PDFBlock } from '../PDFGenerator'
import { defaultColors, defaultFont } from '../PDFGenerator/utils'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf_gen_new';

  generatePDF() {

    let template = new PDFTemplate("test-filename.pdf")
    template.setPadding([0.2])

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // header section 1
    let HeaderSection1 = new PDFSect(true,1)

    HeaderSection1.setHeight(1.1)
    HeaderSection1.setBorder(true, 1, defaultColors.lightmidGray)

    /**BLOCKS*********************/
    //    //  header block left 
    let HSect1LeftBlock = new PDFBlock()
    HSect1LeftBlock.id = "header-block-left"
    HSect1LeftBlock.setTextAlignH("right")
    HSect1LeftBlock.setPadding([0,0.2,0,0])
    HSect1LeftBlock.addImage("./assets/logo.png",[0.02,0.02], "PNG", 0.3, 0.3, "left")
    HSect1LeftBlock.addText({
      text:"U.S. Department\nof Transportation\n",
      desc:{
        ...defaultFont,
        fontSize:6,
        fontStyle:"bold",
        valign:"bottom"
      },
    })
    HSect1LeftBlock.addText({
      text:"Federal Motor\nCarrier Safety\nAdministration\n",
      desc:{
        ...defaultFont,
        fontStyle:"bold",
        fontSize:6,
      },
    })
    HSect1LeftBlock.addText({
      text: "Office of\nRegistration",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:18,
      },
      postioning:"absolute",
      pos:[0.8,0.64],
    })
    HSect1LeftBlock.addLine(0.75,0.4,0.75,1, defaultColors.black, 1)
    //  //  header block center
    let HSect1CenterBlock = new PDFBlock()
    HSect1CenterBlock.id = "header-block-center"
    HSect1CenterBlock.addText({
      text:"Registration View",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        valign:"bottom",
        align:"center",
      },
    })
    //  //  header block right
    let HSect1RightBlock = new PDFBlock()
    HSect1RightBlock.id = "header-block-right"
    HSect1RightBlock.setPadding([0,0,0.14,0])
    HSect1RightBlock.addText({
      text:"URSA",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:14,
        valign:"bottom",
        align:"right"
      },
    })
    HSect1RightBlock.addText({
      text:"Applicant Vetting Report",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
        align:"right"
      },
    })
    HSect1RightBlock.addText({
      text:"Reinstate Operating Authority",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"right"
      },
    })
    /***********************/

    HeaderSection1.appendBlock(HSect1LeftBlock)
    HeaderSection1.appendBlock(HSect1CenterBlock)
    HeaderSection1.appendBlock(HSect1RightBlock)
    
    // header section 2
    let HeaderNBSect = new PDFSect(true, 1)
    HeaderNBSect.setBorder(true, 1, defaultColors.lightmidGray)
    let block = new PDFBlock(100)
    HeaderNBSect.appendBlock(block)
    block.setPadding([0,0.1,0,0])
    block.addText({
      text: "See Report Help Guide on the last page for explanation and interpretation",
      desc: {
        ...defaultFont,
        fontStyle:"italic",
        fontSize:8,
      },
    })

    //  APPLICANT AND CURRENT CENSUS
    let AppNCCSect = new PDFSect(true, 1)
    AppNCCSect.setBorder(true, 1, defaultColors.lightmidGray)

    /**BLOCKS*********************/
    //    //  Applicant block
    let ApplicantBlock = new PDFBlock(50)
    ApplicantBlock.setPadding([0,0.1,0,0])
    ApplicantBlock.addText({
      text: "APPLICANT",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "U.S. DOT Number:",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "2911501",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
      },
      float:true
    })
    ApplicantBlock.addText({
      text: "Docket Number:",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "MC9809",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
      },
      float:true
    })
    ApplicantBlock.addText({
      text: "Legal Name:",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "GOP Transport, LLC",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
      },
      float:true
    })
    ApplicantBlock.addText({
      text: "DBA Name:",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "None",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
        fontColor:defaultColors.lightmidGray
      },
      float:true
    })
    ApplicantBlock.addText({
      text: "Tax ID Number (EIN):",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "8132732714",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
      },
      float:true
    })
    ApplicantBlock.addText({
      text: "Dun and Bradstreet #:",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    ApplicantBlock.addText({
      text: "None",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:14,
        fontColor:defaultColors.lightmidGray
      },
      float:true
    })
    //    //  Census block
    let CensusBlock = new PDFBlock(50)
    CensusBlock.setBlockBG(defaultColors.lightmidGray)
    CensusBlock.setPadding([0,0.1,0,0])
    CensusBlock.addText({
      text: "Current Census",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "Principal Address:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "2010 E 21st Street, Mission, TX 78572, US",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Mailing Address:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "2010 E 21st Street, Mission, TX 78572, US",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Phone:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "(956) 739-5038",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Cell:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "(956) 739-5038",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Fax:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "(956) 622-5144",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Email:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "dispatch@goptransport.com",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Officer 1:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "Luis Aguirre, Member Manager",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    CensusBlock.addText({
      text: "Officer 2:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:10,
      }
    })
    CensusBlock.addText({
      text: "Ricardo Garcia, Member Manager",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:10,
      },
      float:true
    })
    /***********************/

    AppNCCSect.appendBlock(ApplicantBlock)
    AppNCCSect.appendBlock(CensusBlock)

    // Operating Authority Type Section
    let OpAuthSect = new PDFSect()
    // OpAuthSect.setHeight(0.6)
    OpAuthSect.setBorder(true, 1, defaultColors.lightmidGray)
    /**BLOCKS*********************/
    //    //  OpAuth block
    let OpAuthBlock = new PDFBlock(100)
    OpAuthBlock.setPadding([0,0.1,0,0])
    OpAuthBlock.addText({
      text: "Operating Authority Type:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:22,
      }
    })
    OpAuthBlock.addText({
      text: "Motor Carrier, Property",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:20,
      },
      float:true
    })
    OpAuthBlock.addText({
      text: "Operation Classification:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:22,
      }
    })
    OpAuthBlock.addText({
      text: "For Hire Property Carrier General Freight",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:20,
      },
      float:true
    })
    OpAuthBlock.addText({
      text: "Cargo Classification:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:22,
      }
    })
    OpAuthBlock.addText({
      text: "Meat, Paper Products, Refrigerated Food, Beverages, General Freight, Fresh Produce",
      desc: {
        ...defaultFont,
        fontStyle:"light",
        fontSize:20,
      },
      float:true
    })
    /**************************/
    OpAuthSect.appendBlock(OpAuthBlock)

    // Flagged Entities Title Section
    let FlaggedEntitiesTitleSect = new PDFSect()
    FlaggedEntitiesTitleSect.setHeight(0.3)
    FlaggedEntitiesTitleSect.setBorder(true, 1, defaultColors.lightmidGray)
    /**BLOCKS*********************/
    //    //  Flagged Entities Title block
    let FlaggedEntitiesTitleBlock = new PDFBlock(100)
    FlaggedEntitiesTitleBlock.setPadding([0,0.1,0,0])
    FlaggedEntitiesTitleBlock.addText({
      text: "Flagged Entities",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:14,
      }
    })
    /**************************/
    FlaggedEntitiesTitleSect.appendBlock(FlaggedEntitiesTitleBlock)

    // Flagged Entities Header 1 Section
    let FlaggedEntitiesHeader1Sect = new PDFSect(true, 1)
    FlaggedEntitiesHeader1Sect.setHeight(0.2)
    FlaggedEntitiesHeader1Sect.setSectBG(defaultColors.lightmidGray)
    FlaggedEntitiesHeader1Sect.setBorder(true, 1, defaultColors.lightmidGray)
    /**BLOCKS*********************/
    //    //  Flagged Entities Header 1 block
    let FlaggedEntitiesHeader1BlockID = new PDFBlock(3)
    FlaggedEntitiesHeader1BlockID.addText({
      text: "#",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader1BlockUSDOT= new PDFBlock()
    FlaggedEntitiesHeader1BlockUSDOT.addText({
      text: "U.S. DOT",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })
    
    let FlaggedEntitiesHeader1BlockLegalName = new PDFBlock(21)
    FlaggedEntitiesHeader1BlockLegalName.addText({
      text: "Legal Name",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader1BlockStatus = new PDFBlock()
    FlaggedEntitiesHeader1BlockStatus.addText({
      text: "Status",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })
    
    let FlaggedEntitiesHeader1BlockAffinity = new PDFBlock(21)
    FlaggedEntitiesHeader1BlockAffinity.addText({
      text: "Affinity",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader1BlockMotivation = new PDFBlock(21)
    FlaggedEntitiesHeader1BlockMotivation.addText({
      text: "Motivation",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader1BlockDisclosed = new PDFBlock()
    FlaggedEntitiesHeader1BlockDisclosed.addText({
      text: "Disclosed",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    /**************************/
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockID)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockUSDOT)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockLegalName)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockStatus)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockAffinity)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockMotivation)
    FlaggedEntitiesHeader1Sect.appendBlock(FlaggedEntitiesHeader1BlockDisclosed)

    // Flagged Entities Header 2 Section
    let FlaggedEntitiesHeader2Sect = new PDFSect()
    FlaggedEntitiesHeader2Sect.setSectBG(defaultColors.lightmidGray)
    FlaggedEntitiesHeader2Sect.setHeight(0.2)
    FlaggedEntitiesHeader2Sect.setBorder(true, 1, defaultColors.lightmidGray)
    /**BLOCKS*********************/
    //    //  Flagged Entities Header 2 block
    let FlaggedEntitiesHeader2BlockInitial = new PDFBlock(10.5)
    FlaggedEntitiesHeader2BlockInitial.addText({
      text: "Initial",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader2BlockCurrent = new PDFBlock(10.5)
    FlaggedEntitiesHeader2BlockCurrent.addText({
      text: "Current",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let FlaggedEntitiesHeader2BlockSpace = new PDFBlock(46.7)


    /**************************/
    FlaggedEntitiesHeader2Sect.appendBlock(FlaggedEntitiesHeader2BlockSpace)
    FlaggedEntitiesHeader2Sect.appendBlock(FlaggedEntitiesHeader2BlockInitial)
    FlaggedEntitiesHeader2Sect.appendBlock(FlaggedEntitiesHeader2BlockCurrent)    
    FlaggedEntitiesHeader2Sect.appendBlock(FlaggedEntitiesHeader2BlockInitial)
    FlaggedEntitiesHeader2Sect.appendBlock(FlaggedEntitiesHeader2BlockCurrent)

    // Flagged Entities Table Data
    let FlaggedEntitiesTableData: any[]= [["1","307302","Quick Transportation Solutions Inc", "OOS", "None", "180", "None", "140", "NO"]]
    let FlaggedEntitiesTableSects: PDFSect[] = []
    FlaggedEntitiesTableData.forEach((data) => {
      FlaggedEntitiesTableSects.push(this.flagEntityTableAppender(data))
    })

    // ApplicationDate Section
    let ApplicationSect = new PDFSect(true, 1)
    ApplicationSect.setBorder(true, 1, defaultColors.lightmidGray)
    /**BLOCKS*********************/
    let ApplicationBlock = new PDFBlock()
    ApplicationBlock.setPadding([0,0.1,0,0])
    ApplicationBlock.addText({
      text: "APPLICATION",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
      }
    })

    ApplicationBlock.addText({
      text: "Date Filled:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })

    ApplicationBlock.addText({
      text: "01/06/2021",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationBlock.addText({
      text: "Initial Screening Date:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })

    ApplicationBlock.addText({
      text: "None",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationBlock.addText({
      text: "Current Screening Date:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })

    ApplicationBlock.addText({
      text: "01/06/2021",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationBlock.addText({
      text: "Applicant's Oath Person:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })

    ApplicationBlock.addText({
      text: "Valria Castro, President",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })


    let ApplicationAddressBlock = new PDFBlock()
    ApplicationAddressBlock.setPadding([0,0.1,0,0])
    ApplicationAddressBlock.addText({
      text: "Principal Address:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      },
    })
    ApplicationAddressBlock.addText({
      text: "1901 Aduanales Ln, Laredo, TX, 78041-5603, US",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true 
    })
    ApplicationAddressBlock.addText({
      text: "Mailing Address:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })

    ApplicationAddressBlock.addText({
      text: "1901 Aduanales Ln, Laredo, TX, 78041-5603, US",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationAddressBlock.addText({
      text: "Phone:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })
    ApplicationAddressBlock.addText({
      text: "(58) 397-6120",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationAddressBlock.addText({
      text: "Cell:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })
    ApplicationAddressBlock.addText({
      text: "(58) 397-6120",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationAddressBlock.addText({
      text: "Fax:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })
    ApplicationAddressBlock.addText({
      text: "None",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })

    ApplicationAddressBlock.addText({
      text: "Email:",
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:8,
      }
    })
    ApplicationAddressBlock.addText({
      text: "1265666126@av-cargo.com",
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:8,
      },
      float: true
    })
    /**************************/
    ApplicationSect.appendBlock(ApplicationBlock)
    ApplicationSect.appendBlock(ApplicationAddressBlock)


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    template.appendSection(HeaderSection1)
    template.appendSection(HeaderNBSect)
    template.sectSpacing(0.2)
    template.appendSection(AppNCCSect)
    template.appendSection(OpAuthSect)
    template.sectSpacing(0.2)
    template.appendBisection(30, OpAuthSect, AppNCCSect, 0.03)
    template.sectSpacing(0.2)
    template.appendSection(FlaggedEntitiesTitleSect)
    template.appendSection(FlaggedEntitiesHeader1Sect)
    template.appendSection(FlaggedEntitiesHeader2Sect)
    template.appendSections(FlaggedEntitiesTableSects)
    template.sectSpacing(0.2)
    template.appendSection(ApplicationSect)
    template.sectSpacing(0.2)
    template.appendSection(FlaggedEntitiesTitleSect)
    template.appendSection(FlaggedEntitiesHeader1Sect)
    template.appendSection(FlaggedEntitiesHeader2Sect)
    template.appendSections(FlaggedEntitiesTableSects)
    template.sectSpacing(0.2)
    template.appendSection(ApplicationSect)
    template.appendSection(FlaggedEntitiesTitleSect)
    template.appendSection(FlaggedEntitiesHeader1Sect)
    template.appendSection(FlaggedEntitiesHeader2Sect)
    template.appendSections(FlaggedEntitiesTableSects)
    template.sectSpacing(0.2)
    template.appendSection(ApplicationSect)
    new PDFGenerator(template).generatePDF()
  }

  flagEntityTableAppender(data:string[9]){
    let num = data[0]
    let USDOT = data[1]
    let LegalName = data[2]
    let Status = data[3]
    let AffinityInitial = data[4]
    let AffinityCurrent = data[5]
    let MotivationInitial = data[6]
    let MotivationCurrent = data[7]
    let Disclosed = data[8]
    
    let TableRowSect = new PDFSect(true, 1)
    TableRowSect.setHeight(0.1)
    TableRowSect.setBorder(true, 1, defaultColors.lightmidGray)

    /*BLOCKS*********************/
    let TableRowBlockID = new PDFBlock(3)
    TableRowBlockID.addText({
      text: num,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockUSDOT = new PDFBlock()
    TableRowBlockUSDOT.addText({
      text: USDOT,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockLegalName = new PDFBlock(21)
    TableRowBlockLegalName.setPadding([0,0,0,0])
    TableRowBlockLegalName.addText({
      text: LegalName,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockStatus = new PDFBlock()
    TableRowBlockStatus.addText({
      text: Status,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockAffinityInitial = new PDFBlock() 
    TableRowBlockAffinityInitial.addText({
      text: AffinityInitial,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockAffinityCurrent = new PDFBlock()
    TableRowBlockAffinityCurrent.addText({
      text: AffinityCurrent,
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockMotivationInitial = new PDFBlock()
    TableRowBlockMotivationInitial.addText({
      text: MotivationInitial,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockMotivationCurrent = new PDFBlock()
    TableRowBlockMotivationCurrent.addText({
      text: MotivationCurrent,
      desc: {
        ...defaultFont,
        fontStyle:"bold",
        fontSize:12,
        align:"center"
      }
    })

    let TableRowBlockDisclosed = new PDFBlock()
    TableRowBlockDisclosed.addText({
      text: Disclosed,
      desc: {
        ...defaultFont,
        fontStyle:"normal",
        fontSize:12,
        align:"center"
      }
    })

    TableRowSect.appendBlock(TableRowBlockID)
    TableRowSect.appendBlock(TableRowBlockUSDOT)
    TableRowSect.appendBlock(TableRowBlockLegalName)
    TableRowSect.appendBlock(TableRowBlockStatus)
    TableRowSect.appendBlock(TableRowBlockAffinityInitial)
    TableRowSect.appendBlock(TableRowBlockAffinityCurrent)
    TableRowSect.appendBlock(TableRowBlockMotivationInitial)
    TableRowSect.appendBlock(TableRowBlockMotivationCurrent)
    TableRowSect.appendBlock(TableRowBlockDisclosed)

    return TableRowSect
  }
  /************************** */
}
