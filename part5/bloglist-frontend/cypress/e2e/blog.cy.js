describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'ducduongsieucapcuto',
      name: 'DucCuTo',
      password: 'deptraicuto',
    }
    cy.log('Creating user:', user)
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/users/',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 201) {
        cy.log('Failed to create user:', response.body)
      }
    })

    const user2 = {
      username: 'ducduongsieucapcuto2',
      name: 'DucCuTo1',
      password: 'deptraicuto',
    }
    cy.log('Creating user2:', user2)
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/api/users/',
      body: user2,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 201) {
        cy.log('Failed to create user2:', response.body)
      }
    })

    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', function(){
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})