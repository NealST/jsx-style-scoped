const qs = require('qs');

module.exports = function(source) {
  // @ts-ignore
  const resourceQuery = qs.parse(this.resource.split('?')[1]);
  const classNameReg = /\.([^{]+)(\s*)\{/g;
  const scopeId = resourceQuery.scopeId;
  const classnames = resourceQuery.classnames && resourceQuery.classnames.split('($$)');
  if (scopeId && classnames) {
    return source.replace(classNameReg, (matchItem) => {
      const theClassName = matchItem.match(/\.([^{]+)(\s*)\{/)[1].trim();
      // 兼容css的后代选择器模式，比如 .a .b{}
      const classValues = theClassName.split(/(\s+)/);
      const ultiClassName = classValues.map((item, index) => {
        const checkValue = index === 0 ? `.${item}` : item;
        return classnames.indexOf(checkValue) >= 0 ? `${checkValue}-${scopeId}` : checkValue;
      }).join(" ");
      return `${ultiClassName} {`;
    })
  }
  return source
}