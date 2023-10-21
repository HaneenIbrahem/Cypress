import LoginPage from '../../support/pageObjects/loginPage'
// import RecruitmentTab from '../../support/pageObjects/candidates'

const loginObj: LoginPage = new LoginPage();
// const recruitmentTab: RecruitmentTab = new RecruitmentTab();

describe("upload file ", () => {


    beforeEach("login", () => {
      cy.fixture('addEmployee').as('data')
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      loginObj.login("Admin", "admin123");

    })

    it("create new vacancy", () => {
        cy.get('.oxd-sidepanel-body').contains('Recruitment').click();
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
        cy.get('button[type="button"]').contains('Add').click({force: true});
        cy.get('.oxd-input').eq(1).type('Haneen')
        cy.get('.oxd-input').eq(2).type('M')
        cy.get('.oxd-input').eq(3).type('Ibrahem')
        cy.get(' .oxd-input').eq(4).type('haneen@gmail.com')
        cy.get('.oxd-select-text').click({force: true})
        cy.contains('Senior Support Specialist').click({force: true})
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Haneen-CV.pdf', {force: true})
        cy.get('.oxd-form-actions').contains('Save').click()
        cy.contains('Haneen-CV.pdf');
      })
    

})
