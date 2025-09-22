export default function Get_category_set(productArr) {
    // this function process the raw product array to generate set for the filter options
    let prSet = new Set(),
        sizeSet = new Set(),
        brandSet = new Set(),
        colorSet = new Set();

    // assumed array of product list objects
    productArr.forEach(function (item, index) {
        prSet.add(item.priceRange);
        sizeSet.add(item.size);
        brandSet.add(item.brand);
        colorSet.add(item.color);
    });

    let prArr = Array.from(prSet);
    let sizeArr = Array.from(sizeSet);
    let brandArr = Array.from(brandSet);
    let colorArr = Array.from(colorSet);

    prArr.unshift('No Selection');
    sizeArr.unshift('No Selection');
    brandArr.unshift('No Selection');
    colorArr.unshift('No Selection');

    const productUniqueCategory = {
        priceRange: prArr,
        size: sizeArr,
        brand: brandArr,
        color: colorArr,
    };

    return productUniqueCategory;
}
