/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  // Esse beforeEach é usado para que todos os teste que forem usados visitem a url da aplicação (aquela que está ali no visit)
  beforeEach(function() {
    cy.visit('./src/index.html') // Acessando o arquivo que será testado
  })

  it('verifica o título da aplicação', function() {    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') // Verificando o title da página é igual a string passadaDigitando em Campos e Cliando em Elementos
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste";
    cy.get('#firstName').type('Walmir'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#lastName').type('Filho'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#email').type('walmir@example.com'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#open-text-area').type(longText, { delay: 0 }); // O TYPE simula a digitação disso no campo com o id especificado no GET
    // cy.get('button[type="submit"]').click(); // O CLICK simula o click no elemento que está especificado no GET
    cy.contains('button', 'Enviar').click() // Quase a mesma coisa que a parte acima comentada (só que feita de maneira diferente)

    cy.get('.success').should('be.visible'); // Aqui estamos dizendo que o elemento com a classe do GET deverá estar visível
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Walmir'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#lastName').type('Filho'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#email').type('walmir@example,,com'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#open-text-area').type('Teste'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('button[type="submit"]').click(); // O CLICK simula o click no elemento que está especificado no GET

    cy.get('.error').should('be.visible'); // Aqui estamos dizendo que o elemento com a classe do GET deverá estar visível
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get('#phone')
      .type('abcdefghijk')
      .should('have.value', '') // Verificamos que o campo deve permanecer vazio (que é o que acontece nesse teste aqui)
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Walmir'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#lastName').type('Filho'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#email').type('walmir@example.com'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('#phone-checkbox').check(); // O CHECK marca o elemento
    cy.get('#open-text-area').type('Teste'); // O TYPE simula a digitação disso no campo com o id especificado no GET
    cy.get('button[type="submit"]').click(); // O CLICK simula o click no elemento que está especificado no GET

    cy.get('.error').should('be.visible'); // Aqui estamos dizendo que o elemento com a classe do GET deverá estar visível
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Walmyr')
      .should('have.value', 'Walmyr')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .type('Filho')
      .should('have.value', 'Filho')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('walmyr@example.com')
      .should('have.value', 'walmyr@example.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {   
    cy.contains('button', 'Enviar').click() // Seleciona o botão que tem aquele texto ("Enviar") dentro e clica nele
    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Youtube) pelo seu texto', function() {
    cy.get('#product')
      .select('YouTube') // Selecionando pelo text
      .should('have.value', 'youtube') // Deve ter esse valor
  })

  it('seleciona um produto (Mentoria) pelo seu valor (value)', function() {
    cy.get('#product')
      .select('mentoria') // Selecionando pelo value
      .should('have.value', 'mentoria') // Deve ter esse valor
  })

  it('seleciona um produto (Blog) pelo seu índice', function() {
    cy.get('#product')
      .select(1) // Selecionando pelo índice
      .should('have.value', 'blog') // Deve ter esse valor
  })

  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]') // Selecionando um input radio que tenha value de "feedback"
      .check() // Selecionando esse input radio
      .should('have.value','feedback') // verifica se esse input tem o value de "feedback"      
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]') // Selecionando todos os inputs do tipo radio
      .should('have.length', 3) // Verificando se encontramos 3 inputs do tipo rádio
      .each(function($inputRadio) { // Percorrendo cada input do tipo radio pego com o get
        cy.wrap($inputRadio).check() // Empacotando cada um desses inputs do tipo radio e marcando eles um de cada vez
        cy.wrap($inputRadio).should('be.checked') // Verificando se o input foi marcado
      }) 
  })

  it('marca ambos checkbox', function() {
    cy.get('input[type="checkbox"]') // Pegando os dois checkbox da página
      .check() // Marcando ambos os checkboxes
      .should('be.checked') // Vendo se os checkboxes que foram pegos estão marcados
      .last() //Pegando o último checkbox (existe um first() também)
      .uncheck() // Desmarcando o checkbox que foi pego com o last() acima
      .should('not.be.checked') // Vendo se o checkbox que foi pego está desmarcado (e está, pq desmarcamos acima com o uncheck())
  })

  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]#file-upload') // Pegando o input file que tem aquele id
      .should('not.have.value') // O campo não pode ter valor
      .selectFile('./cypress/fixtures/example.json') // Selecionando o arquivo, que está nesse local especificado, no input file pego acima
      .should(function(input) { // Recebendo o input file
        expect(input[0].files[0].name).to.equal('example.json') // Verificando se o nome do arquivo que está selecionado no input file é "example.json"

      })  
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]#file-upload') // Pegando o input file que tem aquele id
      .should('not.have.value') // O campo não pode ter valor
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) // Selecionando o arquivo, que está nesse local especificado, simulando um drag-drop
      .should(function(input) { // Recebendo o input file
        expect(input[0].files[0].name).to.equal('example.json') // Verificando se o nome do arquivo que está selecionado no input file é "example.json"        
      })  
  })

  it('seleciona um aruqivo utilizando uma fisture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile') // Pegando o fixture (com o fixture), que está dentro da pasta fixtures, e depois renomeamos ela (com o as)
    cy.get('input[type="file"]#file-upload') // Pegando o input file que tem aquele id
      .selectFile('@sampleFile') // Passando o arquivo (pelo alias) para o input file
      .should(function(input) { // Recebendo o input file
        expect(input[0].files[0].name).to.equal('example.json') // Verificando se o nome do arquivo que está selecionado no input file é "example.json"        
      }) 
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank') // Acessando o <a> e verificando se ele possui o target _blank
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a') // Pegando o link <a>
      .invoke('removeAttr', 'target') // Removendo o seu atributo 'target'
      .click() // Clicando no <a>      
    cy.contains('Talking About Testing') // Pegando o texto
      .should('be.visible') // Verificando se aquele texto tá visível na tela
  })

})
