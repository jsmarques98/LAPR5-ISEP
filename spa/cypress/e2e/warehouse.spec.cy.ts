beforeEach(() =>{
  cy.visit('/login')
  cy.get("#userEmail").type("admn.eletricgo@gmail.com");
  cy.get("#userPassword").type("eletricgo");
  cy.get("#loginbtn").click()
  cy.wait(1000)
})


describe('Create Warehouse', () => {
  it('Create a valid Warehouse', () => {

      cy.get('#createWarehouses').click()
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

    })

    it('Create a valid Warehouse but should throw a error warehouse is already in database', () => {

      cy.get('#createWarehouses').click()
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

    })

    it('Create an invalid Warehouse, (negative) latitude', () => {

      cy.get('#createWarehouses').click()
      cy.get("#warehouseId").type("36")
      cy.get("#warehouseDesignation").type("Armazém do João2")
      cy.get("#warehouseStreet").type("Rua de Matosinhos2")
      cy.get("#warehouseDoorNumber").type("36")
      cy.get("#warehousePostCode").type("4150-236")
      cy.get("#warehouseCity").type("Matosinhos2")
      cy.get("#warehouseLatitude").type("-1")
      cy.get("#warehouseLongitude").type("60.0")
      cy.get("#warehouseAltitude").type("60.0")
      cy.get("#createWarehouse").click()
      cy.wait(1000)

    })

  })

  
  describe('Get Warehouses', () => {
      it('Get all warehouses', () => {
      
        cy.get('#getWarehouses').click()
        cy.get("#find").click()
        cy.wait(1000)
      
      })
      
      it('Get all Warehouses and shows information of one warehouse', () => {
      
        cy.get('#getWarehouses').click()
        cy.get("#find").click()
        cy.contains("13").click()
        cy.wait(1000)
      
      })
      
        
      it('Get all Warehouses and delete one', () => {
      
        cy.get('#getWarehouses').click()
        cy.get("#find").click()
        cy.contains("13").click()
        cy.wait(1000)
        cy.get("#Delete").click()
        cy.wait(1000)
      
        })
  
  })
