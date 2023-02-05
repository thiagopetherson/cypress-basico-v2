/// <reference types="Cypress" />

it.only('testa a página da política de privacidade de forma independente', function() {

  cy.visit('./src/privacy.html') // Acessando o arquivo que será testado
  cy.contains('Talking About Testing').should('be.visible') // Verificando se o texto especificado consta na página
})
