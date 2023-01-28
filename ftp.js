const ftp = require('ftp');
const client = new ftp();
client.on('ready', () => {
    console.log('ftp client is ready');
});
client.connect({
    host: '77.74.54.201',
    port: '21',
    user: 'jiacai',
    password: 'jiacai',
    keepalive: 1000
});
