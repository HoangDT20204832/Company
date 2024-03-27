export enum EVoucherType {
  //Voucher giảm giá vận chuyển")]
  Shipping = 1,
  //Voucher giảm giá sản phẩm"
  Discount = 2,
}

export enum EVoucherDiscountType {
  // Giảm theo số tiền
  FixAmount = 1,
  // Giảm theo phần trăm
  Percentage = 2,
}

export enum EVoucherScope {
  // Voucher áp dụng toàn shop
  Shop = 1,
  // Voucher áp dụng cho từng sản phẩm
  Product = 2,
}
