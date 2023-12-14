import LoginPage from '../pages/login.page';

describe('Login Page', () => {
  beforeEach(() => {
    LoginPage.visitLoginPage();
  });

  it('shows incorrect email/password error', () => {
    LoginPage.visitLoginPage();
    LoginPage.fillEmail('e2etest@mainteny.com');
    LoginPage.fillPassword('12345678');
    LoginPage.submitLoginForm();

    cy.contains('Incorrect email or password');
  });

  it('navigate to units after login', () => {
    LoginPage.fillEmail('izaan+2@mainteny.com');
    LoginPage.fillPassword('Today456#');
    LoginPage.submitLoginForm();

    cy.url().should('include', `${Cypress.config().baseUrl}/units`);
  });

  it('should disable the button when email or password is empty', () => {
    LoginPage.shouldSubmitBtnDisabled(true);

    LoginPage.fillEmail('e2etest@mainteny.com');

    // Now, the button should still be disabled as the password field is empty
    LoginPage.shouldSubmitBtnDisabled(true);

    LoginPage.fillPassword('testpassword');

    // Now, the button should be enabled as both email and password fields have values
    LoginPage.shouldSubmitBtnDisabled(false);
  });
});
