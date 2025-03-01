describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:5173');
  });
  it('Login form is shown', function(){
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });
  describe('login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen logged in');
    });
    it('fails with wrong credentials', function(){
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username:'mluukkai',
      password:'salainen'
      });
    });
    it('A blog can be created', function(){
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('#create-button').click();
      cy.contains('a blog created by cypress');
    });
    
  });
});