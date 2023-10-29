

class buzz {

    elements = {
      MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
      PostInput: () => cy.get('.oxd-buzz-post-input'),
      PostButton: () =>  cy.get('.oxd-buzz-post-slot > .oxd-button'),
      
    }
  
    Buzz(){
        this.elements.MainMenuItems().contains('Buzz').click();
        
    }
    NewPost(postText: string){
        this.elements.PostInput().type(postText);
        this.elements.PostButton().click({force: true});
    }
  
  }
  export default buzz;