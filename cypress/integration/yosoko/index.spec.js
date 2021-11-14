/// <reference types="cypress" />

// Example possible test suit using cypress

const location = "Vancouver";
const email = "meganhong17@gmail.com";
const password = "Capstone1";

const address = "Bridlewood Drive";
const unit = "199";
const province = "Ontario";
const postalCode = "K2M 2M4";
const city = "Ottawa";

const feature = "Example feature";
const utility = "Example utility";
const title = "Example Title";
const description = "Example description";

describe("From index page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays correct h1 items by default", () => {
    cy.get("h1").should("have.length", 1);
    cy.get("h1").first().should("have.text", "Discover yournew home");
  });

  it("displays searchbar by default", () => {
    cy.get("input").should("have.length", 1);
  });

  it("able to log in", () => {
    cy.contains("Get Started").click();
    cy.contains("Email").type(email);
    cy.contains("Password").type(password);
    cy.get("form").submit();
  });

  it("able to make new listing", () => {
    cy.contains("Get Started").click();
    cy.contains("Email").type(email);
    cy.contains("Password").type(password);
    cy.get("form").submit();

    cy.contains("Email", { timeout: 2000 }).should("not.exist");
    cy.contains("Post Listing").click();
    cy.contains("House").click();
    cy.contains("Entire Building").click();
    cy.contains("Street Address").type(address);
    cy.contains("Unit Number").type(unit);
    cy.get(".chakra-select").select(province);
    cy.contains("Postal Code").type(postalCode);
    cy.contains("City").type(city);
    cy.get("form").submit();
    // next page
    cy.contains("Rental Size", { timeout: 2000 });
    cy.contains("Rental Size").type("500");
    cy.get("[id^=bedrooms]").select("2");
    cy.get("[id^=bathrooms]").select("2");
    cy.get("[id^=furnishedStatus]").select("Furnished");
    cy.get(".chakra-form-control:nth-child(2) .chakra-switch__track").click();
    cy.contains("Rental Price").type("1000");
    cy.get("[id^=paymentFrequency]").select("Monthly");
    cy.get("[id^=leaseType]").select("Lease");
    cy.get("[name^=availabilityDate]").click();
    cy.get(".react-datepicker__week:nth-child(5)").click();
    cy.get("[id^=minLeaseDuration]").select("Monthly");
    cy.contains("Deposit Price").type("1000");
    cy.contains("Describe Additional Features").type(feature);
    cy.contains("Describe Additional Utilities").type(utility);
    cy.contains("Listing title").type(title);
    cy.contains("Add Description").type(description);

    // Final submit not implemented because no delete listing function yet
    // cy.get('form').submit();
  });

  it("searchbar able to search for location", () => {
    cy.get("input").click();
    cy.get("input").type(location);
    cy.contains(location, { timeout: 1000 });
    cy.get(".chakra-icon").click();
  });

  context("with Vancouver searched", () => {
    beforeEach(() => {
      cy.visit(
        "http://localhost:3000/search?center=-123.113953&center=49.260872&place=Vancouver%2C+British+Columbia%2C+Canada&text=Vancouver"
      );
      cy.intercept(
        "POST",
        "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?**"
      ).as("getDatabase");
      cy.wait("@getDatabase", { timeout: 10000 });
    });

    it("selects sample listing", () => {
      cy.location("pathname").should("include", "/search");
      cy.contains("2bdrm").click();
      cy.location("pathname", { timeout: 5000 }).should("include", "/listings");
      cy.contains("Lease details");
      cy.contains("Amenities");
      cy.contains("Utilities");
      cy.contains("Reviews");
      cy.contains("Contact");
    });
  });
});
