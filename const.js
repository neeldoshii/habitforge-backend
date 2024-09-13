const responseStatus = {
    success: 200,  // Request succeeded
    badRequest: 400,  // Malformed or invalid request
    unverified: 401,  // User not verified or unauthorized
    forbidden: 403,  // No access rights (e.g., unverified user)
    notFound: 404,  // Resource not found.
    serverError: 500  // Server failed to process request
};


module.exports = responseStatus