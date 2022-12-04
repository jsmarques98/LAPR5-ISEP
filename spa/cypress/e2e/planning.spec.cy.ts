beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe('Created truck', () => {
    it('Visits the initial project page', () => {
        
      cy.visit('/createPackagings')
      cy.get("#packagingId").type("100")
      cy.get("#packagingDeliveryId").type("4445")
      cy.get("#packagingTruckId").type("2022-12-10")
      cy.get("#packagingPositionX").type("7")
      cy.get("#packagingPositionY").type("10")
      cy.get("#packagingPositionZ").type("199")
      cy.get("#createPackaging").click()
      cy.wait(1000)

    })
  })
  