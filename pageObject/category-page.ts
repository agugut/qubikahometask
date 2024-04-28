import { type Locator, type Page, expect } from '@playwright/test';

export class CategoryPage {
    readonly page: Page;
    readonly category: Locator;
    readonly addCategoryButton: Locator;
    readonly categoryName: Locator;
    readonly addCategoryParent: Locator;
    readonly categoryParentName: Locator;
    readonly selectParent: Locator;
    readonly saveCategory: Locator;
    readonly table: Locator;
    readonly categoryAdded: Locator;

    constructor(page: Page) {
        this.page = page;
        this.category = page.getByText(' Tipos de Categorias ');
        this.addCategoryButton = page.locator('.btn-primary');
        this.categoryName = page.locator('[formcontrolname="name"]');
        this.addCategoryParent = page.locator('[type="checkbox"]');
        this.categoryParentName = page.locator('[formcontrolname="categoryId"]');
        this.selectParent = page.locator('.ng-option-marked');
        this.saveCategory = page.getByText('Aceptar');
        this.table = page.locator('.table-responsive');
        this.categoryAdded = page.getByRole('alertdialog');
    }

    /**
     * Go To Category page
     */
    async goto(): Promise<void> {
        await this.category.click();
        expect(this.page.url()).toContain('category-type');
    }

    /**
     * Create Category
     * @param {string} categoryName to create
     * @param {string} categoryParentName to relate
     */
    async createCategory(categoryName: string, categoryParentName: string = ''): Promise<void> {
        await this.addCategoryButton.click();
        await this.categoryName.pressSequentially(categoryName);
        if (categoryParentName !== '') {
            await this.addCategoryParent.check({ force: true });
            await this.categoryParentName.pressSequentially(categoryParentName);
            await this.selectParent.click();
        }
        await this.saveCategory.click();
    }

    /**
     * Check Category is Listed
     * @param {string} category to check
     */
    async chechCategoryIsListed(category: string): Promise<void> {
        await expect(this.table).toContainText(category);
    }

    /**
     * Go To Page
     * @param {string} pageNumber to visit
     */
    async goToPage(pageNumber: string): Promise<void> {
        await this.page.getByText(pageNumber).click();
    }

    /**
     * Check Category is created
     */
    async checkCategoryIsCreated(): Promise<void> {
        await expect(this.categoryAdded).toBeVisible();
        await expect(this.categoryAdded).toHaveText(' Tipo de categoría adicionada satisfactoriamente ');
    }
}
