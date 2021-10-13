/// <reference types="cypress" />
describe('Access Test Instance (Google maps page)', () => {
    it('Navigate to the Endpoint and dismiss any popups or blocking elements', () => {
        
        cy.visit('https://www.google.com/maps/place/Gardens+by+the+Bay/@1.2815683,103.8614245,17z/data=!3m1!4b1!4m5!3m4!1s0x31da1904937e1633:0x62099677b59fca76!8m2!3d1.2815683!4d103.8636132')
        cy.wait(4000)

        //Collapse the side panel
        cy.xpath(`(//button[@aria-label='Collapse side panel'])[5]`).click()
    
        })
  })

  describe('Click and drag the map to pan it', () => {
    it('Click on the canvas and drag it to verify its frame change and canvas motion', () => {
    
    // Wait for the elements to be displayed
    cy.wait(1000)

    // Trigger events directly within the canvas to simulate click and pan
    cy.xpath(`//canvas`)
    .trigger('mousedown', { button: 0 })
    .wait(1500)
    .trigger('mousemove', {
     clientX: 400,
     clientY: 90,
     screenX: 400,
     screenY: 90,
     pageX: 400,
     pageY: 90
    })
    .trigger('mousemove','center')
    .wait(2000)
    .trigger('mouseup', { force: true })

    // Double click to zoon into the page to get a better image of the element (Parks, beaches and rivers)
    .dblclick()
      

    })
  })


  describe('Click on Marina Bay Sands Singapore and close side bar displayed', () => {
    it('Click on marina bay sands singapore', () => {
    
    
    cy.wait(3000)
    cy.xpath(`//canvas`).then($canvas => {
      // Retrieve Canvas Dimensions from DOM
      const canvasWidth = $canvas.width()
      const canvasHeight = $canvas.height()

      // Get the center of the canvas by dividing each dimension by 2
      const canvasCenterX = canvasWidth / 2;
      const canvasCenterY = canvasHeight /2;

      // Get the exact location of 'Marina Bay Sands Singapore' (No matter the screen size)
      const buttonX = canvasCenterX + canvasCenterX/3.2
      const buttonY = canvasCenterY - canvasCenterY/3.6

      //Wrap the canvas and scroll into its view to interact with elements within it via coordinates
      cy.wrap($canvas)
      .scrollIntoView()

      //Click on the location of 'Marina Bay Sands Singapore' and wait for the sidebar to load
      .click(buttonX,buttonY)
      .wait(3000)

      // Verify that the Marina Bay Sands Singapore Marker was selected and the Correct popup is shown in the sidebar
      cy.xpath(`//span[text()='Marina Bay Sands Singapore']`).should('contain.text','Marina Bay Sands Singapore')
      .wait(500)
      // Dismiss the side bar so only the map canvas is shown
      cy.xpath(`(//button[@aria-label='Collapse side panel'])[5]`).click()
      


    })
      

    })
  })


  describe('Verify that the Rivers, parks and beaches are drawn correctly', () => {
    it('Check that the Rivers, the Parks and the Beaches are well drawn', () => {
    cy.wait(5000)

    cy.matchImageSnapshot("Baseline Image", {failureThreshold: 0.05,
      failureThresholdType: 'percent'});
    
    
      

    })
  })
