import { faker } from '@faker-js/faker';
import { test, Page, Browser, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { chromium } from 'playwright'; // Or 'firefox' or 'webkit'.

import { CategoryPage } from '../pageObject/category-page';
import { LoginPage } from '../pageObject/login-page';

dotenv.config();
let page: Page;
let browser: Browser;
let email: string;
let password: string;
let loginPage: LoginPage;
let categoryPage: CategoryPage;

test.beforeAll('Create random user', async () => {
    // Headless value should be true to run into CICD but set as false for testing purposes
    email = `${faker.word.sample()}${faker.internet.email()}`;
    password = faker.internet.password();
    browser = await chromium.launch({
        headless: false,
    });

    page = await browser.newPage();
    const response = await page.request.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
        data: {
            email,
            password,
            roles: ['ROLE_ADMIN'],
        },
    });
    expect(response.status()).toBe(201);
});

test.afterAll('Close Page and Browser', async () => {
    await page.close();
    await browser.close();
});

test('Create Category and subcategory', async () => {
    const category = faker.word.noun();
    const subCategory = faker.word.noun();

    // Login into page
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.checkLoginPageIsVisible();
    await loginPage.login(email, password);
    await loginPage.checkLoginOk();

    // Go To Category Page
    categoryPage = new CategoryPage(page);
    await categoryPage.goto();

    // Create Category and check creation
    await categoryPage.createCategory(category);
    await categoryPage.checkCategoryIsCreated();
    const responsePromise = page.waitForResponse(
        (response) => response.url().includes('category-type/filter') && response.status() === 200
    );

    // Create Subcategory and check creation
    await categoryPage.createCategory(subCategory, category);
    const responseCategory = await responsePromise;
    const jsonResponse = (await responseCategory.json()) as { totalPages: string };
    await categoryPage.checkCategoryIsCreated();
    await categoryPage.goToPage(jsonResponse.totalPages);
    await categoryPage.chechCategoryIsListed(subCategory);
});
