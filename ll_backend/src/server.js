import app from './app.js'; // import app.js
import connectDB from './config/db.js'; // import DB connection function

import config from './config/env.js'; // get port from environment variables or use default
const PORT = config.port || 3000;

// connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[STATUS] Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('[ERROR] Server startup failed:', error);
    process.exit(1); // Exit the process with an error code
  });