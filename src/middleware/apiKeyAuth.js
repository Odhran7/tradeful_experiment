// This is the middleware to authenticate the API key

const validateApiKey = (req, res, next) => {
    try {
        const userApiKey = req.headers['x-api-key']
        if (!userApiKey || userApiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized; Invalid API key' });
        }
        next();
    } catch (error) {
        next(error)
    }
}

export default validateApiKey;