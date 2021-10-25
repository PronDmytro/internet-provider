it('smoke test', () => {
  cy.visit('/');
  cy.contains('Landing Page');
});
