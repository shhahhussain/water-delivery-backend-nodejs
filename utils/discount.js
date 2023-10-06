const { PromotionalOffers, UserCoupons, CouponBooks } = require("../models");

const calculatePromoDiscount = async (userId, subTotal, promocode) => {
  let discount = 0;

  if (promocode) {
    const promotionalOffer = await PromotionalOffers.findOne({
      where: { promocode, userId },
    });

    if (promotionalOffer) {
      discount = (subTotal * promotionalOffer.discount) / 100;
    }
  }

  return discount;
};

const calculateCouponDiscount = async (userId, cartItems, couponLeafs) => {
  let totalCouponDiscount = 0;

  for (const cartItem of cartItems) {
    if (couponLeafs.length > 0) {
      for (const couponLeaf of couponLeafs) {
        const { coupon_book_id, leafs } = couponLeaf;
        const selectedCouponBook = await UserCoupons.findOne({
          where: { coupon_book_id, user_id: userId },
          include: [{ model: CouponBooks }],
        });

        if (selectedCouponBook) {
          if (
            selectedCouponBook.coupon_book.applicable_product_id ===
              cartItem.product.id &&
            selectedCouponBook.avaliable_leaves > 0
          ) {
            const couponDiscount =
              leafs * selectedCouponBook.coupon_book.rate_per_leaf;
            totalCouponDiscount += couponDiscount;

            let remainingleaf = selectedCouponBook.avaliable_leaves - leafs;
            await selectedCouponBook.update(
              {
                avaliable_leaves: remainingleaf,
              },
              { transaction: orderTransaction }
            );
          }
        }
      }
    }
  }

  return totalCouponDiscount;
};

module.exports = {
  calculatePromoDiscount,
  calculateCouponDiscount,
};
