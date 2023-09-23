

class addEmployee {

  elements = {

    MainMenuItems: () => cy.get('.oxd-sidepanel-body'),

    //search fields 
    EId: () => cy.get(':nth-child(2) > .oxd-input'),
    EName: () => cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'),
    SupervisorName: () => cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input'),
    searchBTN: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),

    //user details:
    Nickname: () => cy.get(':nth-child(1) > .oxd-grid-3 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input'),
    DriverLicenseNumber: () => cy.get(':nth-child(3) > :nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    LicenseExpiryDate: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input'),
    SSNNumber: () => cy.get(':nth-child(3) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    SINNumber: () => cy.get(':nth-child(3) > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'),
    Nationality: () => cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    MaritalStatus: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    DateOfBirth: () => cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input'),
    Male: () => cy.get('input[type="radio"][value="1"]'),
    Female: () => cy.get('input[type="radio"][value="2"]'),
    CloseBtn: () => cy.get('.--close'),
    SmokerCheckBox: () => cy.get('input[type="checkbox"][data-v-6179b72a]'),
    saveBtn: () => cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'),

    EmployeeList: () => cy.get('.--visited > .oxd-topbar-body-nav-tab-item'),

    //Job details
    Job: () => cy.get(':nth-child(6) > .orangehrm-tabs-item'),
    JoinedDate: () => cy.get('.oxd-date-input > .oxd-input'),
    JobTitle: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    JobCategory: () => cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    SubUnit: () => cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    Location: () => cy.get(':nth-child(6) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    EmployeeStatus: () => cy.get(':nth-child(7) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text'),
    SaveButton: () => cy.get('.oxd-form-actions > .oxd-button'),

    //report to details
    ReportTo: () => cy.get(':nth-child(9) > .orangehrm-tabs-item'),
    AddButton: () => cy.get(':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
    AddSupervisorName: () => cy.get('.oxd-autocomplete-text-input > input'),
    ReportingMethod: () => cy.get('.oxd-select-text-input'),
    saveBTN: () => cy.get('.oxd-button--secondary'),

  }

  addEmployeeDetails(nickName: any, driverLicenseNumber: any, licenseExpiryDate: string, ssnNumber: string, sinNumber: string, nationality: string, maritalStatus: string, dateOfBirth: any, gender: string, smoker: string) {
    this.elements.Nickname().clear().type(nickName)
    this.elements.DriverLicenseNumber().clear().type(driverLicenseNumber)
    this.elements.LicenseExpiryDate().clear().type(licenseExpiryDate)
    this.elements.CloseBtn().click()
    this.elements.SSNNumber().clear({ force: true }).type(ssnNumber)
    this.elements.SINNumber().clear().type(sinNumber)
    this.elements.Nationality().click({ force: true })
    cy.contains(nationality).click({ force: true })
    this.elements.MaritalStatus().click()
    cy.contains(maritalStatus).click({ force: true })
    this.elements.DateOfBirth().clear().type(dateOfBirth)
    this.elements.CloseBtn().click()
    if (gender === 'Male') {
      this.elements.Male().check({ force: true })
    } else {
      this.elements.Female().check({ force: true })
    }
    if (smoker === 'Smoker') {
      this.elements.SmokerCheckBox().eq(0).check({ force: true })
    } else {
      this.elements.SmokerCheckBox().eq(0).uncheck({ force: true });
    }
    this.elements.saveBtn().click()
  }
  addJobDetails(
    joinedDate: string,
    jobTitle: string,
    jobCategory: string,
    subUnit: string,
    location: string,
    employmentStatus: string
  ) {
    this.elements.Job().click({ force: true })
    this.elements.JoinedDate().clear().type(joinedDate)
    this.elements.CloseBtn().click()
    this.elements.JobTitle().click()
    cy.contains(jobTitle).click({ force: true })
    this.elements.JobCategory().click()
    cy.contains(jobCategory).click({ force: true })
    this.elements.SubUnit().click()
    cy.contains(subUnit).click({ force: true })
    this.elements.Location().click()
    cy.contains(location).click({ force: true })
    this.elements.EmployeeStatus().click()
    cy.contains(employmentStatus).click({ force: true })
    this.elements.SaveButton().click()
  }
  addReportTo(name: string,
    reportingMethod: string,) {
    this.elements.ReportTo().click({ force: true })
    this.elements.AddButton().click({ force: true })
    this.elements.AddSupervisorName().type(name)
    cy.contains('.oxd-autocomplete-option', 'Searching....').should('exist');
    cy.contains('.oxd-autocomplete-option', 'Searching....').should('not.exist');
    cy.get('.oxd-autocomplete-option').should('be.visible').click({ force: true })
    this.elements.ReportingMethod().click({ force: true })
    cy.contains(reportingMethod).click({ force: true })
    this.elements.saveBTN().click({ force: true })
  }

  searchEmployee(id: number, firstAndMiddleName: string, lastName: string, jobTitle: string, employmentStatus: string, subUnit: string, supervisor: string) {
    this.elements.MainMenuItems().contains('PIM').click();
    this.elements.EmployeeList().click()
    this.elements.EId().type(id.toString())
    this.elements.searchBTN().click({ force: true })

    cy.get('.orangehrm-container')
      .should('contain', id) // Assert Id
      .should('contain', firstAndMiddleName) // Assert First & Middle Name
      .should('contain', lastName) // Assert Last Name
      .should('contain', jobTitle) // Assert Job Title
      .should('contain', employmentStatus) // Assert Employment Status
      .should('contain', subUnit) // Assert Sub Unit
      .should('contain', supervisor); // Assert Supervisor
  }

}
export default addEmployee;