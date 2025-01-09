console.log('🕒 Starting Maleficent . . .');
const path = require('path');
const { spawn } = require('child_process');
const start = () => {
    const args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
    const p = spawn(process.argv[0], args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        })
        .on('message', data => {
            if (data == 'reset') {
                console.log('🕒 Restarting Meleficent . . .')
                p.kill(), delete p
            }
            if (data == 'uptime') {
                p.send(process.uptime());
            }
        })
        .on('exit', code => {
            console.log('Exited with code:', code);
            start()
        })
}
start()