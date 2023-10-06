
const baseUrl = Cypress.config().baseUrl

export const URLs = {
    users: `${baseUrl}/api/users`
}

export default class addUser{
    static conduitNewUserUsingAPI(username: string, email: string, password: string){
        cy.api({
            method: 'POST',
            url: URLs.users,
            body: {
                user: {
                    username: username,
                    email: email,
                    password: password
                }
            }
        })
    }

    static conduitNewUserUsingAPI2(payload: any){
        return cy.api({
            method: 'POST',
            url: URLs.users,
            body: payload
        })
    }
}