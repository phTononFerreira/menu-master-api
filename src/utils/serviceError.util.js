import APIMessages from "./messages.util.js";

class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServiceError';
    }
}

export function handleServiceError(error, res) {
    if (error instanceof ServiceError) {
        return res.status(404).json({ message: error.message });
    } else {
        return res.status(500).json({ message: APIMessages.INTERNAL_SERVER_ERROR });
    }
}

export default ServiceError;