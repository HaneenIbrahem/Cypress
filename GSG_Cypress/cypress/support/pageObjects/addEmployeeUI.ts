

class addEmployeeUI {

    elements = {
  
      //add employee fields
      MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
      AddEmp: () => cy.get('.oxd-button--secondary'),
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
    }
  
    // add employee via UI
    addNewEmployee(firstName:string, MiddleName:string, LastName:string, username: string, password: string, confirmPassword: string){
     this.elements.MainMenuItems().contains('PIM').click();
     this.elements.AddEmp().eq(1).click()
     this.elements.FirstName().type(firstName)
     this.elements.MiddleName().type(MiddleName)
     this.elements.LastName().type(LastName)
     this.elements.CreateLoginDetailsToggle().click()
     this.elements.Username()
    .parent()
    .next() 
    .find('input')
     .type(username)
     this.elements.EnabledStatus().click({ force: true })
     this.elements.Password().eq(0).type(password)
     this.elements.Password().eq(1).type(password)
     this.elements.SaveNewEmp().click() 
     cy.wait(3000)
     this.elements.ConfirmationMessage().should('contain',`${firstName} ${LastName}`)    
    }
  
  }
  export default addEmployeeUI;