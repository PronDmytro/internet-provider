describe('client tab tests', () => {

  it('should create client', () => {
    // перехід на головну сторінку
    cy.visit('/');
    // перехід на вкладку клієнта
    cy.get('#mat-tab-label-0-1').click();
    // очікування закінчення анімації
    cy.wait(300);
    // відкрити діалогове вікно додавання нового клієнта
    cy.get('.mat-header-row > .add-client-btn> .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
    // введення даних клієнта
    cy.get('#mat-input-6').type('client name');
    cy.get('#mat-input-7').type('033595648');
    cy.get('#mat-input-8').type('test@gmail.com');
    cy.get('#mat-input-9').type('10/10/2020');
    cy.get('#mat-input-10').type('вулиця Йорданська, 16А, Київ, 04210');
    // збереження даних
    cy.get('.mat-dialog-actions > .mat-primary').click();
    // перевірка підтвердження створення клієнта
    cy.contains('created');
  });

  it('should edit data and delete client', () => {
    // перехід на головну сторінку
    cy.visit('/');
    // перехід на вкладку клієнта
    cy.get('#mat-tab-label-0-1').click();
    // очікування закінчення анімації
    cy.wait(300);
    cy.get(':nth-child(6) > .btn > :nth-child(1) > .mat-button-wrapper > .mat-icon').click();
    cy.get('#mat-input-6').type('new client name');
    cy.get('.mat-dialog-actions > .mat-primary').click();
    cy.contains('saved');
    cy.contains('new client name');
    cy.get(':nth-child(6) > .btn > :nth-child(2) > .mat-button-wrapper > .mat-icon').click();
    cy.contains('deleted');
  });

});

