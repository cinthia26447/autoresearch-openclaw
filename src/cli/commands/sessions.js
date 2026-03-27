import chalk from 'chalk';
import boxen from 'boxen';

async function sessionsCommand(action, id) {
  if (action === 'list') {
    console.log(chalk.cyan('AutoResearch Sessions'));
    console.log(chalk.gray('(No sessions yet. Run `autoresearch run` to create one.)'));
  } else if (action === 'show' && id) {
    console.log(chalk.cyan(`Session: ${id}`));
    console.log(chalk.gray('(Session not found)'));
  } else {
    console.log(chalk.gray('Usage:'));
    console.log(chalk.cyan('  autoresearch sessions list'));
    console.log(chalk.cyan('  autoresearch sessions show <id>'));
  }
}

export default sessionsCommand;