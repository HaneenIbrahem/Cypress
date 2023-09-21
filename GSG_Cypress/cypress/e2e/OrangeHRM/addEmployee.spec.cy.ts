import AddEmployee from '../../pageObjects/addEmployee'
import LoginPage from '../../pageObjects/loginPage'

const loginObj : LoginPage = new LoginPage();
const addEmp : AddEmployee = new AddEmployee();

let random:Number=(Math.random()*1000)

describe("add employee", () => {

    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        loginObj.login("Admin", "admin123");
    })

    it("Add new employee", () => {
        addEmp.addNewEmployee(`Haneen${random}`, "M", "Ibrahem", `HaneenIbrahem${random}`, "haneen123", "haneen123");
    })

    // it("", () => {
    //     addEmp.searchEmployee([{ key: 'Id', value: '12345' }]);
    // })
})