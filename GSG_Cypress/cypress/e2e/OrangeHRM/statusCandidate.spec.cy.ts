import CandidatesCount from "../../support/pageObjects/candidates"
import LoginValidation from "../../support/pageObjects/loginValidation"

const count : CandidatesCount = new CandidatesCount();
const loginObjValidation : LoginValidation = new LoginValidation();

describe("Login Home Page", () => {
    beforeEach(function (){
        cy.visit("/web/index.php/auth/login");
        cy.fixture('login').as('data')

        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.valid.name,infoData.valid.password)
            loginObjValidation.checkPage(infoData.valid.message)
        })
    })

    it("candidate count",()=>{
        count.addNewCandidateViaAPI("no comment", false, '0123456789', "2023-10-14", "hh@hh.hh", "haneen", "hi", "Ibrahem", "MMM", 8)
        count.shortlistCandidate("init note")
        count.scheduleInterview('first Interview', 'Lisa  Andrews', '2023-10-15')
        
    })

})