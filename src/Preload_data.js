import ProductItemUtils from './ProductItemUtils.js';

const product_item_define = ProductItemUtils();
// this function handles the simulated preload product data for the site
// which will be imported in when the site loads
export default function Preload_data() {
    const priceRanges = ['0-199', '200-399', '400-599', '600-799', '800-1000'];
    const product1 = {
        itemName: 'Jordan Jumpman',
        itemDetails: 'A simple t-shirt',
        price: '250',
        priceRange: product_item_define.getPriceRange('250'),
        size: 'xs',
        brand: 'nike',
        color: 'black',
        itemId: product_item_define.getRandProductId(),
        createdTs: '1749374021000',
        imgUrl: product_item_define.getRandImgUrl(),
    };
    const product2 = {
        itemName: 'Jordan Brooklyn Fleece',
        itemDetails: 'A simple sports shorts',
        price: '250',
        priceRange: product_item_define.getPriceRange('250'),
        size: 'xs',
        brand: 'nike',
        color: 'black',
        itemId: product_item_define.getRandProductId(),
        createdTs: '1749374022000',
        imgUrl: product_item_define.getRandImgUrl(),
    };
    const product3 = {
        itemName: 'FuelCell Rebel v5',
        itemDetails: 'A simple running shoe',
        price: '450',
        priceRange: product_item_define.getPriceRange('450'),
        size: 'm',
        brand: 'new balance',
        color: 'white',
        itemId: product_item_define.getRandProductId(),
        createdTs: '1749374023000',
        imgUrl: product_item_define.getRandImgUrl(),
    };
    const product4 = {
        itemName: 'HeatGear',
        itemDetails: 'A simple compression wear',
        price: '650',
        priceRange: product_item_define.getPriceRange('650'),
        size: 'l',
        brand: 'under armour',
        color: 'blue',
        itemId: product_item_define.getRandProductId(),
        createdTs: '1749374024000',
        imgUrl: product_item_define.getRandImgUrl(),
    };
    const product5 = {
        itemName: 'Adicolor track jacket',
        itemDetails: 'A simple jacket',
        price: '900',
        priceRange: product_item_define.getPriceRange('900'),
        size: 'xl',
        brand: 'adidas',
        color: 'green',
        itemId: product_item_define.getRandProductId(),
        createdTs: '1749374025000',
        imgUrl: product_item_define.getRandImgUrl(),
    };

    const preloadArr = [product1, product2, product3, product4, product5];

    return preloadArr;
}
