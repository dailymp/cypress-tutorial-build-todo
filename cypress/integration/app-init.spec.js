describe('App initialization', () => {
  it('Loads todos on page load', () => {
    cy.seedAndVisit()

    cy.get('.todo-list li')
      .should('have.length', 5)
  })
  it('should contains valid html ', () => {
    cy.contains('h1', 'todos')
    cy.contains('.todo-list li', 'Buy Milk')
   });
  it('Displays an error on failure', () => {
    cy.server()
    cy.route({
      url: '/api/todos',
      method: 'GET',
      status: 500,
      response: {}
    })
    cy.visit('/')

    cy.get('.todo-list li')
      .should('not.exist')

    cy.get('.error')
      .should('be.visible')
  })

  it('should add new todos', () => {
    cy.get(`.new-todo`).type('first-item{enter}')
    cy.contains('.todo-list li', 'first-item').should('be.visible')
  });
})
