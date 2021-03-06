export default interface IBurgerItem {
    _id: string,
    name: string,
    type: string,
    subtype?: "top" | "bottom" | undefined,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    quantity?: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    uuid?: string
}
