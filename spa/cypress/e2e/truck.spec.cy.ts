beforeEach(() =>{
    cy.visit('/login')
    cy.get("#userEmail").type("admn.eletricgo@gmail.com");
    cy.get("#userPassword").type("eletricgo");
    cy.get("#loginbtn").click()
    cy.wait(1000)
})


describe('Create trucks', () => {
    it('Create truck valid', () => {

      cy.get('#createTrucks').click()
      cy.get("#plate").type("24-MT-77")
      cy.get("#name").type("POPO DO ZE")
      cy.get("#autonomy").type("100")
      cy.get("#maxBattery").type("100")
      cy.get("#payLoad").type("1000")
      cy.get("#tare").type("2000")
      cy.get("#BaterryChargingTime").type("60")
      cy.get("#createTruck").click()
      cy.wait(1000)

      
    })

    it('Create truck valid but should get error because truck is already on database', () => {

      cy.get('#createTrucks').click()
      cy.get("#plate").type("24-MT-77")
      cy.get("#name").type("POPO DO ZE")
      cy.get("#autonomy").type("100")
      cy.get("#maxBattery").type("100")
      cy.get("#payLoad").type("1000")
      cy.get("#tare").type("2000")
      cy.get("#BaterryChargingTime").type("60")
      cy.get("#createTruck").click()
      cy.wait(1000)

      
    })

    it('Create truck invalid tare (negative)', () => {

      cy.get('#createTrucks').click()
      cy.get("#plate").type("24-MT-77")
      cy.get("#name").type("POPO DO ZE")
      cy.get("#autonomy").type("100")
      cy.get("#maxBattery").type("100")
      cy.get("#payLoad").type("1000")
      cy.get("#tare").type("-1")
      cy.get("#BaterryChargingTime").type("60")
      cy.get("#createTruck").click()
      cy.wait(1000)

      
    })

  })
  

  describe('Get trucks', () => {
    it('Get all trucks', () => {

      cy.get('#getTrucks').click()
      cy.get("#find").click()
      cy.wait(1000)

    })

    it('Get all trucks and shows information of one truck', () => {

      cy.get('#getTrucks').click()
      cy.get("#find").click()
      cy.contains("24-MT-77").click()
      cy.wait(1000)

    })

    it('Get all trucks and deactivate one', () => {

      cy.get('#getTrucks').click()
      cy.get("#find").click()
      cy.contains("24-MT-77").click()
      cy.wait(1000)
      cy.get("#Inactive").click()
      cy.wait(1000)

    })

    it('Get all trucks and activate one', () => {

      cy.get('#getTrucks').click()
      cy.get("#find").click()
      cy.contains("24-MT-77").click()
      cy.wait(1000)
      cy.get("#Activate").click()
      cy.wait(1000)

    })

    it('Get all trucks and delete one', () => {

      cy.get('#getTrucks').click()
      cy.get("#find").click()
      cy.contains("24-MT-77").click()
      cy.wait(1000)
      cy.get("#Delete").click()
      cy.wait(1000)

    })

  })

