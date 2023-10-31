// import LoginPage from '../../support/pageObjects/loginPage'
import { login, logout, requestLeave, approveOrRejectLeave } from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'
import EditVacancyObj from '../../support/pageObjects/editVacancy'

const moment = require('moment');

const editVacancyObject: EditVacancyObj = new EditVacancyObj();

let empNumberResponse: number
let username = `HaneenIbrahem${Math.floor((Math.random() * 1000))}`;
let password = "haneen123";
let vacancyId: number;

describe('Leave Request Scenario', () => {
  beforeEach(() => {
    cy.fixture('addEmployee').as('data')
    cy.fixture('leave').as('leaveData')
    login("Admin", "admin123");

    cy.get('@data').then((infoData: any) => {

      cy.addEmployee(infoData.addEmployee.firstName, infoData.addEmployee.middleName, infoData.addEmployee.lastName, infoData.addEmployee.empPicture, infoData.addEmployee.employeeId).then((response) => {
        empNumberResponse = response.body.data.empNumber
      })

        .then(() => {
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
        })

        .then(() => {
          cy.get('@leaveData').then((dd: any) => {

            cy.leaveEntitlements(empNumberResponse, dd.leaveEntitlements.leaveTypeId, dd.leaveEntitlements.fromDate, moment().add(1, 'year').format('YYYY-MM-DD'), dd.leaveEntitlements.entitlement).then((response) => {
              expect(response).property('status').to.eq(200);
            });

          })
        });
    })
  });

  it("requestLeave and approve the request leave", () => {
    cy.logout()
    login(username, password);

    cy.get('@leaveData').then((infoData: any) => {

      requestLeave(infoData.requestLeave.comment, infoData.requestLeave.duration, infoData.requestLeave.fromDate, infoData.requestLeave.leaveTypeId, infoData.requestLeave.partialOption, infoData.requestLeave.toDate);

      cy.then(() => {

        cy.logout();
        login("Admin", "admin123");

        approveOrRejectLeave("APPROVE");

        cy.logout();
        login(username, password);

        // table assertion
        cy.visit("/web/index.php/leave/viewMyLeaveList")
        cy.get('@data').then((infoData1: any) => {
          
          checkDataInTable('.oxd-table', ["", `${infoData.requestLeave.fromDate} to ${infoData.requestLeave.toDate}`, `${infoData1.addEmployee.firstName} ${infoData1.addEmployee.middleName} ${infoData1.addEmployee.lastName}`]);

        })
      });

      cy.logout();
      login("Admin", "admin123");

      cy.addVacancy(infoData.addVacancy.name, infoData.addVacancy.jobTitleId, empNumberResponse, infoData.addVacancy.numOfPositions, infoData.addVacancy.description, infoData.addVacancy.status, infoData.addVacancy.isPublished)

        .then((response) => {
          expect(response).property('status').to.equal(200)
          vacancyId = response.body.data.id;
        })

        .then(() => {
          cy.visit(`/web/index.php/recruitment/addJobVacancy/${vacancyId}`)

          editVacancyObject.addAttachment("cypress/fixtures/file.txt")

          checkDataInTable('.oxd-table', ["", "file.txt"]);

        })
    });
  })
});