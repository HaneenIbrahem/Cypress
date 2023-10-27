// import LoginPage from '../../support/pageObjects/loginPage'
import { login, logout, requestLeave, approveReject } from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'

// const loginObj: LoginPage = new LoginPage();

let empNumberResponse: number
let username = `HaneenIbrahem${Math.floor((Math.random() * 1000))}`;
let password = "haneen123";
let vacancyId: number;

describe('Leave Request Scenario', () => {
  beforeEach(() => {
    cy.fixture('addEmployee').as('data')
    cy.fixture('leave').as('leaveData')
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    login("Admin", "admin123");

    cy.get('@data').then((infoData: any) => {
      cy.request({
        method: 'POST',
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        body: {
          firstName: infoData.addEmployee.firstName,
          middleName: infoData.addEmployee.middleName,
          lastName: infoData.addEmployee.lastName,
          empPicture: infoData.addEmployee.empPicture,
          employeeId: infoData.addEmployee.employeeId
        }
      }).then((response) => {
        empNumberResponse = response.body.data.empNumber
      }).then(() => {
        cy.request({
          method: 'POST',
          url: '/web/index.php/api/v2/admin/users',
          body: {
            username: username,
            password: password,
            status: true,
            userRoleId: 2,
            empNumber: empNumberResponse
          }
        }).then((response) => {
          expect(response).property('status').to.eq(200);
        });
      }).then(() => {
        cy.request({
          method: 'POST',
          url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements',
          body: {
            empNumber: empNumberResponse,
            leaveTypeId: 9,
            fromDate: "2023-01-01",
            toDate: "2024-08-31",
            entitlement: "20"
          }
        }).then((response) => {
          expect(response).property('status').to.eq(200);
        });
      });
    })
  });



  it("logout and then login", () => {
    logout();
    login(username, password);
    cy.get('@leaveData').then((infoData: any) => {
      requestLeave(infoData.requestLeave.comment,
        infoData.requestLeave.duration,
        infoData.requestLeave.fromDate,
        infoData.requestLeave.leaveTypeId,
        infoData.requestLeave.partialOption,
        infoData.requestLeave.toDate);

      cy.then(() => {
        logout();
        login("Admin", "admin123");
        approveReject();
        logout();
        login(username, password);
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList")
        cy.get('@data').then((infoData1: any) => {
          checkDataInTable('.oxd-table', ["", `${infoData.requestLeave.fromDate} to ${infoData.requestLeave.toDate}`, `${infoData1.addEmployee.firstName} ${infoData1.addEmployee.middleName} ${infoData1.addEmployee.lastName}`]);

        })
      });
      logout();
      login("Admin", "admin123");

      cy.request({
        method: 'POST',
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies',
        body: {
          "name": "vacancy",
          "jobTitleId": 10,
          "employeeId": empNumberResponse,
          "numOfPositions": null,
          "description": "",
          "status": true,
          "isPublished": true
        }
      }).then((response) => {
        expect(response).property('status').to.equal(200)
        vacancyId = response.body.data.id;
        console.log(vacancyId)
      }).then(() => {
        cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy/${vacancyId}`)
        cy.get('.orangehrm-header-container  .oxd-button', { timeout: 30000 }).click({ force: true }).then(() => {
          cy.get('input[type=file]').selectFile("cypress/fixtures/file.txt", { force: true }).then(() => {
            cy.get('.oxd-table-loader > .oxd-loading-spinner-container').should("exist").then(() => {

              cy.get('.oxd-table-loader > .oxd-loading-spinner-container').should("not.exist").then(() => {


                cy.get('.oxd-form  .oxd-form-actions  .oxd-button--secondary').last().click({ force: true })
                cy.get('.oxd-table-card  .oxd-table-row', { timeout: 30000 }).contains('file.txt')
              })

            })
          })
        })
      })
    });
  })
});