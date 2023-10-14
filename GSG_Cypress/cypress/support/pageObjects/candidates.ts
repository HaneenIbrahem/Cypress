class Candidates {
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        searchBTN: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        table: () => cy.get('.oxd-table-body'),

        addBTN: () => cy.get('.orangehrm-header-container > .oxd-button')
    }

    candidateCount(){
        let count = 0;
        this.elements.MainMenuItems().contains('Recruitment').click();
        // this.elements.searchBtn().click();
        
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC').as('CountRecruitment'); 
        cy.wait('@CountRecruitment').then((response) => { 
            count = response.response?.body.meta.total
            console.log(count) 
        }).then(() => {
            this.elements.searchBTN().click({force: true});
            this.elements.table().find('.oxd-table-card').should('have.length', count);
        })

    }
    addNewCandidateViaAPI(comment: string, consentToKeepData: boolean, contactNumber: any, dateOfApplication: string, email: string, firstName: string, keywords: string, lastName: string, middleName: string, vacancyId: number){
        let idResponse: number;
        this.elements.MainMenuItems().contains('Recruitment').click({force: true});
        // this.elements.addBTN().click({force: true})
        cy.api({
            method: 'POST',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
            body: {
                comment:  comment,
                consentToKeepData: consentToKeepData,
                contactNumber: contactNumber,
                dateOfApplication :  dateOfApplication,
                email:  email,
                firstName:  firstName,
                keywords: keywords,
                lastName:  lastName,
                middleName:  middleName,
                vacancyId: vacancyId,
            }   
        }).then((response) => {
            idResponse = response.body.data.id
            console.log(response.body.data.id)
          expect(response).property('status').to.eq(200); 
          cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${idResponse}`)
        });

        
    }
}

export default Candidates;