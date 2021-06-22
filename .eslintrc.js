module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "react-app",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:testing-library/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "import",
    "jsx-a11y",
    "testing-library",
    "jest-dom",
    "import-helpers",
  ],
  rules: {
    camelcase: "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always", // new line between groups
        groups: ["/^react/", "module", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "jest-dom/prefer-checked": "error",
    "jest-dom/prefer-enabled-disabled": "error",
    "jest-dom/prefer-required": "error",
    "jest-dom/prefer-to-have-attribute": "error",
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debug": "warn",
    "react/jsx-props-no-spreading": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        paths: ["src"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
};
