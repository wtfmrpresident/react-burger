import React from "react";
import PropTypes from 'prop-types';
import Tabs from "./tabs";
import IngredientsList from "./ingredients-list";

const itemPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
})

class BurgerIngredients extends React.Component<any, any> {
    static propTypes = {
        items: PropTypes.arrayOf(itemPropType),
        addToCartHandler: PropTypes.func.isRequired,
        cart: PropTypes.arrayOf(itemPropType)
    }

    constructor(props: any) {
        super(props);

        this.state = {
            selectedTab: 'bun',
        }
    }

    setSelectedTab = (value: string) => {
        this.setState({selectedTab: value})
    }

    render() {
        const typeToTitleMap = {
            bun: 'Булочки',
            sauce: 'Соусы',
            main: 'Начинки'
        }

        const items = this.props.items ? this.props.items.filter((item: object) => item.type === this.state.selectedTab) : []

        return (
            <>
                <div>
                    <h1 className="mt-10 mb-5 text text_type_main-large">Соберите Бургер</h1>
                    <Tabs selectedTab={this.state.selectedTab} setSelectedTab={this.setSelectedTab} />
                    <IngredientsList
                        items={items}
                        cart={this.props.cart}
                        type={this.state.selectedTab}
                        title={typeToTitleMap[this.state.selectedTab]}
                        addToCartHandler={this.props.addToCartHandler}
                    />
                </div>
            </>
        )
    }
}

export default BurgerIngredients;