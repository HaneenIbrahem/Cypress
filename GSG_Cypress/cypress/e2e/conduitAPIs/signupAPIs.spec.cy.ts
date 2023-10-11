
import addUser from '../../support/helpers/conduitAPI/signupHelper'
describe('Conduit : signup account', () => {
    it('C1: Conduit signup - create new account', () => {
        cy.request({
            method: 'POST',
            url: 'https://conduit.productionready.io/api/users',
            body: {
                user: {
                    username: `Haneen${Math.floor(Math.random() * 1000)}`,
                    email: `haneen${Math.floor(Math.random() * 1000)}@jake.jake`,
                    password: `jakejake`
                }
            }
        })
    })

    it('C2: Conduit - create new account', () => {
        addUser.conduitNewUserUsingAPI(`Haneen${Math.floor(Math.random() * 1000)}`, `haneen${Math.floor(Math.random() * 1000)}@jake.jake`, `123456h`)
    })
    it.only('C3: Conduit - create new account', () => {
        const apiPayload = {
            user: {
                username: `Haneen${Math.floor(Math.random() * 1000)}`,
                email: `haneen${Math.floor(Math.random() * 1000)}@jake.jake`,
                password: `1234785`
            }
        }
        addUser.conduitNewUserUsingAPI2(apiPayload)
    })

})