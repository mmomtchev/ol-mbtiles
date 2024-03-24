// This is a webpack technique for displaying code along its output 
// https://mmomtchev.medium.com/making-examples-displaying-code-along-its-output-with-webpack-a28dcf5439c6

const prettier = require('prettier/standalone');
const pluginEstree = require('prettier/plugins/estree');
const parserTypescript = require('prettier/parser-typescript');
const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages(['typescript']);
module.exports = function ts_loader(content, map, meta) {
  const callback = this.async();
  prettier.format(content,
    { parser: 'typescript', plugins: [pluginEstree, parserTypescript] })
    .then((formatted) => {
      const html = Prism.highlight(formatted,
        Prism.languages.typescript, 'typescript');
      callback(null, html, map, meta);
    });
};
