module.exports = {
  "require": ["ts-node/register/transpile-only"],
  "extension": ["ts"],
  "target": "esnext",
  "recursive": true,
  "timeout": 10000,
  "spec": "test/**/*.{ts,tsx}",
  "watch-files": ["test"],
  "exit": true
}
