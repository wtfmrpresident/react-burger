export const baseUrl = 'https://norma.nomoreparties.space/api'

export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export interface IResponseError {
    statusCode: number,
    message: string
}

class ResponseError implements IResponseError {
    statusCode: number
    message: string

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode
        this.message = message
    }
}

export function checkResponse(response: Response) {
    if (!response.ok) {
        return response.json().then((data) => {
            return Promise.reject(new ResponseError(response.status, data.message))
        })
    }
    return response.json()
}
