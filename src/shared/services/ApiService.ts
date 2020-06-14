import {responseHandler} from './ResponseHandler'
const url = 'https://bolt-lider.herokuapp.com/'

export function ApiService() {
    const fetchData = (
        endpoint: string,
        method: string = 'GET',
        jwt: string | null = null,
        data?: object
    ) => {
        let options: any
        const authorization = jwt ? {'Authorization': `Bearer ${jwt}`} : {}

        const generalOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...authorization
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

        return fetch(`${url}${endpoint}`, options).then(
            responseHandler.success,
            responseHandler.failure
        )
    }

    return {
        fetchData
    }
}
