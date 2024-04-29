class APIMessages { }

APIMessages.SUCCESS_SERVER_START = (port) => `✅ Server started on port ${port}.`;
APIMessages.ERROR_TABLE_SYNC = (error) => `❌ Error synchronizing tables: ${error}`;
APIMessages.SUCCESS_TABLE_SYNC = () => '✅ Tables synchronized successfully.';
APIMessages.SUCCESS_CONNECT = '✅(Sequelize) Successful connection!';
APIMessages.ERROR_CONNECT = (error) => `❌(Sequelize) Error connecting to PostgreSQL database: ${error} `;

APIMessages.INTERNAL_SERVER_ERROR = 'Internal server error (500)';

APIMessages.ERROR_UPLOAD = 'Error uploading file';
APIMessages.ERROR_UPLOAD_IMAGE = 'Please upload an image file';
APIMessages.ERROR_UPLOAD_FILE = (field_name) => `Please, send a file in the "${field_name}" field`;
APIMessages.ERROR_UPLOAD_SIZE = 'File size exceeds the limit';


export default APIMessages;
