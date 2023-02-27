const path = {
  mobile: {
    login: ':merchant/passport',
    getCategoryList: ':merchant/inns/{innId}/productCats',
    getProductList: ':merchant/inns/{innId}/products:list',
    getImgUrl: ':common/images/{id}/url',
    createOrder: ':merchant/inns/{innId}/orders:place',
    getOrderDetail: ':merchant/inns/{innId}/orders/{orderId}',
    getOrderList: ':merchant/inns/{innId}/orders',
    updateOrder: ':merchant/inns/{innId}/orders/{orderId}',
    getInnDetail: ':merchant/inns/{innId}',
    getLastPickCode: ':merchant/inns/{innId}/orders:last'
  }
}

export default path
