import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const dataUrl = JSON.parse(body).image;
                const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
                fs.writeFileSync('logo2.png', base64Data, 'base64');
                console.log("Successfully saved transparent logo2.png!");
                res.writeHead(200, { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(JSON.stringify({ success: true }));
                setTimeout(() => process.exit(0), 1000);
            } catch (err) {
                console.error("Error saving image:", err);
                res.writeHead(500);
                res.end(err.message);
            }
        });
    } else if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
    } else {
        // Return HTML page to render canvas
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,800&display=swap" rel="stylesheet">
                <style>
                    body { margin: 0; background: transparent; }
                </style>
            </head>
            <body>
                <canvas id="canvas" width="900" height="220"></canvas>
                <script>
                    window.onload = function() {
                        document.fonts.ready.then(function() {
                            const canvas = document.getElementById('canvas');
                            const ctx = canvas.getContext('2d');
                            
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
                            // Use Bodoni Moda font
                            ctx.font = "800 85px 'Bodoni Moda', serif";
                            ctx.textBaseline = "middle";
                            ctx.textAlign = "center";
                            
                            // Premium metallic gradient: Blue-Gold-Blue
                            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                            gradient.addColorStop(0.1, '#1E3A8A'); // Navy
                            gradient.addColorStop(0.5, '#8E704F'); // Gold
                            gradient.addColorStop(0.9, '#1E3A8A'); // Navy
                            
                            ctx.fillStyle = gradient;
                            ctx.shadowColor = 'rgba(30, 58, 138, 0.2)';
                            ctx.shadowBlur = 6;
                            ctx.shadowOffsetX = 2;
                            ctx.shadowOffsetY = 2;
                            
                            ctx.fillText("dehliz ek umeed", canvas.width / 2, canvas.height / 2);
                            
                            // Post back the data URL
                            fetch('http://localhost:3009/', {
                                method: 'POST',
                                body: JSON.stringify({ image: canvas.toDataURL('image/png') }),
                                headers: { 'Content-Type': 'application/json' }
                            }).then(() => {
                                document.body.innerHTML = "<h1>Done! You can close this.</h1>";
                            });
                        });
                    };
                </script>
            </body>
            </html>
        `);
    }
});

server.listen(3009, () => {
    console.log("Server listening on port 3009...");
});
