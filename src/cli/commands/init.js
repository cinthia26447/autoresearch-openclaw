import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.autoresearch');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

async function initCommand() {
  console.log('');
  console.log(chalk.cyan('╔══════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.white.bold('        AutoResearch — Autonomous Optimization Loop') + '        ' + chalk.cyan('║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════════════════════╝'));
  console.log('');

  // Check if already initialized
  if (await fs.pathExists(CONFIG_FILE)) {
    const config = await fs.readJson(CONFIG_FILE);
    console.log(chalk.yellow('⚠️  Already initialized. Current config:'));
    console.log('');
    console.log(chalk.gray('  Config:    ') + chalk.white(CONFIG_FILE));
    console.log(chalk.gray('  Model:     ') + chalk.white(config.model || 'claude (claude CLI)'));
    console.log(chalk.gray('  Budget:    ') + chalk.white((config.defaultBudget || 20) + ' iterations'));
    console.log('');
    console.log(chalk.gray('Run ') + chalk.cyan('autoresearch status') + chalk.gray(' to see session history.'));
    return;
  }

  // Create config directory
  await fs.ensureDir(CONFIG_DIR);
  await fs.ensureDir(path.join(CONFIG_DIR, 'results'));

  // Create default config
  const config = {
    version: '1.0.0',
    model: 'claude',
    defaultBudget: 20,
    resultsDir: path.join(CONFIG_DIR, 'results'),
    createdAt: new Date().toISOString()
  };

  await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });

  // Print success
  console.log(chalk.green('✓') + ' Created workspace: ' + chalk.white(CONFIG_DIR));
  console.log(chalk.green('✓') + ' Config saved:       ' + chalk.white(CONFIG_FILE));
  console.log(chalk.green('✓') + ' Results directory:  ' + chalk.white(config.resultsDir));
  console.log('');

  // Print dashboard
  const dashboard = boxen(
    chalk.white.bold('AutoResearch Dashboard') + '\n\n' +
    chalk.gray('Sessions:    ') + chalk.white('0 total\n') +
    chalk.gray('Best gain:   ') + chalk.white('—\n') +
    chalk.gray('Model:       ') + chalk.white(config.model + '\n') +
    chalk.gray('Budget:      ') + chalk.white(config.defaultBudget + ' iterations') + '\n\n' +
    chalk.gray('Quick start:\n') +
    chalk.cyan('  autoresearch run --file template.md --metric "bash measure.sh"') + '\n' +
    chalk.cyan('  autoresearch demo') + '\n' +
    chalk.cyan('  autoresearch status'),
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  );
  console.log(dashboard);
  console.log('');
  console.log(chalk.gray('Next: Run ') + chalk.cyan('autoresearch demo') + chalk.gray(' to try it out.'));
}

export default initCommand;