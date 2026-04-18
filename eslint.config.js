// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  rules: {
    // Allow unused vars if they start with underscore
    // Useful for Express middleware: (req, res, next) where req is unused
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Allow explicit any in rare cases where you genuinely need it
    // Change to 'error' once you're comfortable with TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',

    // Enforce consistent type imports
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  ignores: ['dist/', 'node_modules/', 'tests/e2e/'],
})
