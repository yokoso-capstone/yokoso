/// <reference types="cypress" />
// Example possible test suit using cypress

const location = 'vancouver'
const email = 'meganhong17@gmail.com'
const password = 'Capstone1'

describe('From index page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays correct h1 items by default', () => {
    cy.get('h1').should('have.length', 1)
    cy.get('h1').first().should('have.text', 'Discover yournew home')
  })

  it('displays searchbar by default', () => {
    cy.get('input').should('have.length', 1)
  })

  it('able to log in', () => {
    cy.contains('Get Started').click();
    cy.contains('Email').type(email);
    cy.contains('Password').type(password);
    cy.get('form').submit();
  })

  it('able to make new listing', () => {
    cy.contains('Get Started').click();
    cy.contains('Email').type(email);
    cy.contains('Password').type(password);
    cy.get('form').submit();
    cy.contains('Post Listing').click();
    cy.contains('House').click();
    cy.contains('Entire Building').click();
    cy.contains('Street Address').type('Bridlewood Drive');
    cy.contains('Unit Number').type('199');
    cy.get('.chakra-select').select('Ontario');
    cy.contains('Postal Code').type('K2M 2M4');
    cy.contains('City').type('Ottawa');
    cy.get('form').submit();
    // next page
    cy.contains('Rental Size').type('500');
    cy.get('[id^=privateBathrooms]').select('2');
    cy.get('[id^=sharedBathrooms]').select('2');
    cy.get('[id^=occupancy]').select('3');
    cy.get('[id^=furnishedStatus]').select('Furnished');
    cy.get('.chakra-form-control:nth-child(2) .chakra-switch__track').click();
    cy.contains('Rental Price').type('1000');
    cy.get('[id^=paymentFrequency]').select('Monthly');
    cy.get('[id^=leaseType]').select('Lease');
    cy.get('[name^=availabilityDate]').click();
    cy.get('.react-datepicker__week:nth-child(5)').click();
    cy.get('[id^=minLeaseDuration]').select('Monthly');
    cy.contains('Deposit Price').type('1000');
    cy.contains('Describe Additional Features').type('example feature');
    cy.contains('Describe Additional Utilities').type('example utility');
    cy.contains('Listing title').type('Example Title');
    cy.contains('Add Description').type('DescriptionDescriptionDescriptionDescriptionDescription');

    // Final submit not implemented because no delete listing function yet
    // cy.get('form').submit();
  })

  it('searchbar able to search for location', () => {
    cy.get('input').click()
    cy.get('input').type(location)
    cy.wait(1000)
    cy.get('.chakra-icon').click()  
  })

  context('with Vancouver searched', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/search?center=-123.113953&center=49.260872&place=Vancouver%2C+British+Columbia%2C+Canada&text=Vancouver')
    })

    it('selects sample listing', () => {
      cy.wait(4000)
      cy.contains('2bdrm').click()
      cy.wait(2000)
      cy.contains('Lease details')
      cy.contains('Amenities')
      cy.contains('Utilities')
      cy.contains('Reviews')
    })
  })
})
