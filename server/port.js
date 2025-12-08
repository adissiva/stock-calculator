import argv from './argv.js';

export default parseInt(argv.port || process.env.PORT || '7003', 10);
