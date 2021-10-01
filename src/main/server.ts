import app from './config/app'
require('dotenv/config');

const port = process.env.PORT

export default
    app.listen(port, () => console.log('Server running at http://localhost:' + port))

