export const responseHandler = {
    success(response: any) {
        if (response.ok) {
            return response.text().then((data: any) => data && JSON.parse(data))
        } else {
            return response.json()
                .then((data: any) => {
                    throw {
                        status: response.status,
                        error: data
                    }
                },
                () => {
                    throw {
                        status: response.status,
                        message: response.statusText
                    }
                }
            )
        }
    },

    failure(err: any) {
        throw {
            message: err.message || err.statusText
        }
    }
}
