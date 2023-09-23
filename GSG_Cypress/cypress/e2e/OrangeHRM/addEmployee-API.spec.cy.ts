import LoginPage from '../../support/pageObjects/loginPage'
import AddEmployee from '../../support/pageObjects/addNewEmployeeWithTableAssertion'

const loginObj: LoginPage = new LoginPage();
const addEmpObj: AddEmployee = new AddEmployee();

// let random: Number 
let employeeFullName: string
let employeeId: number

describe("Visit orangeHRM", () => {

  beforeEach("Add new user", () => {
    cy.fixture('addEmployee').as('data')
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    loginObj.login("Admin", "admin123");

    cy.request({
      method: 'POST',
      url: '/web/index.php/api/v2/admin/users',
      body: {
        username: `HaneenIbrahem${Math.floor((Math.random() * 1000))}`,
        password: "haneen123",
        status: true,
        userRoleId: 2,
        empNumber: 80
      }
    }).then((response) => {
      expect(response).property('status').to.eq(200);
      const { firstName, middleName, lastName, empNumber } = response.body.data.employee;
      employeeId = response.body.data.employee.employeeId;
      console.log(employeeId)
      const employeeName = `${firstName} ${lastName}`
      employeeFullName = `${firstName} ${middleName} ${lastName}`
      const employeePageUrl = `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`;
      cy.visit(employeePageUrl);
      cy.contains(employeeName).should('exist');

    });
  })


  it("Perform Employee Details Test", () => {
    cy.get('@data').then((infoData: any) => {
      addEmpObj.addEmployeeDetails(
        infoData.Personal_Details.Nickname,
        infoData.Personal_Details.Driver_License_Number,
        infoData.Personal_Details.License_Expiry_Date,
        infoData.Personal_Details.SSN_Number,
        infoData.Personal_Details.SIN_Number,
        infoData.Personal_Details.Nationality,
        infoData.Personal_Details.Marital_Status,
        infoData.Personal_Details.Date_of_Birth,
        infoData.Personal_Details.Gender,
        infoData.Personal_Details.Smoker,
      )
    })
  });

  it("Add job details", () => {
    cy.get('@data').then((infoData: any) => {
      addEmpObj.addJobDetails(
        infoData.Job_Details.Joined_Date,
        infoData.Job_Details.Job_Title,
        infoData.Job_Details.Job_Category,
        infoData.Job_Details.Sub_Unit,
        infoData.Job_Details.Location,
        infoData.Job_Details.Employment_Status,
      )
    })
  })

  it("Add report to details", () => {
    cy.get('@data').then((infoData: any) => {
      addEmpObj.addReportTo(
        infoData.Report_to.Name,
        infoData.Report_to.Reporting_Method
      )
    })
  })

  it("search user", () => {
    cy.get('@data').then((infoData: any) => {
      addEmpObj.searchEmployee(
        employeeId,
        infoData.fullName.firstAndMiddleName,
        infoData.fullName.lastName,
        infoData.Job_Details.Job_Title,
        infoData.Job_Details.Employment_Status,
        infoData.Job_Details.Sub_Unit,
        infoData.Report_to.Name,
      )
    })
  });

});