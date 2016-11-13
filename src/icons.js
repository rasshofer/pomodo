const path = require('path');

const icons = {};

[
  'tray',
  'start',
  'stop',
  'reset',
  'clementime'
].forEach((item) => {
  icons[item] = path.resolve(__dirname, 'icons', `${item}Template.png`);
});

icons.trayColored = path.resolve(__dirname, 'icons', 'trayColored.png');

export default icons;
