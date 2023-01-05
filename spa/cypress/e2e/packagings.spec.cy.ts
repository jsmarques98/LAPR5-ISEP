beforeEach(() =>{
    cy.visit('/login')
    cy.get("#userEmail").type("admn.eletricgo@gmail.com");
    cy.get("#userPassword").type("eletricgo");
    cy.get("#loginbtn").click()
    cy.wait(1000)
})

    
describe('Get Packaging', () => {
    it('Get all Packaging and shows information of one Packaging', () => {
      cy.get('#getPackagings').click()
      cy.get("#find").click()
      cy.contains("1").click()
      
    })

    it('Get all Packaging and order by date ', () => {
        cy.get('#getPackagings').click()
        cy.get("#find").click()
        cy.wait(1000)
        cy.get("#orderByDate").click()
        
      })

      it('Get all Packaging and order by date ', () => {
        cy.get('#getPackagings').click()
        cy.get("#find").click()
        cy.wait(1000)
        cy.get("#orderByWarehouse").click()
        
      })


  })

