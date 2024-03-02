const RPC = require('discord-rpc');

const rpc = new RPC.Client({
    transport: 'ipc',
});

const startTimestamp = new Date();

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'No requests yet...',
        startTimestamp,
        largeImageKey: 'large_image',
        largeImageText: 'https://insomnia.rest',
    });
});

let requestName = null;
let method = null;

module.exports.requestHooks = [];
module.exports.responseHooks = [];

module.exports.requestHooks.push((ctx) => {
    requestName = ctx.request.getName();
    method = ctx.request.getMethod();
});

module.exports.responseHooks.push((ctx) => {
    if (requestName && method) {
        rpc.setActivity({
            details: `${method} returned HTTP ${ctx.response.getStatusCode()}`,
            startTimestamp,
            largeImageKey: 'large_image',
            largeImageText: 'https://insomnia.rest',
        });
    }
});

rpc.login({
    clientId: '1213360640580653166',
});
