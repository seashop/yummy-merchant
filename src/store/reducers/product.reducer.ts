import { productAction } from "../actions/product.actions"

const initState = {
  tableNo: '',
  peopleCount: 1,
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productAction.CHANGE_STORE:
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state
    }
  }
}

export default productReducer
