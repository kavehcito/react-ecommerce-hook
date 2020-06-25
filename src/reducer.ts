// https://github.com/lodash/lodash/issues/3542
import omit = require('lodash.omit');
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from './actionTypes';

export const initialState = {
  addedIds: [],
  products: [],
  quantityById: {},
};

type TypeAddedIds = number[];
type TypeProducts = any[];
interface IQuantityById {
  [key: string]: number;
}



interface IStateType {
  addedIds: TypeAddedIds;
  products: TypeProducts;
  quantityById: IQuantityById;
}

const addedIds = (state = initialState.addedIds, action): TypeAddedIds => {
  const {
    payload: { id },
  } = action;

  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(id) !== -1) {
        return state;
      }

      return [...state, id];
    case REMOVE_FROM_CART:
      return [...state].filter(item => item !== id);

    default:
      return state;
  }
};

const products = (state = initialState.products, action) : TypeProducts => {
  console.log("payload is", action)
  const {
    payload: { id, product }
  } = action;

  switch (action.type) {
    case ADD_TO_CART:
      if (state.findIndex(item => item.objectID === product.objectID ) !== -1) {
        return state;
      }
      return [...state, product];
    case REMOVE_FROM_CART:
      console.log('state is', state)
      console.log('id is', id)
      return state.filter(item => item.objectID !== id);

    default:
      return state;
  }

}
const quantityById = (
  state = initialState.quantityById,
  action
): IQuantityById => {
  const {
    payload: { id, isUnique },
  } = action;

  const handleQuantity = (add = true) => {
    const amount = add ? +1 : -1;

    return {
      ...state,
      [id]: (state[id] || 0) + amount,
    };
  };

  switch (action.type) {
    case ADD_TO_CART:
      if (isUnique === true) {
        return {
          ...state,
          [id]: 1,
        };
      }

      return handleQuantity();

    case REMOVE_FROM_CART:
      return omit(state, id);
    case INCREASE_QUANTITY:
      return handleQuantity();
    case DECREASE_QUANTITY:
      return handleQuantity(false);
    default:
      return state;
  }
};

export const cartReducer = (state = initialState, action): IStateType => {
  switch (action.type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case INCREASE_QUANTITY:
    case DECREASE_QUANTITY:
      return {
        addedIds: addedIds(state.addedIds, action),
        products: products(state.products, action),
        quantityById: quantityById(state.quantityById, action),
      };
    default:
      return state;
  }
};
