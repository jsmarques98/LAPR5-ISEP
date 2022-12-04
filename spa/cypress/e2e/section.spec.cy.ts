beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe('Created truck', () => {
    it('Visits the initial project page', () => {
        
      cy.visit('/createSections')
      cy.get("#sectionId").type("100")
      cy.get("#warehouseOrigin").type("1")
      cy.get("#warehouseDestiny").type("2")
      cy.get("#duration").type("80")
      cy.get("#distance").type("100")
      cy.get("#energySpent").type("50")
      cy.get("#extraTime").type("50")
      cy.get("#createSection").click()
      cy.wait(1000)
      cy.visit('/getSections')
      cy.get("#getSections").click()
      cy.wait(1000)
      cy.contains("1 to 2").click()
      cy.wait(1000)
      cy.get("#delete").click()

    })
  })
  