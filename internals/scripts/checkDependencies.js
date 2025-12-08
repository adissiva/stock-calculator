import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const requiredDeps = [
  '@babel/plugin-transform-modules-commonjs',
  'webpack',
  'webpack-dev-middleware',
  'webpack-hot-middleware',
  'babel-loader',
  '@babel/preset-env',
  '@babel/preset-react',
  'style-loader',
  'css-loader',
  'chalk@4',
  'express',
  'minimist',
  'ngrok',
  'compression',
  'body-parser',
];

const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
const missingDeps = requiredDeps.filter((dep) => !allDeps[dep]);

if (missingDeps.length > 0) {
  console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
  try {
    execSync(`npm install --save-dev ${missingDeps.join(' ')}`, {
      stdio: 'inherit',
    });
    console.log('Dependencies installed successfully!');
  } catch (error) {
    console.error('Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('All required dependencies are already installed.');
}
