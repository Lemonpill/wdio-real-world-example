import MarketPage from "../pageobjects/market.page.js";
import CheckoutPage from "../pageobjects/checkout.page.js";
import AllureReporter from "@wdio/allure-reporter";

describe("E2E - adding items to cart from marketpage", function() {
  
  // retrying all on failure
  // must use function keyword in describe
  // this.retries(1)

  it("adds an item to cart and verifies checkout total is correct", async function() {
    // retrying current test on failure
    // must use function declaration
    this.retries(1)

    // configure report
    AllureReporter.addFeature("Users should be able to add items to cart")
    AllureReporter.addDescription("Add an item to cart and verify totals")
    AllureReporter.addSeverity("critical")

    // 1. open page
    await MarketPage.open();

    // 2. click on 'skincare'
    await MarketPage.openSkinCareLink();

    // 3. add 'Creme Precieuse Nuit 50ml' to cart
    const item = await MarketPage.getItemByName("Total Moisture Facial Cream");
    const itemHref = await item.getAttribute("href");
    let itemID = new URLSearchParams(itemHref).get("product_id");
    await MarketPage.purchaseByDataID(itemID);

    const itemPriceText = await MarketPage.getPriceByDataID(itemID);
    const itemPrice = Number(itemPriceText.replace("$", ""));

    // 4. click cart link
    await MarketPage.openCartLink();

    // 5. validate order total
    const shipping = await CheckoutPage.getShippingRate();
    const total = await CheckoutPage.getCheckoutTotal();

    expect(total).toEqual(itemPrice + shipping);

    // await browser.debug();
  });

  it("adds an item on sale to cart and verifies checkout total is correct", async function() {
    // retrying current test on failure
    // must use function declaration
    this.retries(1)
    
    // configure report
    AllureReporter.addFeature("Users should be able to add items on sale to cart")
    AllureReporter.addDescription("Add a sale item to cart and verify totals")
    AllureReporter.addSeverity("critical")

    // 1. open page
    await MarketPage.open();

    // 2. click on 'skincare'
    await MarketPage.openSkinCareLink();

    // 3. add 'Creme Precieuse Nuit 50ml' to cart
    const item = await MarketPage.getItemByName("Creme Precieuse Nuit 50ml");
    const itemHref = await item.getAttribute("href");
    let itemID = new URLSearchParams(itemHref).get("product_id");
    await MarketPage.purchaseByDataID(itemID);

    const itemPriceText = await MarketPage.getPriceByDataID(itemID);
    const itemPrice = Number(itemPriceText.replace("$", ""));

    // 4. click cart link
    await MarketPage.openCartLink();

    // 5. validate order total
    const shipping = await CheckoutPage.getShippingRate();
    const total = await CheckoutPage.getCheckoutTotal();
    
    expect(total).toEqual(itemPrice + shipping);
    
    // await browser.debug();
  });

  afterEach(async () => {
    await browser.reloadSession()
  });
});
