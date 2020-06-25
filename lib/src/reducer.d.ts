export declare const initialState: {
    addedIds: any[];
    products: {
        objectID: string;
    }[];
    quantityById: {};
};
declare type TypeAddedIds = number[];
declare type TypeProducts = any[];
interface IQuantityById {
    [key: string]: number;
}
interface IStateType {
    addedIds: TypeAddedIds;
    products: TypeProducts;
    quantityById: IQuantityById;
}
export declare const cartReducer: (state: {
    addedIds: any[];
    products: {
        objectID: string;
    }[];
    quantityById: {};
}, action: any) => IStateType;
export {};
