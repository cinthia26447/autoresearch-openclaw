import chalk from 'chalk';
import boxen from 'boxen';
import os from 'os';
import path from 'path';
import fs from 'fs-extra';

async function statusCommand() {
  const CONFIG_DIR = path.join(os.homedir(), '.autoresearch');
  const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
  const RESULTS_DIR = path.join(CONFIG_DIR, 'results');
  
  // Load config
  let config = {};
  try {
    if (await fs.pathExists(CONFIG_FILE)) {
      config = await fs.readJson(CONFIG_FILE);
    }
  } catch {}
  
  if (!config.model) {
    console.log(chalk.yellow('\n⚠️  AutoResearch not initialized.'));
    console.log(chalk.gray('   Run ') + chalk.cyan('autoresearch init') + chalk.gray(' first.\n'));
    return;
  }
  
  // Load sessions
  let sessions = [];
  if (await fs.pathExists(RESULTS_DIR)) {
    const dirs = await fs.readdir(RESULTS_DIR);
    for (const dir of dirs) {
      const sessionPath = path.join(RESULTS_DIR, dir);
      const stat = await fs.stat(sessionPath);
      if (stat.isDirectory()) {
        sessions.push({
          id: dir,
          date: stat.mtime
        });
      }
    }
  }
  
  // Print dashboard
  console.log('');
  console.log(boxen(
    chalk.bold.white('AutoResearch Dashboard') + '\n\n' +
    chalk.gray(`Sessions: ${sessions.length} total`) + '\n' +
    chalk.gray(`Model: ${config.model}`) + '\n' +
    chalk.gray(`Budget: ${config.defaultBudget || 20} iterations`),
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
  console.log('');
  
  if (sessions.length === 0) {
    console.log(chalk.gray('No sessions yet. Run:'));
    console.log(chalk.cyan('  autoresearch demo'));
    console.log('');
  } else {
    console.log(chalk.bold('Recent Sessions'));
    for (const s of sessions.slice(0, 5)) {
      console.log(`  ${chalk.cyan(s.id)}`);
    }
    console.log('');
  }
}

export default statusCommand;