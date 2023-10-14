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
        count.candidateCount();
        
    })

})