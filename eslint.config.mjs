import globals from "globals";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import react from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";
import pluginSecurity from "eslint-plugin-security";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["app/assets/builds/", "public/"],
  },
  {
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.{js,ts,mjs,mts,jsx,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
      "import": importPlugin,
      "react-hooks": reactHooks,
      "react": react,
      "@stylistic": stylistic,
      "security": pluginSecurity,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "jsx-a11y/alt-text": ["error", {
        elements: ["img", "object", "area", "input[type='image']"],
      }],
      "jsx-a11y/label-has-associated-control": ["error", {
        assert: "either",
        depth: 3,
      }],
      "jsx-a11y/aria-role": ["error", {
        ignoreNonDOM: false,
      }],
      "import/order": ["error", {
        groups: ["builtin", "external", "internal"],
      }],
      "import/no-unused-modules": "error",
      "import/no-cycle": "error",
      "import/no-duplicates": "error",
      "import/no-extraneous-dependencies": "error",
      "import/extensions": ["error", "never", { "types": "always", "container": "always", "functions": "always" }],

      "react/no-array-index-key": "error",
      "react/no-direct-mutation-state": "error",
      "react/jsx-no-target-blank": ["error", { "allowReferrer": false }],
      "react/jsx-no-duplicate-props": "error",

      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-unsafe-regex": "error",

      "no-debugger": "error",

      // https://eslint.style/packages/default
      "@stylistic/indent": ["error", 2, {
        "ignoredNodes": ["ConditionalExpression"],
        "SwitchCase": 1,
        "MemberExpression": 1,
      }], // TODO: maybe more config from here: https://eslint.style/rules/default/indent
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/arrow-spacing": ["error", { "before": true, "after": true }],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "@stylistic/comma-dangle": ["error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
        "importAttributes": "always-multiline",
        "dynamicImports": "always-multiline",
      }],
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/func-call-spacing": ["error", "never"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/quotes": ["error", "double", { "avoidEscape": true }],
      "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
      "@stylistic/jsx-closing-tag-location": ["error", "line-aligned"],
      "@stylistic/jsx-equals-spacing": ["error", "never"],
      "@stylistic/jsx-pascal-case": ["error", { "allowAllCaps": true }],
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/keyword-spacing": ["error", { "before": true, "after": true }],
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": ["error", {
        "named": "never",
        "anonymous": "never",
        "asyncArrow": "always",
      }],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: { },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
