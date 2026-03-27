import chalk from 'chalk';
import boxen from 'boxen';
import ora from 'ora';
import path from 'path';
import { spawn } from 'child_process';
import os from 'os';

async function runCommand(options) {
  const CONFIG_DIR = path.join(os.homedir(), '.autoresearch');
  
  // Validate inputs
  if (!options.file) {
    console.error(chalk.red('Error: --file is required'));
    console.log('Usage: autoresearch run --file <path> --metric "command" [--budget 20] [--goal maximize|minimize]');
    process.exit(1);
  }
  
  if (!options.metric) {
    console.error(chalk.red('Error: --metric is required'));
    process.exit(1);
  }
  
  // Resolve file path
  const filePath = path.resolve(options.file);
  
  // Check if file exists
  const fs = await import('fs');
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`Error: File not found: ${filePath}`));
    process.exit(1);
  }
  
  // Set options
  const budget = options.budget || 20;
  const goal = options.goal || 'maximize';
  const session = options.session || generateSessionName();
  
  // Print banner
  console.log(boxen(
    chalk.bold.blue('AutoResearch Loop') + '\n' +
    chalk.gray('OpenClaw Autonomous Optimization\n') +
    chalk.dim(`Session: ${session}`),
    { padding: 1, borderStyle: 'round', borderColor: 'blue' }
  ));
  
  console.log(chalk.gray('\nConfiguration:'));
  console.log(`  File:    ${chalk.cyan(filePath)}`);
  console.log(`  Metric:  ${chalk.cyan(options.metric.substring(0, 50))}${options.metric.length > 50 ? '...' : ''}`);
  console.log(`  Budget:  ${chalk.cyan(budget)} iterations`);
  console.log(`  Goal:    ${chalk.cyan(goal)}`);
  console.log();
  
  console.log(chalk.red('Note: This command requires the autoresearch-loop skill to be installed.'));
  console.log(chalk.gray('See: https://github.com/rmarji/autoresearch-openclaw#setup'));
}

function generateSessionName() {
  const now = new Date();
  const date = now.toISOString().split('T')[0].replace(/-/g, '');
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '').substring(0, 6);
  return `autoresearch-${date}-${time}`;
}

export default runCommand;