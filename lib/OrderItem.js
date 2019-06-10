class OrderItem {
    constructor() {
        this.fileUrls = [];
    }

    /**
     * @param {string} fileUrl
     * @return {OrderItem}
     */
    addFileUrl(fileUrl) {
        this.fileUrls.push(fileUrl);

        return this;
    }

    /**
     * @param {Object} deliveryAddress
     * @return {OrderItem}
     */
    setDeliveryAddress(deliveryAddress) {
        this.deliveryAddress = deliveryAddress;

        return this;
    }

    /**
     * @param {Object} partnerContactDetails
     * @return {OrderItem}
     */
    setPartnerContactDetails(partnerContactDetails) {
        this.partnerContactDetails = partnerContactDetails;

        return this;
    }

    /**
     * @param {Object} productionData
     * @return {OrderItem}
     */
    setProductionData(productionData) {
        this.productionData = productionData;

        return this;
    }

    /**
     * @param {Object} extraData
     * @return {OrderItem}
     */
    setExtraData(extraData) {
        this.extraData = extraData;

        return this;
    }

    /**
     * @param {string} productId
     * @return {OrderItem}
     */
    setProductId(productId) {
        this.productId = productId;

        return this;
    }

    /**
     * @param {string} serviceLevel
     * @return {OrderItem}
     */
    setServiceLevel(serviceLevel) {
        this.serviceLevel = serviceLevel;

        return this;
    }

    /**
     * @param {number} quantity
     * @return {OrderItem}
     */
    setQuantity(quantity) {
        this.quantity = quantity;

        return this;
    }

    /**
     * @param {string} artworkService
     * @return {OrderItem}
     */
    setArtworkService(artworkService) {
        this.artworkService = artworkService;

        return this;
    }

    /**
     * @param {string} itemReference
     * @return {OrderItem}
     */
    setItemReference(itemReference) {
        this.itemReference = itemReference;

        return this;
    }

    /**
     * @param {boolean} withoutArtwork
     * @return {OrderItem}
     */
    setWithoutArtwork(withoutArtwork) {
        this.withoutArtwork = withoutArtwork;

        return this;
    }

    /**
     * @param {number} maxQuantity
     * @param {number} maxPrice
     * @return {OrderItem}
     */
    setQuantityUpgrade(maxQuantity, maxPrice) {
        this.quantityUpgrade = {
            maxQuantity,
            maxPrice
        };

        return this;
    }
}

module.exports = OrderItem;
