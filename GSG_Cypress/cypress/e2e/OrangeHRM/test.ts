describe("Leave Page", () => {
    beforeEach("login", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get('[placeholder="Username"]').type('Admin')
        cy.get('[placeholder="Password"]').type('admin123')
        cy.get('button').click()
        cy.contains('Leave').click();
    })
    it("Search leave by date", () => {
        cy.get('input.oxd-input.oxd-input--active[placeholder="yyyy-mm-dd"]').eq(0).clear().type('2022-09-15')
        cy.pause();
        // cy.get('input.oxd-input.oxd-input--active[placeholder="yyyy-mm-dd"]').eq(2).type('2023-09-16')
        //oxd-input oxd-input--active
        
    })
})