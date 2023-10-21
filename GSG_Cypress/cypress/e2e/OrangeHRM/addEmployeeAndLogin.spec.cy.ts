import LoginPage from '../../support/pageObjects/loginPage'
import AddEmployee from '../../support/pageObjects/addNewEmployeeWithTableAssertion'

const loginObj: LoginPage = new LoginPage();
// const addEmpObj: AddEmployee = new AddEmployee();

let empNumberResponse: number
let username = `HaneenIbrahem${Math.floor((Math.random() * 1000))}`;
let password= "haneen123";
describe("Add new employee then login with the employee", () => {

  beforeEach("Add new user", () => {
    cy.fixture('addEmployee').as('data')
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    loginObj.login("Admin", "admin123");

    cy.request({
      method: 'POST',
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
      body: {
        firstName: `Haneen`,
        middleName: "M",
        lastName: 'Ibrahem',
        empPicture: null,
        employeeId: '0654'
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
    })
  })
 

  it("logout and then login", () => {
    cy.get('.oxd-userdropdown-tab').click({force: true})
    cy.contains('Logout').click({ force: true })
    loginObj.login(username, password);
  })
})












// import LoginValidation from "../../support/pageObjects/loginPage"; 
// const loginObjValidation: LoginValidation = new LoginValidation(); 
// import PIM from "../support/pageObjects/PIM" 
// const pimObject: PIM = new PIM(); 
// describe("Login Home Page", () => { 
//     beforeEach(function () { 
//         cy.fixture('login').as('data') 
//         cy.fixture('employeeInfo').as('EmpInfo') 
//         cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"); 
//         cy.get('@data').then((infoData: any) => { 
//             loginObjValidation.fillData(infoData.valid.name, infoData.valid.password) 
//             loginObjValidation.checkPage(infoData.valid.message) 
//         }) 
//     }) 
 
 
//     it("Add new Employee via API", () => { 
         
//         cy.get('@EmpInfo').then((infoData: any) => { 
//             let firstName=infoData.user.firstName+Math.floor((Math.random()*1000)); 
//             pimObject.addNewEmployee_API(firstName, infoData.user.middleName, infoData.user.lastName, infoData.user.id,infoData.user.password).then(() => { 
//                 loginObjValidation.fillData(firstName, infoData.user.password) 
//             }) 
 
//         }); 
 
//     }) 
 
// })