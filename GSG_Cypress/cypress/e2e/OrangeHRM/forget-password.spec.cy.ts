import LoginPage from '../../support/pageObjects/loginPage'

const loginObj : LoginPage = new LoginPage();

describe("Visit orangeHRM", () => {
    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    })

    it("forgetPassword", () => {
        loginObj.forgetPassword("Admin", "Reset Password link sent successfully");
    });
    
  });