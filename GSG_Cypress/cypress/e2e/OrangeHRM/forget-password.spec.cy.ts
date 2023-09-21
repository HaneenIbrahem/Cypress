import LoginPage from '../../pageObjects/loginPage'

const loginObj : LoginPage = new LoginPage();

describe("Visit orangeHRM", () => {
    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        // loginObj.login("Admin", "admin123");
    })

    it("forgetPassword", () => {
        loginObj.forgetPassword("Admin", "Reset Password link sent successfully");
    });
    
  });