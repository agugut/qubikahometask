import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly sidenav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('[formcontrolname="email"]');
        this.password = page.locator('[formcontrolname="password"]');
        this.loginButton = page.getByRole('button');
        this.sidenav = page.locator('[id="sidenav-main"]');
    }

    /**
     * Go To Login page
     */
    async goto(): Promise<void> {
        await this.page.goto('/#/auth/login');
        await this.page.waitForLoadState();
    }

    /**
     * Check if login Page is visible
     */
    async checkLoginPageIsVisible(): Promise<void> {
        await expect(this.email).toBeVisible();
        await expect(this.password).toBeVisible();
    }

    /**
     * Login
     * @param {string} email to login
     * @param {string} password to login
     */
    async login(email: string, password: string): Promise<void> {
        await this.email.pressSequentially(email);
        await this.password.pressSequentially(password);
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }

    /**
     * Check Login ok
     */
    async checkLoginOk(): Promise<void> {
        await expect(this.sidenav).toBeVisible();
        expect(this.page.url()).toContain('dashboard');
    }
}
