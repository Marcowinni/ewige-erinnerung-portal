const fs = require('fs');
const dataUrl = process.env.DATA_URL;
if (!dataUrl) { console.error('Set DATA_URL env'); process.exit(1); }
const m = dataUrl.match(/^data:image\/png;base64,(.+)$/);
const buf = Buffer.from(m[1], 'base64');
const out = 'public/lovable-uploads/memora-logo-full.png';
fs.writeFileSync(out, buf);
console.log('wrote', out, buf.length, 'bytes');
