const styleReg = /\.(c|sc|sa|le)ss/g;

const classNameReg = /className=\"([^"]+)\"/g;

const md5 = require('md5');

const path = require("path");

const computedHash = {};

const computeHash = (filePath) => {
  if (computedHash[filePath]) {
    return computedHash[filePath]
  }

  const relative = path.relative(process.cwd(), filePath);
  const hash = md5(relative).substr(0, 8);
  computedHash[filePath] = hash;
  return hash;
}

module.exports = function(source) {
  const filePath = this.resourcePath;
  const hash = computeHash(filePath);
  let classnames = [];
  
  return source.replace(classNameReg, (match) => {
    const classValues = match.match(/className=\"([^"]+)\"/)[1].trim().split(" ");
    // 转化成带.的选择器
    classnames = classnames.concat(classValues.map(item => `.${item}`));
    return `className="${classValues.map(item => `${item.trim()}-${hash}`).join(" ")}"`;
  }).replace(styleReg, (match) => {
    return `${match}?scopeId=${hash}&classnames=${classnames.join('($$)')}`;
  });
}