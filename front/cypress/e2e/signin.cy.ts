describe('Page de connexion',() =>{
    beforeEach(() =>{
        cy.visit('/')
    })
    it("Devrait permettre à l'utilisateur bénévole de se connecter", () => {
        cy.get('#email').type('test@test.fr')
        cy.get('#password').type('Ludo9806.')
        cy.get('#signin_form').submit()
        cy.url().should('include', '/benevole')
    })
})