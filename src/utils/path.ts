const path = {
  mobile: {
    login: ':merchant/passport',
    getCategoryList: '/inns/{innId}/productCats',
    getProductList: '/inns/{innId}/products:list',
    getImgUrl: ':common/images/{id}/url',
    createOrder: '/inns/{innId}/orders:place',
    getOrderDetail: ':merchant/inns/{innId}/orders/{orderId}',
    getOrderList: ':merchant/inns/{innId}/orders',
    updateOrder: ':merchant/inns/{innId}/orders/{orderId}'
  }
}

export default path
