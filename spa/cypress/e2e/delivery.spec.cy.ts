beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe('Created truck', () => {
    it('Visits the initial project page', () => {
        
      cy.visit('/createDeliveries')
      cy.get("#deliveryId").type("100")
      cy.get("#deliveryWarehouseId").type("1")
      cy.get("#deliveryDate").type("2022-12-10")
      cy.get("#deliveryLoadTime").type("7")
      cy.get("#deliveryUnloadTime").type("10")
      cy.get("#deliveryTotalWeight").type("199")
      cy.get("#createDelivery").click()
      cy.wait(1000)
      cy.visit('/getDeliveries')
      cy.get("#find").click()
      cy.wait(1000)
      cy.contains("100").click()
      cy.wait(1000)
      cy.get("#delete").click()
    })
  })
  