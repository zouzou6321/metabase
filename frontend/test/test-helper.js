import jsdom from 'jsdom';
import angular from 'angular';

const document = jsdom.jsdom('<html><head><script></script></head><body></body></html>');
const window = document.createWindow();

global.window = window;
global.document = document;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
