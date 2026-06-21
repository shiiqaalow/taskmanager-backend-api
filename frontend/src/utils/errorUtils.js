export const extractErrorMessages = (error) => {
    if(!error) {
        return null
    }
    if(error.response?.data) {
        // handle array errors(zod validation errors)
        const data = error.response.data
        if(data.errors && Array.isArray(data.errors) ){
            return data.errors.map(error => error.message).join(',')
        }
        // hanndle single error
        if(data.message) {
            return data.message
        }

        // handle error field
        if(data.error) {
            return data.error
        }
    }

    // handle network error
    if(error.request && !error.response) {
        return 'Network Error, Please check your connection'
    }
    // fall back to general error
    if(error.message){
        return error.message
    }
    return 'Something went wrong please try again'
}