const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts')

module.exports = withPlugins(
  [optimizedImages, withFonts]
);