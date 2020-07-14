const baseConfig = require('../../.mocharc.js')

module.exports = {
  ...baseConfig,
  "require": [...baseConfig.require, "test/shims/images.js", "jsdom-global/register", "mock-local-storage"]
}
