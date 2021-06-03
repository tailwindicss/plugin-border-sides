const plugin = require('tailwindcss/plugin');
const { borderSides, optionsDefault } = require('./index');

module.exports = plugin(borderSides, optionsDefault);
