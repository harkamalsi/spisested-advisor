// If you want to run test against the production build, uncomment the line below and comment the line under it
//const url = "it2810-02.idi.ntnu.no/prosjekt3";
const url = "localhost:3000";

describe("Visit the url", () => {
  it("Visits the Smiley App at " + url, () => {
    cy.visit(url);
  });
});

describe("Test search functionality", () => {
  it("Clicks the link button 'Flere filter'", () => {
    cy.contains("Flere").click();
    cy.contains("Færre");
  });

  it("Searches for 'kebab' and response contains 'kebab'", () => {
    // Checks is the default text is shown when a search has not yet been made
    cy.get("#Table").should("include.text", "Søkeresultater listes her");

    // type "kebab" in the search field and then click the search button
    cy.get('input[placeholder="Navn"]')
      .type("kebab")
      .should("have.value", "kebab");

    cy.get("#SearchButton").click();

    // check if the result set displayed in the list contains "kabab"
    cy.get("#Table").should("include.text", "kebab");
  });

  it("Seaches for 'Egon', with filter on location equal to 'Trondheim', and recieves an appropriate response", () => {
    // replace the value of search field with "Egon"
    cy.get('input[placeholder="Navn"]')
      .clear()
      .type("Egon")
      .should("have.value", "Egon");

    // Add filter on city Trondheim
    cy.get("#react-select-3-input").type("Trondheim{enter}", { force: true });
    cy.get(".css-12jo7m5").should("have.text", "Trondheim");

    cy.get("#SearchButton").click();

    // Check if all results have address equal to Trondheim
    cy.get(".Row").each($el => {
      cy.wrap($el.children("#AdressCell")).should("have.text", "Trondheim");
    });
  });

  it("Searches an empty search, but with filter only on sad-face and 'Oslo'", () => {
    cy.get('input[placeholder="Navn"]')
      .clear()
      .should("be.empty");

    cy.get("#react-select-3-input")
      .clear()
      .type("Oslo{enter}", { force: true });

    cy.get(".css-12jo7m5").should("have.text", "Oslo");

    // Add filter on Sad face (Sur)
    cy.get("#react-select-4-input").type("Sur{enter}", { force: true });

    cy.get(".css-12jo7m5").should("include.text", "Sur");

    cy.get("#SearchButton").click();

    // Check if the resultset in the list only contains restaurants with Sad Face.
    cy.get(".Row").each($el => {
      cy.wrap(
        $el
          .children("#SmileyCell")
          .children(".CompleteSmiley")
          .children("img")
      ).should("have.attr", "alt", "Sad Face");
    });
  });
});


describe("Give a raiting", () => {
  it("Gives the resturant Fagn a rating and check the rating gets updated", () => {
    // A function for reloading the page, which is necessary in order to check if the rating has updated
    function reloadPage() {
      cy.visit(url);
      cy.get('input[placeholder="Navn"]')
      .type("Fagn")
      .should("have.value", "Fagn");
      cy.get("#SearchButton").click();
    }
    
    reloadPage();
    
    cy.get("#ReviewCell")
    .children("p")
    .invoke("text")
    .then(text1 => {
      // Get Fagns rating before submitting a new rating
      let rating = parseFloat(text1.substr(0, text1.indexOf("/")));
      
      // Expands the row, and then submit a 5 star rating
      cy.get(".Row").click();
      cy.get('label[for="Fagn AS_5"]')
      .children("i")
      .click();
      
      reloadPage();
      
      cy.get("#ReviewCell")
      .children("p")
      .invoke("text")
      .should(text2 => {
        // Get the updated rating
        let rating2 = parseFloat(text2.substr(0, text2.indexOf("/")));
            // Compare the new rating with the old rating, success if the new rating is equal or larger than the previous rating.
            expect(rating2).to.be.at.least(rating);
          });
      });
    });
});
 /* 
describe("Test pagination", () => {
  it("Fetches more data when bottom is reached", () => {
    cy.visit(url);
    /* cy.get('input[placeholder="Navn"]')
      .type("")
      .should("have.value", " "); 
    cy.get("#SearchButton").click();

    cy.get('#Table').scrollTo('bottom', {duration:2000})
  });
}); */
//test map component?
