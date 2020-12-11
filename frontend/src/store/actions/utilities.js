export const createErrorResponseAction = (type, response) => {
    return {
        type,
        payload: {
            status: 'error',
            statusCode: response?.status,
            statusText: response?.statusText,
            errorMessage: response?.data?.detail
        }
    };
}
