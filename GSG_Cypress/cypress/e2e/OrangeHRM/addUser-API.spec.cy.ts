import LoginPage from '../../support/pageObjects/loginPage'

const loginObj : LoginPage = new LoginPage();
let random:Number=(Math.random()*1000)
let idResponse:Number;
describe("Visit orangeHRM", () => {
    beforeEach(function (){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        loginObj.login("Admin", "admin123");
    })
    
    //API
    // it("Verify locations response", () => {
    //     cy.request('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').then((response) => {
    //   expect(response.status).to.eq(200); // Replace with the expected status code
    // });
    // })

    // it("Verify dashboard response", () => {
    //     cy.request('web/images/dashboard_empty_widget_watermark.png').then((response) => {
    //   expect(response.status).to.eq(200); 
    // });
    // })

    it("add user via API", () => {
        cy.request({
          method: 'POST',
          url: '/web/index.php/api/v2/admin/users', 
          body: {
            username: "test  ss",
            password: "admin123", 
            status: true, 
            userRoleId: 1,
            empNumber: 149
          }
        }).then((response) => {
            idResponse = response.body.data.id
            console.log(response.body.data.id)
          expect(response).property('status').to.eq(200); 
        });
        
      });

      afterEach(()=>{
        cy.request({
           method:"DELETE",
           url:"/web/index.php/api/v2/admin/users",
           body:{
               ids:[idResponse]
           }
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
   });
    
    
  });
  


