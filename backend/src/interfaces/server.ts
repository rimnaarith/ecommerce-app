
import dotenv from 'dotenv'
dotenv.config()

// ====== module-alias config
if (process.env.NODE_ENV === 'production') { 
  require('module-alias/register');
}
// ================================================

// ====== register DI bindings
import "reflect-metadata";
import '@/main/container';
// ================================================

import '@/config/debug'


import app from './app'


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});