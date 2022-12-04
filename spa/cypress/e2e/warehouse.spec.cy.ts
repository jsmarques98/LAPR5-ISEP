beforeEach(() =>{
    cy.visit('/')
    cy.wait(1000)
})


describe('Create Warehouse', () => {
    it('Visits the initial project page', () => {
      cy.visit('/createWarehouses')
      cy.get("#warehouseId").type("35")
      cy.get("#warehouseDesignation").type("Armazém do João")
      cy.get("#warehouseStreet").type("Rua de Matosinhos")
      cy.get("#warehouseDoorNumber").type("35")
      cy.get("#warehousePostCode").type("4150-224")
      cy.get("#warehouseCity").type("Matosinhos")
      cy.get("#warehouseLatitude").type("60.0")
      cy.get("#warehouseLongitude").type("60.0")
      cy.get("#warehouseAltitude").type("60.0")
      cy.get("#createWarehouse").click()
      cy.wait(1000)
      cy.visit('/getWarehouses')
      cy.get("#getWarehouses").click()
      cy.wait(1000)

      cy.contains("35").click()
      cy.wait(1000)
      cy.get("#Delete").click()



    })
  })