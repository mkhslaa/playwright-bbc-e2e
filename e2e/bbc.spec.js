// @ts-check
const { test, expect } = require("@playwright/test");

test("BBC home page should contain a title Welcome to the BBC", async ({
  page,
}) => {
  await page.goto("https://www.bbc.co.uk/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BBC/);

  page.close();
});

test("BBC search should find the program", async ({ page }) => {
  await page.goto("https://www.bbc.co.uk/search?d=HOMEPAGE_PS");

  await page.waitForTimeout(1000);

  await page
    .locator("#search-input")
    .type("Panorama Prince Charles", { delay: 50 });
  await page.locator('[data-testid="test-search-submit"]').click();

  await page.waitForTimeout(1000);

  const count = await page.getByRole("list").count();
  expect(count).toBeGreaterThan(0);
  console.log("count is ", count);
});

test("BBC Sign In", async ({ page }) => {
  await page.goto(
    "https://account.bbc.com/account?lang=en-GB&ptrt=https://www.bbc.co.uk/"
  );

  // Check title is Sign In
  const heading = await page.getByRole("heading", { level: 1 });
  expect(await heading.innerText()).toEqual("Sign in");

  // Enter username and password
  await page.locator('input[type="email"]').type("manjeet.khalsa@yahoo.com");
  await page.locator('input[type="password"]').type("Garden18$");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(/https:\/\/account\.bbc\.com\/account\?lang=en/);

  // Check title is Your account
  const headingYourAccount = await page.getByRole("heading", { level: 1 });
  expect(await headingYourAccount.innerText()).toEqual("Your account");

  // Check Sign out option is visible
  expect(await page.locator(".primary-nav__item").last().innerText()).toEqual(
    "Sign out"
  );
});

test("BBC Sign In error on incorrect password", async ({ page }) => {
  await page.goto(
    "https://account.bbc.com/account?lang=en-GB&ptrt=https://www.bbc.co.uk/"
  );

  // Check title is Sign In
  const heading = await page.getByRole("heading", { level: 1 });
  expect(await heading.innerText()).toEqual("Sign in");

  // Enter username and incorrect password
  await page.locator('input[type="email"]').type("manjeet.khalsa@yahoo.com");
  await page.locator('input[type="password"]').type("Garden$");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);

  // Check error message regarding incorrect password
  const errorMessage = page.locator("#form-message-password p");
  expect(await errorMessage.innerText()).toEqual(
    "Sorry, that password is too short. It needs to be eight characters or more."
  );
});

test("BBC footer links stay same", async ({ page }) => {
  await page.goto("https://www.bbc.co.uk/");

  //Check footer
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "Terms of Use" })
  ).toContainText("Terms of Use");
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "About the BBC" })
  ).toContainText("About the BBC");
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "Privacy Policy" })
  ).toContainText("Privacy Policy");

  // Goto a different URL. Check footer remains the same
  await page.goto("https://www.bbc.co.uk/news");

  //Check footer
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "Terms of Use" })
  ).toContainText("Terms of Use");
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "About the BBC" })
  ).toContainText("About the BBC");
  await expect(
    await page.getByRole("contentinfo").filter({ hasText: "Privacy Policy" })
  ).toContainText("Privacy Policy");
});
