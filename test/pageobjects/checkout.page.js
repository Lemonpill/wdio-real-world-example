import Page from "./page.js";

class CheckoutPage extends Page {
  get checkoutTotal() {
    return $('//span[text()="Total:"]/../following-sibling::td');
  }

  get shippingRate() {
    return $('//span[text()="Flat Shipping Rate:"]/../following-sibling::td');
  }

  open() {
    return super.open("/index.php?rt=checkout/cart");
  }

  async getCheckoutTotal() {
    const totalText = await this.checkoutTotal.getText();
    return Number(totalText.replace("$", ""));
  }

  async getShippingRate() {
    const shippingRateText = await this.shippingRate.getText();
    return Number(shippingRateText.replace("$", ""));
  }
}

export default new CheckoutPage();
