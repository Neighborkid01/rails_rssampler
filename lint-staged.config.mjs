export default {
  "*.{ts,js,tsx,jsx,mts,mjs}": "eslint --cache --fix",
  // "*.{ts,tsx,mts}": "npx tsc --noEmit",
  "*.rb": (files) => {
    const filtered = files.filter(file => !file.endsWith("db/schema.rb"));
    if (filtered.length === 0) { return "echo \"Have to return something so we don't lint the whole project\""; }
    return `rubocop -a -c .rubocop.yml --fail-level E ${filtered.join(" ")}`;
  },
};
