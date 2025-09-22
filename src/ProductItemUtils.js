export default function ProductItemUtils() {
    // this is a utility function that handles the pre defined
    // product price range, random ID generation, random URL link
    var product_item_define = {
        priceRanges: ['0-199', '200-399', '400-599', '600-799', '800-1000'],
        productIdLen: 10,
        imageUrlMinMax: { min: 1, max: 6 },
        getPriceRange: function (priceInput) {
            // assumed priceInput is string
            const priceToCheck = parseInt(priceInput);
            const isValNaN = Number.isNaN(priceToCheck);

            if (isValNaN) {
                return this.priceRanges[0];
            } else {
                let priceRangeCheck = '';

                for (let i = 0; i < this.priceRanges.length; i++) {
                    const limitsArr = this.priceRanges[i].split('-');
                    const lowerLimitInt = parseInt(limitsArr[0]);
                    const UpperLimitInt = parseInt(limitsArr[1]);

                    if (priceToCheck >= lowerLimitInt && priceToCheck <= UpperLimitInt) {
                        priceRangeCheck = this.priceRanges[i];
                    }
                }

                return priceRangeCheck;
            }
        },
        getRandProductId: function () {
            let result = '';
            const length = this.productIdLen;

            while (result.length < length) {
                result += Math.random().toString(36).substring(2);
            }
            return result.substring(0, length);
        },
        getRandImgUrl: function () {
            const min = Math.ceil(this.imageUrlMinMax.min);
            const max = Math.floor(this.imageUrlMinMax.max);
            const newRandInt = Math.floor(Math.random() * (max - min + 1)) + min;
            //'./images/item_1.png';
            const imgUrlNew = './images/item_' + newRandInt.toString() + '.png';
            return imgUrlNew;
        },
    };

    return product_item_define;
}
