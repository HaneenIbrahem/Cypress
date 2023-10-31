// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// declare namespace Cypress{
//     interface Chainable <Subject>{
//         getByPlaceholder: typeof getByPlaceholder
//     }

//     interface Chainable {
//         // Define the custom command to add a new employee and return their employee number
//         addNewEmployee(firstName: string, middleName: string, lastName: string, employeeId: string): Chainable<number>;
//       }

// }
// function getByPlaceholder(placeholder: string){
//     return cy.get(`[placeholder=${placeholder}]`)
// }
// Cypress.Commands.add('getByPlaceholder', getByPlaceholder)


// function addNewEmployee(firstName: string, middleName: string, lastName: string, employeeId: string){
//     cy.request({
//         method: 'POST',
//         url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
//         body: {
//           firstName: firstName,
//           middleName: middleName,
//           lastName: lastName,
//           empPicture: null,
//           employeeId: employeeId,
//         },
//       }).then((response) => {
//         return response.body.data.empNumber;
//       });
// }

// Cypress.Commands.add('addNewEmployee', addNewEmployee);


import 'cypress-file-upload'; 
 
 
 declare global{ 
    namespace Cypress{ 
    interface Chainable<Subject> { 
        getByCy: typeof getByCy 
        logout: typeof logout
        getByPlaceholder: typeof getByPlaceholder 
        addEmployee: typeof addEmployee
        addVacancy: typeof addVacancy
        leaveEntitlements: typeof leaveEntitlements
    } 
}} 
 
 
function getByCy(field: string) { 
    // return cy.get('[placeholder="'+field+'"]') 
    return cy.get(`[placeholder=${field}]`) 
} 
 
function logout() { 
    //logout 
    cy.get('.oxd-userdropdown-tab').click({ force: true }); 
    return cy.get('.oxd-dropdown-menu').contains('Logout').click({ force: true }); 
} 
function getByPlaceholder(placeholder: string){
    return cy.get(`[placeholder=${placeholder}]`)
}
function addEmployee(firstName: string, middleName: string, lastName: string, empPicture: string, employeeId: number){
    return cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/pim/employees',
        body: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          empPicture: empPicture,
          employeeId: employeeId
        }
      })
}
function addVacancy(name: string, jobTitleId: number, employeeId: number, numOfPositions: number, description: string, status: boolean, isPublished: boolean){
    return cy.request({
      method: 'POST',
      url: `/web/index.php/api/v2/recruitment/vacancies`,
      body: {
        name: name,
        jobTitleId: jobTitleId,
        employeeId: employeeId,
        numOfPositions: numOfPositions,
        description: description,
        status: status,
        isPublished: isPublished
      }
    })
}
function leaveEntitlements(empNumber: number, leaveTypeId: number, fromDate: string, toDate: string, entitlement: string){
    return cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/leave/leave-entitlements',
        body: {
          empNumber: empNumber,
          leaveTypeId: leaveTypeId,
          fromDate: fromDate,
          toDate: toDate,
          entitlement: entitlement
        }
      })
}

Cypress.Commands.add('getByPlaceholder', getByPlaceholder)
Cypress.Commands.add('getByCy', getByCy) 
Cypress.Commands.add('logout', logout)
Cypress.Commands.add('addEmployee', addEmployee)
Cypress.Commands.add('addVacancy', addVacancy)
Cypress.Commands.add('leaveEntitlements', leaveEntitlements)
