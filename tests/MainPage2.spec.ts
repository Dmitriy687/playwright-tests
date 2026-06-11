import { test, expect } from '@playwright/test';

interface Elements {
  locator(page: Page): Locator;
  name: string;
  text?: string;
  attribute?: { type: string; value: string };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: { type: 'href', value: '/' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: { type: 'href', value: '/docs/intro' },
  },
  // {
  //   locator: (page) => page.getByRole('link', { name: 'MCP' }),
  // },
  // {
  //   locator: (page) => page.getByRole('link', { name: 'CLI' }),
  // },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    attribute: { type: 'href', value: '/docs/api/class-playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  // {
  //   locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
  //   name: 'GitHub repository link',
  //   text: 'GitHub repository',
  // },
  // {
  //   locator: (page) => page.getByRole('link', { name: 'Discord server' }),
  //   name: 'Discord server link',
  //   text: 'Discord server',
  // },
  {
    locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
    name: 'Switch between dark and light button',
  },
];

test.describe('Test main page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Check display elements of navigation Heder', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Перевірка відображення елементу ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  // await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  // await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toBeVisible();
  // await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
  // await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
  // await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  // await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
  // await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
  // await expect
  //   .soft(page.getByRole('button', { name: 'Switch between dark and light' }))
  //   .toBeVisible();
  //await expect.soft(page.getByRole('button', { name: 'Search (Command+K)' })).toBeVisible();

  test('Check name of navigation elements Heder', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Перевірка назви елементу ${name}`, async () => {
          await expect.soft(locator(page)).toHaveText(text);
        });
      }
    });
  });

  test('Check atribute href name of navigation elements Heder', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Перевірка атрибуту href елементу ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Check turn off/on Light mode', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').click();
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Check page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable web automation for testing, scripting, and AI agents.',
    );
  });

  test('Check button "Get Started"', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
