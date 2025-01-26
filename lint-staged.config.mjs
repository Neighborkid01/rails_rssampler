export default {
  "*.{ts,js,tsx,jsx,mjs,mts}": "eslint --cache --fix",
  "*.rb": (files) => {
    const filtered = files.filter(file => !file.endsWith("db/schema.rb"));
    if (filtered.length === 0) { return "echo \"Have to return something so we don't lint the whole project\""; }
    return `rubocop -a -c .rubocop.yml --fail-level E ${filtered.join(" ")}`;
  },
};
