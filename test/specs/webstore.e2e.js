import MarketPage from '../pageobjects/market.page.js'

describe('webstore application testing', () => {
    it('should be able to add items to cart', async () => {
        await MarketPage.open()
        
        await browser.debug()
    })
})
