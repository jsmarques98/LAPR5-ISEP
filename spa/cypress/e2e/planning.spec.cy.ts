beforeEach(() =>{
  cy.visit('/login')
  cy.get("#userEmail").type("admn.eletricgo@gmail.com");
  cy.get("#userPassword").type("eletricgo");
  cy.get("#loginbtn").click()
  cy.wait(1000)
})



describe('Get planning', () => {
    it('Get planning genetic algorithm valid data', () => {
        
      cy.get("#geneticAlg").click()
      cy.get("#deliveryDate").type("2022-12-06")
      cy.get("#numGer").type("5")
      cy.get("#dimPop").type("2")
      cy.get("#perC").type("10")
      cy.get("#perM").type("15")
      cy.get("#refValue").type("3")
      cy.get("#check").click()

      cy.wait(1000)

    })

    it('Get planning genetic algorithm wrong data', () => {
        
      cy.get("#geneticAlg").click()
      cy.get("#deliveryDate").type("2021-12-06")
      cy.get("#numGer").type("5")
      cy.get("#dimPop").type("2")
      cy.get("#perC").type("10")
      cy.get("#perM").type("15")
      cy.get("#refValue").type("3")
      cy.get("#check").click()

      cy.wait(1000)

    })
  })
  