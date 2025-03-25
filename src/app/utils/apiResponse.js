export const apiResponse = (statusCode, message, error, result = null) => {
    return { statusCode, message, error, result }
}