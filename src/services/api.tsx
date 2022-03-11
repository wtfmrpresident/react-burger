export const baseUrl = 'https://norma.nomoreparties.space/api'

export function checkResponse(response: Response) {
    if (!response.ok) {
        return Promise.reject(new Error(response.statusText))
    }
    return response.json()
}
