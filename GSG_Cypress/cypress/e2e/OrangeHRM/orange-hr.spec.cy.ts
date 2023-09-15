import LoginPage from '../../pageObjects/loginPage'

const loginObj : LoginPage = new LoginPage();

describe("Visit orangeHRM", () => {
    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    })

    it("Visits orangeHRM", () => {
        // cy.get('[placeholder="Username"]').type('Admin')
        // cy.get('[placeholder="Password"]').type('admin123')
        // cy.get('button').click()
        loginObj.login("Admin", "admin123");
    });
  });
  