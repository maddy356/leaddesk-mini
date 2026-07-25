const dns = require('dns');
dns.setServers(['8.8.8.8']);
dns.resolveTxt('cluster0.yjtdoc2.mongodb.net', (err, txt) => {
  if (err) console.error(err);
  else console.log(txt);
});
