import {responseHandler} from './ResponseHandler'

export function ApiService() {
    const fetchData = (url: string, method: string, data?: object) => {
        let options
        const generalOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (data) {
            options = {
                ...generalOptions,
                body: JSON.stringify(data)
            }
        } else {
            options = {
                ...generalOptions
            }
        }

        return fetch(url, options).then(
            responseHandler.success,
            responseHandler.failure
        )
    }

    return {
        fetchData
    }
}
