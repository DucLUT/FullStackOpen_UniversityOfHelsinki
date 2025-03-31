describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    const user2 = {
      name: 'Joe Biden',
      username: 'sleepyjoe',
      password: 'babikajima123'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('#create-button').click();
      cy.contains('a blog created by cypress');
    });

    it('a user can like a blog', function() {
      cy.createBlog({ title: 'this blog should be liked', author: 'hihihahah', url: 'like.com' });
      cy.contains('show').click();
      cy.get('#likeblog').click();
      cy.contains(1);
    });

    it('owner can delete its own', function() {
      cy.createBlog({ title: 'blog by mluukkai', author: 'mluukkai', url: 'mluukkai.com' });
      cy.contains('show').click();
      cy.get('#removeblog').click();
    });

    it('only the creator can see the delete button', function() {
      cy.createBlog({ title: 'blog by mluukkai', author: 'mluukkai', url: 'mluukkai.com' });
      cy.contains('logout').click();


      // Log in as the second user
      cy.login({ username: 'sleepyjoe', password: 'babikajima123' });
      cy.contains('show').click();
      cy.get('#removeblog').should('not.exist');

    });
    it('the blogs should be ordered by likes', function() {
      cy.createBlog({ title: 'first blog', author: 'author1', url: 'url1.com', likes: 5 });
      cy.createBlog({ title: 'second blog', author: 'author2', url: 'url2.com', likes: 10 });
      cy.createBlog({ title: 'third blog', author: 'author3', url: 'url3.com', likes: 7 });
      cy.get('.blog').should('have.length', 3);
      cy.get('.blog').eq(0).should('contain', 'first blog');
      cy.get('.blog').eq(1).should('contain', 'second blog');
      cy.get('.blog').eq(2).should('contain', 'third blog');
    });
  });
});