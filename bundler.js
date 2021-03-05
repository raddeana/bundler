const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const moduleParse = (file = "") => {
  const rawCode = fs.readFileSync(file, "utf-8");
  const ast = babelParser.parse(rawCode, {
    sourceType: "module",
  });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const absoulteFile = `./${path.join(dirname, node.source.value).replace("\\", "/")}.js`;
      dependencies[node.source.value] = absoulteFile;
    },
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    file,
    dependencies,
    code,
  };
};

const buildDependenceGraph = (entry) => {
  const entryModule = moduleParse(entry);
  const rawDependenceGraph = [entryModule];
  for (const module of rawDependenceGraph) {
    const { dependencies } = module;
    if (Object.keys(dependencies).length) {
      for (const file in dependencies) {
        rawDependenceGraph.push(moduleParse(dependencies[file]));
      }
    }
  }
  // 优化依赖图
  const dependenceGraph = {};
  rawDependenceGraph.forEach((module) => {
    dependenceGraph[module.file] = {
      dependencies: module.dependencies,
      code: module.code,
    };
  });
  return dependenceGraph;
};

const generateCode = (entry) => {
  const dependenceGraph = JSON.stringify(buildDependenceGraph(entry));
  return `
  (function(dependenceGraph){
    function require(module) {
      function localRequire(relativePath) {
        return require(dependenceGraph[module].dependencies[relativePath]);
      };
      var exports = {};
      (function(require, exports,  code) {
        eval(code);
      })(localRequire, exports, dependenceGraph[module].code);
      return exports;
    }
    require('${entry}');
  })(${dependenceGraph});
  `;
};

const code = generateCode("./src/index.js");

fs.writeFileSync('app.js', code);