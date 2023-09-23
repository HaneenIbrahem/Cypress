import LoginValidation from "../../support/pageObjects/loginValidation"
const loginObjValidation : LoginValidation = new LoginValidation();
describe("Login Home Page", () => {
    beforeEach(function (){
        cy.visit("/web/index.php/auth/login");
        cy.fixture('login').as('data')
    })

    it("Fill field with valid data",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.valid.name,infoData.valid.password)
            loginObjValidation.checkPage(infoData.valid.message)
        })
    })

    it("Fill field with invalid data",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.invalid.name,infoData.invalid.password)
            loginObjValidation.checkPage(infoData.invalid.message)
        }) 
    })

    it("Fill field with valid user and invalid password",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.valid.name,infoData.invalid.password)
            loginObjValidation.checkPage(infoData.invalid.message)
        })
    })

    it("Fill field with invalid user and valid password",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.invalid.name,infoData.valid.password)
            loginObjValidation.checkPage(infoData.invalid.message)
        })
    })

    it("Check user name sensitive",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.valid.name.toUpperCase(),infoData.valid.password)
            loginObjValidation.checkPage(infoData.valid.message)
        })
    })

    it("Check password sensitive",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.valid.name,infoData.valid.password.toUpperCase())
            loginObjValidation.checkPage(infoData.invalid.message)
        })
    })

    it("Fill field with empty data",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.allEmpty.name,infoData.allEmpty.password)
            loginObjValidation.checkPage(infoData.allEmpty.message)
        })
    })

    it("Fill field with empty user",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.userEmpty.name,infoData.userEmpty.password)
            loginObjValidation.checkPage(infoData.userEmpty.message)
        })
    })
    
    it("Fill field with empty password",()=>{
        cy.get('@data').then((infoData:any)=>{
            loginObjValidation.fillData(infoData.passwordEmpty.name,infoData.passwordEmpty.password)
            loginObjValidation.checkPage(infoData.passwordEmpty.message)
        }) 
    })
    
    it("Check password field",()=>{   
       loginObjValidation.checkHiddenPassword()
    })
  });