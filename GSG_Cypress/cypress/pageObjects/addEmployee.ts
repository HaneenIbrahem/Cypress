

class addEmployee
{
    
    elements={
    
        //add employee fields
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
        // EmployeeInputName: () => cy.get('.--name-grouped-field'),
        FirstName: () => cy.get('input[name="firstName"]'),
        MiddleName: () => cy.get('input[name="middleName"]'),
        LastName: () => cy.get('input[name="lastName"]'),
        SaveNewEmp: () => cy.get('button[type="submit"]'),
        CreateLoginDetailsToggle: () => cy.get('span.oxd-switch-input.oxd-switch-input--active.--label-right'),
        Username: () => cy.contains('Username'),
        EnabledStatus: () => cy.get('input[type="radio"][value="1"]'),
        DisabledStatus: () => cy.get('input[type="radio"][value="2"]'),
        Password: () => cy.get('input[type="password"]'),
        ConfirmationMessage: () => cy.get('.oxd-text.oxd-text--h6.--strong'),

        //search fields 
        EId: () => cy.get(':nth-child(2) > .oxd-input'),
        EName: () => cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'),
        SupervisorName: () => cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'),
        searchBTN: () => cy.get('.oxd-form-actions > .oxd-button--secondary')
        
    }
    
    //add employee via UI
    // addNewEmployee(firstName:string, MiddleName:string, LastName:string, username: string, password: string, confirmPassword: string){
    //  this.elements.MainMenuItems().contains('PIM').click();
    //  this.elements.AddEmp().eq(1).click()
    //  this.elements.FirstName().type(firstName)
    //  this.elements.MiddleName().type(MiddleName)
    //  this.elements.LastName().type(LastName)
    //  this.elements.CreateLoginDetailsToggle().click()
    //  this.elements.Username()
    // .parent()
    // .next() 
    // .find('input')
    //  .type(username)
    //  this.elements.EnabledStatus().click({ force: true })
    //  this.elements.Password().eq(0).type(password)
    //  this.elements.Password().eq(1).type(password)
    //  this.elements.SaveNewEmp().click() 
    //  cy.wait(3000)
    //  this.elements.ConfirmationMessage().should('contain',`${firstName} ${LastName}`)    
    // }


    //test search by name
    // searchEmployee(name: string) {
    //     this.elements.EName().type(name)
    //     this.elements.searchBTN().click({ force: true })
    // }

    
    // searchEmployee(fieldName: string, value: string) {
    //     this.elements[fieldName]().type(value);
    //     this.elements.searchBTN().click({ force: true });
    //   }

}
export default addEmployee;