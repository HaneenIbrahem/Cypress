import LoginPage from '../../pageObjects/loginPage'

const loginObj: LoginPage = new LoginPage();

const baseUrl = Cypress.config().baseUrl
let leaveId: number

export const URLs = {
    users: `${baseUrl}/api/users`,
    leaveRequests: `${baseUrl}/web/index.php/api/v2/leave/leave-requests`,
    // approvereject: `${baseUrl}/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`
}

export function login(username: string, password: string) {
    loginObj.login(username, password);
  }

export function logout(){
    loginObj.logout()
  }

export function requestLeave(comment: string, duration:any, fromDate: string, leaveTypeId: number, partialOption: string, toDate: string){
    cy.request({
        method: 'POST',
        url: URLs.leaveRequests,
        body: {
            comment: comment,
            duration: duration,
            fromDate: fromDate,
            leaveTypeId: leaveTypeId,
            partialOption: partialOption,
            toDate: toDate,
        }
      }).then((response) => {
        // console.log(response)
        leaveId = response.body.data.id;
      });
}



export function approveReject(){
  cy.request({
      method: 'PUT',
      url: `${baseUrl}/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
      body: {
        action: "APPROVE"
      }
    })
}
