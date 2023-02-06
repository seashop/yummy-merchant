import { productAction } from "../actions/product.actions"

const initState = {
  tableNo: '',
  peopleCount: 1,
  scrollTag: false
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productAction.CHANGE_STORE:
      return {
        ...state,
        ...action.payload
      }
    case productAction.CHANGE_SCROLL_TAG:
      return {
        ...state,
        scrollTag: action.payload.scrollTag
      }
    default: {
      return state
    }
  }
}

export default productReducer
