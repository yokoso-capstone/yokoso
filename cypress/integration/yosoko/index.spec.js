/// <reference types="cypress" />
// Example possible test suit using cypress

describe('From index page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays correct hi items by default', () => {
    cy.get('h1.css-t3mas8').should('have.length', 1)
    cy.get('h1.css-t3mas8').first().should('have.text', 'Discover yournew home')
  })

  it('displays searchbar by default', () => {
    cy.get('input').should('have.length', 1)
  })

  it('searchbar able to search for location', () => {
    const location = 'vancouver'
    cy.get('.mapboxgl-ctrl-geocoder--input').click()
    cy.get('.mapboxgl-ctrl-geocoder--input').type(location)
    cy.wait(1000)
    cy.get('.chakra-icon').click()  
  })

  context('with Vancouver searched', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/search?center=-123.113953&center=49.260872&place=Vancouver%2C+British+Columbia%2C+Canada&text=Vancouver')
    })

    it('selects sample listing', () => {
      cy.wait(4000)
      cy.get('.chakra-link:nth-child(1) > .css-1gf96ne .css-vp41ck').click()
      cy.wait(2000)
      cy.get('.css-0:nth-child(5) > .css-11y6jzv').should('have.text', 'Lease details')
    })
  })
})
