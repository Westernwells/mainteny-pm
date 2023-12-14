export default class LoginPage {
  static visitLoginPage = () => {
    cy.visit(`/login`, {
      failOnStatusCode: false,
    });
  };

  static fillEmail = (email) => {
    cy.get('#email').type(email);
  };

  static fillPassword = (password) => {
    cy.get('#password').type(password);
  };

  static submitLoginForm = () => {
    cy.get('button[type="submit"]').click();
  };

  static shouldSubmitBtnDisabled = (shouldBeDisabled = true) => {
    const button = cy.get('button[type="submit"]');
    if (shouldBeDisabled) {
      button.should('be.disabled');
    } else {
      button.should('not.be.disabled');
    }
  };
  // Other methods as needed...
}
