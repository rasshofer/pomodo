import icons from './icons';
import store from './store';
import { MODE_POMODORO, MODE_SHORT_BREAK, MODE_LONG_BREAK, STATE_ACTIVE, STATE_STOPPED, STATE_PAUSED } from './constants';
import { resetDurationToPomodo, resetDurationToShortBreak, resetDurationToLongBreak, setModeToPomodo, setModeToShortBreak, setModeToLongBreak, setStateToActive, setStateToStopped, setStateToPaused, decrement } from './actions';

const { app, Tray, Menu, MenuItem, shell } = require('electron');
const notifier = require('node-notifier');
const path = require('path');
const de = require('./i18n/de.json');
const en = require('./i18n/en.json');

const isWindows = /^win/i.test(process.platform);

if (app.dock && app.dock.hide) {
  app.dock.hide();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let tray;
  let contextMenu;
  let interval;

  const translations = {
    de,
    en
  };

  const i18n = (key) => {
    const language = (app.getLocale() || '').substr(0, 2).toLowerCase();
    if (language in translations) {
      return translations[language][key];
    }
    return translations.en[key];
  };

  function convertSeconds(value) {
    const minutes = Math.floor(value / 60);
    const seconds = (value % 60);
    return `${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
  }

  function setStatus(content = '') {
    tray.setTitle(content.length > 0 ? ` ${content}` : '');
    tray.setToolTip(content || 'Pomodo');
  }

  function updateStatus() {
    const cache = store.getState();

    setStatus(convertSeconds(cache.counter));

    if (cache.counter <= 0) {
      setStatus();
    }

    if (cache.state === STATE_STOPPED) {
      setStatus();
    }
  }

  function clearCounter() {
    clearInterval(interval);
    store.dispatch(setStateToStopped());
  }

  function notify(message) {
    notifier.notify({
      title: 'Pomodo',
      message,
      icon: path.resolve(__dirname, 'icons', 'app.png')
    });
  }

  function updateCounter() {
    let cache = store.getState();

    if (cache.state === STATE_ACTIVE) {
      store.dispatch(decrement());
    }

    cache = store.getState();

    updateStatus();

    if (cache.counter <= 0) {
      clearCounter();
      if (cache.mode === MODE_SHORT_BREAK) {
        notify(i18n('NOTIFY_SHORT_BREAK'));
      } else if (cache.mode === MODE_LONG_BREAK) {
        notify(i18n('NOTIFY_LONG_BREAK'));
      } else {
        notify(i18n('NOTIFY_POMODORO'));
      }
    }
  }

  function startCounter() {
    clearInterval(interval);
    interval = setInterval(updateCounter, 1000);
    store.dispatch(setStateToActive());
    updateStatus();
  }

  function resetDuration() {
    const mode = store.getState().mode;

    if (mode === MODE_POMODORO) {
      store.dispatch(resetDurationToPomodo());
    } else if (mode === MODE_SHORT_BREAK) {
      store.dispatch(resetDurationToShortBreak());
    } else if (mode === MODE_LONG_BREAK) {
      store.dispatch(resetDurationToLongBreak());
    }
  }

  function restartCounter() {
    resetDuration();
    startCounter();
  }

  function stopCounter() {
    store.dispatch(setStateToPaused());
  }

  const startButton = new MenuItem({
    label: i18n('BUTTON_START'),
    icon: icons.start,
    click() {
      startCounter();
    }
  });

  const stopButton = new MenuItem({
    label: i18n('BUTTON_STOP'),
    icon: icons.stop,
    click() {
      stopCounter();
    }
  });

  const resetButton = new MenuItem({
    label: i18n('BUTTON_RESET'),
    icon: icons.reset,
    click() {
      restartCounter();
    }
  });

  const pomodoroMode = new MenuItem({
    label: i18n('MODE_POMODORO'),
    type: 'radio',
    accelerator: 'Command+Shift+P',
    checked: true,
    click() {
      store.dispatch(setModeToPomodo());
      restartCounter();
    }
  });

  const shortBreakMode = new MenuItem({
    label: i18n('MODE_SHORT_BREAK'),
    type: 'radio',
    accelerator: 'Command+Shift+S',
    click() {
      store.dispatch(setModeToShortBreak());
      restartCounter();
    }
  });

  const longBreakMode = new MenuItem({
    label: i18n('MODE_LONG_BREAK'),
    type: 'radio',
    accelerator: 'Command+Shift+L',
    click() {
      store.dispatch(setModeToLongBreak());
      restartCounter();
    }
  });

  const clementimeButton = new MenuItem({
    label: i18n('CLEMENTIME'),
    icon: icons.clementime,
    click() {
      shell.openExternal(i18n('CLEMENTIME_URL'));
    }
  });

  const quitButton = new MenuItem({
    label: i18n('BUTTON_QUIT'),
    accelerator: 'Command+Q',
    selector: 'terminate:',
    click() {
      app.quit();
    }
  });

  const items = [
    startButton,
    stopButton,
    resetButton,
    {
      type: 'separator'
    },
    pomodoroMode,
    shortBreakMode,
    longBreakMode,
    {
      type: 'separator'
    },
    clementimeButton,
    quitButton
  ];

  function updateMode() {
    const mode = store.getState().mode;

    pomodoroMode.checked = (mode === MODE_POMODORO);
    shortBreakMode.checked = (mode === MODE_SHORT_BREAK);
    longBreakMode.checked = (mode === MODE_LONG_BREAK);
  }

  function updateButtonState() {
    const state = store.getState().state;

    if (contextMenu.items && contextMenu.items) {
      contextMenu.items.find(item => item.commandId === startButton.commandId).enabled = (state === STATE_PAUSED || state === STATE_STOPPED);
      contextMenu.items.find(item => item.commandId === stopButton.commandId).enabled = (state === STATE_ACTIVE);
      contextMenu.items.find(item => item.commandId === resetButton.commandId).enabled = (state === STATE_ACTIVE);
    }
  }

  function render() {
    updateStatus();
    updateButtonState();
    updateMode();
  }

  tray = new Tray(isWindows ? icons.trayColored : icons.tray);
  contextMenu = Menu.buildFromTemplate(items);

  tray.setToolTip('Pomodo');
  tray.setContextMenu(contextMenu);

  store.subscribe(render);

  render();
});
