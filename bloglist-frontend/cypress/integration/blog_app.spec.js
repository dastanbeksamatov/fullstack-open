import { getByText } from "@testing-library/react"

describe('Test for blog app', function() {
  beforeEach( function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', { name: 'dastan', username:'admin', password: 'Me55i' })
    cy.visit('http://localhost:3000')
    localStorage.clear()
    cy.contains('login').click()
  })
  it('Login page by default', function() {
    cy.get('form').should('contain', 'username')
  })

  describe('Login ', function() {
    it('Succesfull login', function {
      cy.get('#username').type('admin')
      cy.get('#password').type('Me55i')
      cy.get('#submit-login').click()

      cy.contains('dastan is logged in')
    })
    it('Wrong credentials', function{
      cy.get('#username').type('admin')
      cy.get('#password').type('me55i')
      cy.get('#submit-login').click()

      cy.get('#notif-div').contains('Wrong credentials')
    })
  }
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'Me55i' })
    })
    it('user can create a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog by test')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('cypress.io')

      cy.get('#submit-blog').click()

      cy.get('#notif-div').contains('Blog by test by Cypress is added')

      cy.contains('show all blogs').click()
      cy.contains('Blog by test')
    })
  })
  describe('Actions with blogs', function() {
    beforeEach(function() {
      const blogs = [
        {
          title: 'First blog', author: 'First', url: 'first.com', likes: 12
        },
        {
          title: 'Second blog', author: 'Second', url: 'second.com', likes: 23
        },
        {
          title: 'Third Blog', author: 'Third', url: 'third.com', likes: 10
        }
      ]
      cy.login({ username: 'admin', password: 'Me55i' })
      cy.load(blogs)
    })
    it('User can like the blog', function() {
      cy.contains('show all blogs').click()
      cy.get('ul>li').eq(1).contains('view').click()
      cy.get('ul>li').eq(1).should('be.visible')
      cy.get('ul>li').eq(1).contains('button', 'like').click()
      cy.get('ul>li').eq(1).contains('likes 13')
    })
    it('user can delete a blog', function() {
      cy.contains('show all blogs').click()
      cy.get('ul>li').eq(2).contains('view').click()
      cy.get('ul>li').eq(2).contains('button', 'delete').click()
      cy.on('window:confirm', str => {
        expect(str===`Do you want to delete Third Blog?`)
        return true
      })
      cy.get('#notif-div').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('ul>li').should('have.length', 2)
    })
    it('checks whether blogs are sorted in ascending order', function() {
      cy.contains('show all blogs').click()
      const likes = [ 10, 12, 23 ]
      cy.get('ul>li').each(($li, index) => {
        if(cy.get('ul>li').eq(index).contains(likes[index])){
          cy.get('ul>li').eq(index).contains('view').click()
        }
        else{
          cy.wrap('$li').end()
        }
      })
    })
  })
})