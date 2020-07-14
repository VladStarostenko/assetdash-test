const baseConfig = require('../../.eslintrc.json')

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.ts", "**/*.test.tsx"]}]
  }
}
