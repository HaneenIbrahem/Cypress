class Candidates {
    public idResponse: number = 0;

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        searchBTN: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        table: () => cy.get('.oxd-table-body'),

        addBTN: () => cy.get('.orangehrm-header-container > .oxd-button'),

        //schedule Interview
        scheduleInterviewBTN: () => cy.get('.oxd-button--success').contains('Schedule Interview'),
        InterviewTitleInput: () => cy.get('label:contains("Interview Title")').parents('.oxd-input-group').find('input'),
        Interviewer: () => cy.get('.oxd-autocomplete-text-input input[data-v-75e744cd]'),
        DateInput: () => cy.get('.oxd-date-input input[data-v-1f99f73c]'),
        saveBTN: () => cy.get('.oxd-button--secondary'),
        status: () => cy.get('.orangehrm-recruitment-status'),
    }

    candidateCount() {
        let count = 0;
        this.elements.MainMenuItems().contains('Recruitment').click();
        // this.elements.searchBtn().click();

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC').as('CountRecruitment');
        cy.wait('@CountRecruitment').then((response) => {
            count = response.response?.body.meta.total
            console.log(count)
        }).then(() => {
            this.elements.searchBTN().click({ force: true });
            this.elements.table().find('.oxd-table-card').should('have.length', count);
        })

    }

    addNewCandidateViaAPI(comment: string, consentToKeepData: boolean, contactNumber: any, dateOfApplication: string, email: string, firstName: string, keywords: string, lastName: string, middleName: string, vacancyId: number) {

        this.elements.MainMenuItems().contains('Recruitment').click({ force: true });
        // this.elements.addBTN().click({force: true})
        cy.api({
            method: 'POST',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
            body: {
                comment: comment,
                consentToKeepData: consentToKeepData,
                contactNumber: contactNumber,
                dateOfApplication: dateOfApplication,
                email: email,
                firstName: firstName,
                keywords: keywords,
                lastName: lastName,
                middleName: middleName,
                vacancyId: vacancyId,
            }
        }).then((response) => {
            this.idResponse = response.body.data.id
            console.log(response.body.data.id)
            expect(response).property('status').to.eq(200);
        });
    }

    shortlistCandidate(note: string) {
        cy.then(() => {
            cy.api({
                method: 'PUT',
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${this.idResponse}/shortlist`,
                body: {
                    note: note,
                },
            }).then((response) => {
                expect(response).property('status').to.eq(200);
                cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${this.idResponse}`)
            })
        });
    }

    scheduleInterview(InterviewTitle: string, interviewer: string, date: string){
        this.elements.scheduleInterviewBTN().click({force: true});
        this.elements.InterviewTitleInput().type(InterviewTitle)
        this.elements.Interviewer().type(interviewer)
            cy.contains('.oxd-autocomplete-option', 'Searching....').should('exist');
            cy.contains('.oxd-autocomplete-option', 'Searching....').should('not.exist');
            cy.get('.oxd-autocomplete-option').should('be.visible').click({ force: true })
        this.elements.DateInput().clear().type(date)
        this.elements.saveBTN().click()
        this.elements.status().should('contain', 'Status: Interview Scheduled')
        
    }

}

export default Candidates;