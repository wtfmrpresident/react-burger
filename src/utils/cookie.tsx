interface ISetCookieProps {
    /**
     * Cookie expiration in minutes
     */
    expires?: number,
    path?: string,
    domain?: string,
    secure?: boolean,
    httponly?: boolean
}

export function setCookie(name: string, value: string | null, options?: ISetCookieProps) {
    let props = {...options} || {}
    let expires: Date | null = null

    if (props && props.expires) {
        const date = new Date()
        date.setTime(date.getTime() + props.expires * 60 * 1000)

        expires = date
    }

    if (value) {
        value = encodeURIComponent(value)
    }

    let updatedCookie = name + '=' + value
    if (props) {
        for (const propName in props) {
            // @ts-ignore
            const propValue = props[propName]
            updatedCookie += '; ' + encodeURIComponent(propName);

            if (propValue !== true) {
                if (propName === 'expires' && expires) {
                    updatedCookie += '=' + expires.toUTCString()
                } else {
                    updatedCookie += '=' + propValue
                }
            }
        }
    }
    document.cookie = updatedCookie
}

export function getCookie(name: string) {
    const value = "; " + document.cookie
    const parts = value.split("; " + name + "=")

    if (parts && parts.length === 2) {
        // @ts-ignore
        return decodeURIComponent(parts.pop().split(";").shift())
    }
}

export function deleteCookie(name: string) {
    setCookie(name, null, { expires: -1 })
}
