beforeEach(() =>{
  cy.visit('/login')
  cy.get("#userEmail").type("admn.eletricgo@gmail.com");
  cy.get("#userPassword").type("eletricgo");
  cy.get("#loginbtn").click()
  cy.wait(1000)
})


describe('Create deliveries', () => {
  it('Create delivery valid', () => {

    cy.get('#createDeliveries').click()
    cy.get("#deliveryId").type("100")
    cy.get("#selectWarehouse").select("Arouca")
    cy.get("#deliveryDate").type("2022-12-10")
    cy.get("#deliveryLoadTime").type("7")
    cy.get("#deliveryUnloadTime").type("10")
    cy.get("#deliveryTotalWeight").type("199")
    cy.get("#createDelivery").click()
    cy.wait(1000)


  })



  it('Create delivery valid but should get error because delivery is already on database', () => {

    cy.get('#createDeliveries').click()
    cy.get("#deliveryId").type("100")
    cy.get("#selectWarehouse").select("Arouca")
    cy.get("#deliveryDate").type("2022-12-10")
    cy.get("#deliveryLoadTime").type("7")
    cy.get("#deliveryUnloadTime").type("10")
    cy.get("#deliveryTotalWeight").type("199")
    cy.get("#createDelivery").click()
    cy.wait(1000)

    
  })

  it('Create delivery invalid LoadTime (negative)', () => {

    cy.get('#createDeliveries').click()
    cy.get("#deliveryId").type("100")
    cy.get("#selectWarehouse").select("Arouca")
    cy.get("#deliveryDate").type("2022-12-10")
    cy.get("#deliveryLoadTime").type("-1")
    cy.get("#deliveryUnloadTime").type("10")
    cy.get("#deliveryTotalWeight").type("199")
    cy.get("#createDelivery").click()
    cy.wait(1000)

    
  })

})


describe('Get Deliveries', () => {
  it('Get all deliveries', () => {

    cy.get('#getDeliveries').click()
    cy.get("#find").click()
    cy.wait(1000)

  })

  it('Get all Deliveries and shows information of one Delivery', () => {

    cy.get('#getDeliveries').click()
    cy.get("#find").click()
    cy.contains("100").click()
    cy.wait(1000)

  })

  
  it('Get all Deliveries and delete one', () => {

    cy.get('#getDeliveries').click()
    cy.get("#find").click()
    cy.contains("100").click()
    cy.wait(1000)
    cy.get("#delete").click()
    cy.wait(1000)

  })

})


  