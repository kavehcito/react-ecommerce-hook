import { IAddToCartPayload, IIdPayload } from './types';
export declare const useCart: () => {
    state: any;
    addToCart: ({ id, product, isUnique }: IAddToCartPayload) => any;
    removeFromCart: ({ id }: IIdPayload) => any;
    increaseQuantity: ({ id }: IIdPayload) => any;
    decreaseQuantity: ({ id }: IIdPayload) => any;
};
