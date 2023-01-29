import Page from "./page.js";

class MarketPage extends Page {
  get skinCareLink() {
    return $("#categorymenu > nav > ul > li:nth-child(4) > a");
  }

  get cartLink() {
    return $(
      "body > div > header > div.container-fluid > div > div.block_7 > ul > li > a"
    );
  }

  get itemHeaders() {
    return $$(".fixed_wrapper .prdocutname");
  }

  get priceTags() {
    return $$(".pricetag .jumbotron");
  }

  async open() {
    // open index page
    return super.open("/");
  }

  async openSkinCareLink() {
    await this.skinCareLink.click();
  }

  async openCartLink() {
    await this.cartLink.click();
  }

  async getItemByName(name) {
    for (const h of await this.itemHeaders) {
      const currHeader = await h.getText();
      if (currHeader.toLowerCase() === name.toLowerCase()) {
        return h;
      }
    }
  }

  async getPriceByDataID(id) {
    const itemPrices = await $$(
      `//a[@data-id="${id}"]/following-sibling::div/div`
    );

    // if there are more than 2 prices - the item is on sale
    let className = "";
    if (itemPrices.length > 2) {
      className = "pricenew";
    } else {
      className = "oneprice";
    }

    return await $(
      `//a[@data-id="${id}"]/following-sibling::div/div[@class="${className}"]`
    ).getText();
  }

  async purchaseByDataID(id) {
    await $(`//a[@data-id="${id}"]`).click();
  }
}

export default new MarketPage();
