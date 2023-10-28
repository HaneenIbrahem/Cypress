import { login, logout} from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'


let empNumberResponse: number
let username = `HaneenIbrahem`;
let password = "haneen123";
let sheetId: number;
let eId: number;

describe('Timesheet Scenario', () => {
    beforeEach(() => {
        cy.fixture('addEmployee').as('data')
        cy.visit("/web/index.php/auth/login");
        login("Admin", "admin123");

        cy.get('@data').then((infoData: any) => {
            cy.request({  // new employee
                method: 'POST',
                url: '/web/index.php/api/v2/pim/employees',
                body: {
                    firstName: infoData.addEmployee.firstName,
                    middleName: infoData.addEmployee.middleName,
                    lastName: infoData.addEmployee.lastName,
                    empPicture: infoData.addEmployee.empPicture,
                    employeeId: infoData.addEmployee.employeeId
                }
            }).then((response) => {
                empNumberResponse = response.body.data.empNumber
                eId = response.body.data.employeeId;
                console.log("hi")
                console.log(eId)
            }).then(() => {
                cy.request({  // new user
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
            });
        })
    });


    it("create new timesheet for the employee and assertion", () => {
        logout();
        login(username, password);
        cy.visit('/web/index.php/time/viewMyTimesheet')
        cy.api({  // to get sheetId
            method: 'GET',
            url: '/web/index.php/api/v2/time/timesheets/default?date=2023-10-28',
        }).then((response) => {
            sheetId = response.body.data.id
            console.log(response)
            cy.api({  // edit the sheet
                method: 'PUT',
                url: `/web/index.php/api/v2/time/timesheets/${sheetId}/entries`,
                body: {
                    "entries": [
                        {
                            projectId: 2,
                            activityId: 11,
                            dates: {
                                "2023-10-28": { "duration": "09:00" }
                            }
                        }
                    ],
                    deletedEntries: []
                }
            }).then(() => {
                cy.api({ // submit the sheet
                    method: 'PUT',
                    url: `/web/index.php/api/v2/time/timesheets/${sheetId}`,
                    body: { "action": "SUBMIT" }
                })
                logout()
                cy.wait(1000)
                login("admin", "admin123")
                cy.get('.oxd-sidepanel-body').contains('Time').click();
                cy.get('li.oxd-topbar-body-nav-tab.--parent.--visited span.oxd-topbar-body-nav-tab-item:contains("Timesheets")').click();
                cy.contains('Employee Timesheet').click({ force: true })
                // assertion the data exist in the table
                cy.get('@data').then((infoData1: any) => {
                    checkDataInTable('.oxd-table', [`${infoData1.addEmployee.firstName} ${infoData1.addEmployee.middleName} ${infoData1.addEmployee.lastName}`]);

                })
            })
        })
    })

        afterEach(() => {
        cy.api({ // delete the created employee
            method: 'DELETE',
            url: `/web/index.php/api/v2/pim/employees`,
            body: {
                ids: [empNumberResponse]
            }
        })
      });
});