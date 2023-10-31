

class editVacancy {

    elements = {
        addAttachment: () => cy.get('.orangehrm-header-container  .oxd-button', { timeout: 30000 }),
        selectFile: () => cy.get('input[type=file]'),
        loading: () => cy.get('.oxd-table-loader > .oxd-loading-spinner-container'),
        saveBtn: () => cy.get('.oxd-form  .oxd-form-actions  .oxd-button--secondary')
    }

    addAttachment(filePath: string) {
        this.elements.addAttachment().click({ force: true }).then(() => {
            this.elements.selectFile().selectFile(filePath, { force: true }).then(() => {
                this.elements.loading().should("exist").then(() => {

                    this.elements.loading().should("not.exist").then(() => {
                        this.elements.saveBtn().last().click({ force: true })
                    })

                })
            })
        })
    }

}
export default editVacancy;