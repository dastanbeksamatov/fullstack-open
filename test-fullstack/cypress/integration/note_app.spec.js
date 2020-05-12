describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Dastan',
      username: 'root',
      password: 'Me55i'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })
  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('Dastan')
    cy.get('#password').type('Me55i')
    cy.get('#login-button').click()

    cy.contains('Dastan logged in')
  })

  it.only('login fails if wrong credentials', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('Messi')
    cy.get('#login-button').click()
    cy.get('.error').contains('wrong credentials')

    cy.get('html').should('not.contain', 'Dastan is logged in')
  })

  describe('When Logged in', () => {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'Me55i' })
    })

    it('new note can be added ', function() {
      cy.contains('new note').click()
      cy.get('input').type('Note created by Cypress')
      cy.contains('save').click()
      cy.contains('Note created by Cypress')
    })
    describe('and a several exists', () => {
      beforeEach( function() {
        cy.createNote({
          content: 'another note by cypress',
          important: false
        })
        cy.createNote({ content: 'second one', important: false })
        cy.createNote({ content: 'Third one', important: false })
      })
      it('one of them can be made important', function() {
        cy.contains('another note by cypress').parent().find('button').click()
        cy.contains('another note by cypress').parent().find('button').should('contain', 'make not important')
      })
    })

  })
})
