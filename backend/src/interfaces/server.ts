
import dotenv from 'dotenv'
dotenv.config()

// ====== register DI bindings
import "reflect-metadata";
import '@/main/container.js';
// ================================================

import '@/config/debug.js'


import app from './app.js'


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});