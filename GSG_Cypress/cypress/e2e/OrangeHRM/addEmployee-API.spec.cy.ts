import LoginPage from '../../pageObjects/loginPage'
import AddEmployee from '../../pageObjects/addEmployee'

const loginObj : LoginPage = new LoginPage();
const addEmpObj : AddEmployee = new AddEmployee();

let random:Number=(Math.random()*1000)
let employeeFullName: string

//Add new Employee using API as a prerequisite
describe("Visit orangeHRM", () => {
  
    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        loginObj.login("Admin", "admin123");

        
    })
    // test to search by name
    it("search user", () => {
      cy.request({
        method: 'POST',
        url: '/web/index.php/api/v2/admin/users', 
        body: {
          username: `HaneenIbrahem${random}`, 
          password: "haneen123", 
          status: true, 
          userRoleId: 2, 
          empNumber: 67
      }
      }).then((response) => {
        expect(response).property('status').to.eq(200); 
        const{firstName, middleName, lastName, empNumber} = response.body.data.employee;
        const employeeName = `${firstName} ${lastName}` 
        employeeFullName = `${firstName} ${middleName} ${lastName}` 
        const employeePageUrl = `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`;
        console.log(response)
        cy.visit(employeePageUrl);
        cy.contains(employeeName).should('exist');
        
      });
    });
    
    //search
    // const searchFields = [
    //   { key: 'EName', value: 'John Doe' }, // Replace with actual field names and values
    //   // Add more search fields here as needed
    // ];
  
    // searchFields.forEach((field) => {
    //   it(`search user by ${field.key}`, () => {
    //     cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    //     addEmpObj.searchEmployee(field.key, field.value);
    //   });
    // });
  
  });