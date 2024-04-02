import multer from 'multer';
import upload from '../config/multer.config.js';

function validateUpload(field_name) {
    return function (req, res, next) {
        upload.single(field_name)(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Error uploading file' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!req.file) {
                return res.status(400).json({ message: `Please, send a file in the "${field_name}" field` });
            }
            
            next();
        });
    };
}

export default validateUpload;
