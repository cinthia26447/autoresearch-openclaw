import chalk from 'chalk';
import boxen from 'boxen';

async function demoCommand(options) {
  const budget = options.budget || 5;
  
  console.log('');
  console.log(boxen(
    chalk.bold.cyan('AutoResearch Demo') + '\n' +
    chalk.gray('One-command demo with mock metric'),
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
  
  console.log(chalk.gray('\nDemo: Optimizing a cold outreach template'));
  console.log(chalk.gray(`Budget: ${budget} iterations\n`));
  console.log(chalk.gray('This demo would optimize your outreach template for reply rates.'));
  console.log(chalk.gray('The autoresearch-loop skill must be installed for this to work.\n'));
  console.log(chalk.gray('To use autoresearch on your own files:'));
  console.log(chalk.cyan('  autoresearch run --file template.md --metric "bash measure.sh"'));
  console.log('');
}

export default demoCommand;