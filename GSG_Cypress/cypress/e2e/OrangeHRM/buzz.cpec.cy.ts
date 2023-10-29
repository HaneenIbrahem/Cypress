import LoginPage from '../../support/pageObjects/loginPage'
import BuzzPage from '../../support/pageObjects/buzz'

const loginObj: LoginPage = new LoginPage();
const buzzObj: BuzzPage = new BuzzPage();

describe("write on file then add new post", () => {


    beforeEach( () => {
      cy.fixture('addEmployee').as('data')
      cy.visit("/web/index.php/auth/login");
      loginObj.login("Admin", "admin123");

      buzzObj.Buzz();
      cy.writeFile('cypress/fixtures/file.txt', 'hello !!!');

    })

    it("add new post", () => {
        cy.fixture('file.txt').then((postText) => {
            buzzObj.NewPost(postText);
          });
        cy.contains('hello !!!');
      })
    

})
