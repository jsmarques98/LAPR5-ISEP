beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe('Created truck', () => {
    it('Visits the initial project page', () => {
      cy.visit('/createTrucks')
      cy.get("#truckId").type("23")
      cy.get("#plate").type("24-MT-77")
      cy.get("#name").type("POPO DO ZE")
      cy.get("#autonomy").type("100")
      cy.get("#maxBattery").type("100")
      cy.get("#payLoad").type("1000")
      cy.get("#tare").type("2000")
      cy.get("#BaterryChargingTime").type("60")
      cy.get("#createTruck").click()
      cy.wait(1000)
      cy.visit('/getTrucks')
      cy.get("#find").click()
      cy.wait(1000)

      cy.contains("24-MT-77").click()
      cy.wait(1000)
      cy.get("#Delete").click()
      
    })
  })
  