

import Page from './page.js';

class MarketPage extends Page {
    open () {
        // open index page
        return super.open("/");
    }
}

export default new MarketPage();
