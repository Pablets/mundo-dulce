// jest.config.js
// Sync object
const {defaults} = require('jest-config');
module.exports = {
    verbose: true,
  };
  
  // Or async function
  module.exports = async () => {
    return {
        rootDir: '/home/dev/Documentos/mundo-dulce/backend',
      verbose: true,
    };
  };