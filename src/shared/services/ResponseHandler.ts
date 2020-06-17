export const responseHandler = {
    success: (response: any) => {
        if (response.ok) {
            return response.json().then((data: any) => {
                if (data.error) {
                    throw {
                        status: response.status,
                        message: data.error.message,
                    }
                }
                return data
            })
        } else {
            return response.json().then(
                (data: any) => {
                    throw {
                        status: response.status,
                        message: data.error.message,
                    }
                },
                () => {
                    throw {
                        status: response.status,
                        message: response.statusText,
                    }
                }
            )
        }
    },
    failure: (err: any) => {
        throw {
            message: err.message || err.statusText,
        }
    },
}
