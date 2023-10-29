import LoginPage from '../../support/pageObjects/loginPage'

const loginObj: LoginPage = new LoginPage();

describe("write on file then post a comment", () => {


    beforeEach( () => {
      cy.fixture('addEmployee').as('data')
      cy.visit("/web/index.php/auth/login");
      loginObj.login("Admin", "admin123");

      cy.get('.oxd-sidepanel-body').contains('Buzz').click();
      cy.writeFile('cypress/fixtures/file.txt', 'hello !!!');

    })

    it("post anew comment", () => {
        cy.fixture('file.txt').then((postText) => {
            cy.get('.oxd-buzz-post-input').type(postText);
            cy.get('.oxd-buzz-post-slot > .oxd-button').click({force: true});
          });
        cy.contains('hello !');
      })
    

})
