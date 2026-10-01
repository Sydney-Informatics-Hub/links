// Lints links.js only (checked in CI by .github/workflows/check-links.yml)
export default [
  {
    files: ['links.js'],
    languageOptions: { sourceType: 'script', ecmaVersion: 'latest' },
    rules: {
      'no-dupe-keys': 'error',
      'comma-dangle': 'off',
    },
  },
];
