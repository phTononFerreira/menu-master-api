import multer from 'multer';
import upload from '../config/multer.config.js';
import APIMessages from '../utils/messages.util.js';

function uploadValidation(field_name) {
    return function (req, res, next) {
        upload.single(field_name)(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: APIMessages.ERROR_UPLOAD });
            } else if (err) {
                return res.status(500).json({ message: APIMessages.INTERNAL_SERVER_ERROR });
            }

            if (!req.file) {
                return res.status(400).json({ message: APIMessages.ERROR_UPLOAD_FILE(field_name) });
            }

            if (!req.file.mimetype.startsWith('image')) {
                return res.status(400).json({ message: APIMessages.ERROR_UPLOAD_IMAGE });
            }

            const mb = 1;
            if (req.file.size > mb * 1024 * 1024) {
                return res.status(400).json({ message: APIMessages.ERROR_UPLOAD_SIZE });
            }

            next();
        });
    };
}

export default uploadValidation;
