import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const cache = new Map();
export function sourceTree(file) {
  return ts.createSourceFile(file, readFileSync(path.resolve(root, file), 'utf8'), ts.ScriptTarget.Latest, true);
}

// Read static data without evaluating application modules or connecting to services.
export function readData(file, name) {
  const key = `${file}:${name}`;
  if (cache.has(key)) return cache.get(key);
  const tree = sourceTree(file);
  const variables = new Map();
  const imports = new Map();
  for (const statement of tree.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) variables.set(declaration.name.getText(tree), declaration.initializer);
    }
    if (ts.isImportDeclaration(statement) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
      for (const item of statement.importClause.namedBindings.elements) imports.set(item.name.text, [statement.moduleSpecifier.text, item.propertyName?.text ?? item.name.text]);
    }
  }
  function parse(node) {
    if (!node) throw new Error(`Missing static declaration ${key}`);
    if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return ts.isNumericLiteral(node) ? Number(node.text) : node.text;
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return parse(node.expression);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(parse);
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
      if (!ts.isPropertyAssignment(property)) throw new Error(`Non-static property in ${key}`);
      return [property.name.text ?? property.name.getText(tree), parse(property.initializer)];
    }));
    if (ts.isIdentifier(node)) {
      if (variables.has(node.text)) return parse(variables.get(node.text));
      const imported = imports.get(node.text);
      if (imported) {
        const base = imported[0].startsWith('@/') ? imported[0].slice(2) : path.join(path.dirname(file), imported[0]);
        const resolved = [base + '.ts', base + '/index.ts'].find(candidate => existsSync(path.resolve(root, candidate)));
        if (resolved) return readData(resolved, imported[1]);
      }
    }
    throw new Error(`Unsupported static value in ${key}: ${ts.SyntaxKind[node.kind]}`);
  }
  const result = parse(variables.get(name));
  cache.set(key, result);
  return result;
}

export function sourceFiles(directory) {
  return readdirSync(path.resolve(root, directory), { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? sourceFiles(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
}

let registered;
export function publicRoutes() {
  if (registered) return registered;
  registered = new Set(sourceFiles('app').filter(file => /\/page\.tsx$/.test(file) && !file.includes('['))
    .map(file => file.slice(3).replace(/\/page\.tsx$/, '') || '/'));
  for (const [file, variable, prefix] of [
    ['lib/landing/index.ts', 'LANDING_PAGES', '/mca-roc'],
    ['lib/fiu-ind-aml/index.ts', 'FIU_IND_SERVICES', '/fiu-ind-aml'],
    ['lib/gov-lic/index.ts', 'GOV_LIC_SERVICES', '/gov-lic'],
  ]) for (const item of readData(file, variable)) registered.add(`${prefix}/${item.slug}`);
  for (const category of readData('lib/content/services/registry.ts', 'SOLUTION_CATEGORIES')) {
    registered.add(`/solutions/${category.slug}`);
    for (const page of category.pages) registered.add(`/solutions/${category.slug}/${page.slug}`);
  }
  return registered;
}

export function routeExists(href) {
  const pathname = new URL(href, 'http://localhost').pathname;
  return publicRoutes().has(pathname);
}
