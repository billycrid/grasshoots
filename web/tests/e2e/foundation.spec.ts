import { expect, test } from '@playwright/test';
test('live browser → API → migrated PostgreSQL', async ({ page, request }) => {
  const health = await request.get('/api/health');
  expect(health.status(), 'Start Docker PostgreSQL and run migrations first.').toBe(200);
  expect(await health.json()).toMatchObject({
    status: 'ok',
    checks: { api: 'up', database: 'up' },
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'System health', exact: true })).toBeVisible();
  await expect(page.getByText('All systems connected')).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'PostgreSQL' }).getByText('Connected', { exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Check again' }).click();
  await expect(page.getByText('All systems connected')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Grasshoots', exact: true })).toBeVisible();
  const layout = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    viewport: innerWidth,
    font: getComputedStyle(document.body).fontFamily,
    background: getComputedStyle(document.body).backgroundColor,
  }));
  expect(layout.page).toBeLessThanOrEqual(layout.viewport);
  expect(layout.font).toContain('Manrope');
  expect(layout.background).toBe('rgb(245, 246, 241)');
});
test('shows database failure honestly and recovers after retry', async ({ page }) => {
  await page.route('**/api/health', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'degraded',
        checks: { api: 'up', database: 'down' },
        checkedAt: new Date().toISOString(),
      }),
    }),
  );
  await page.goto('/');
  await expect(page.getByText('The database needs attention')).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Backend API' }).getByText('Connected', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'PostgreSQL' }).getByText('Unavailable', { exact: true }),
  ).toBeVisible();
  await page.unroute('**/api/health');
  await page.getByRole('button', { name: 'Check again' }).click();
  await expect(page.getByText('All systems connected')).toBeVisible();
});
test('shows API failure without claiming database status', async ({ page }) => {
  await page.route('**/api/health', (route) => route.abort());
  await page.goto('/');
  await expect(page.getByText('The API could not be reached')).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'PostgreSQL' }).getByText('Not checked', { exact: true }),
  ).toBeVisible();
});
test('supports keyboard skip navigation and unknown routes', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.goto('/does-not-exist');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to system health' }).click();
  await expect(page.getByRole('heading', { name: 'System health', exact: true })).toBeVisible();
});
