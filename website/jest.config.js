module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      "\\.(mp3)$": "identity-obj-proxy"
    },
    collectCoverageFrom: [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!assets.d.ts",
      "!setupTests.ts",
      "!src/index.tsx"
    ],  
  };