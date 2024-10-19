const { Backup, Restore } = require('../../lib/src/mongo/mongo-info.js');
exports.default = {
   names: ['Owner'],
   tags: ['backup', 'restore'],
   command: ['backup', 'restore'],
   start: async (m, {
      command
   }) => {
      if (command == 'backup') {
         const response = await Backup(global.db);
         m.reply(response)         
      } else if (command == 'restore') {
         const response = await Restore();
         await m.reply(response + '\nRestarting...');
         process.send('reset');
      }
   },
   owner: true
};
