// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get('#firstName').type('Walmir'); // O TYPE simula a digitação disso no campo com o id especificado no GET
  cy.get('#lastName').type('Filho'); // O TYPE simula a digitação disso no campo com o id especificado no GET
  cy.get('#email').type('walmir@example.com'); // O TYPE simula a digitação disso no campo com o id especificado no GET
  cy.get('#open-text-area').type('Teste'); // O TYPE simula a digitação disso no campo com o id especificado no GET
  cy.get('button[type="submit"]').click(); // O CLICK simula o click no elemento que está especificado no GET
})
