import { baseUrl } from "../../../src/services/api";

describe("Constructor page works correctly", () => {
    beforeEach(() => {
        cy.intercept("POST", `${baseUrl}/auth/login`).as("login")
        cy.intercept("POST", `${baseUrl}/orders`).as("createOrder")
        cy.intercept("GET",  `${baseUrl}/ingredients`).as("getIngredients")

        // Для заказов нужно авторизоваться
        cy.visit("http://localhost:3000/login")
        cy.get('[name=email]').type("fryer@yandex.ru")
        cy.get('[name=password]').type("qwertyu")
        cy.get('button').contains("Войти").click()
        cy.wait('@login')
    })

    // Тыркнем по первому ингредиенту и закроем модалку
    it("check ingredient modal", () => {
        cy.wait('@getIngredients')
        cy.get('[class^=ingredient-item_item__]').first().click()
        cy.get('[class^=modal_close__]').click()
    })

    it("check drag and drop ingredients", () => {
        // Нет времени выбирать - берем первые попавшиеся булку и ингредиент
        cy.get("[class^=ingredient-item_paragraph__]")
            .contains("булка")
            .first()
            .as("bun");

        cy.get("[class^=ingredient-item_paragraph__]")
            .contains("Филе")
            .first()
            .as("main");

        cy.get("[class^=burger-constructor_container__]").as("constructor")
        cy.get("@bun").trigger('dragstart')
        cy.get("@constructor").trigger('drop')

        cy.get("@main").trigger('dragstart')
        cy.get("@constructor").trigger('drop')

        cy.get("button").contains('Оформить заказ').as("sendOrder")

        cy.get("@sendOrder").click().wait('@createOrder')
        cy.get("[class^=modal_close__").click()
    })
})
