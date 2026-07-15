import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    rules: {
      // Quotes/apostrophes in JSX prose (legal & FAQ copy) render fine;
      // escaping them adds noise and risks altering content pending review.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
