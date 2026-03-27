import chalk from 'chalk';
import boxen from 'boxen';
import Table from 'cli-table3';

async function skillsCommand() {
  const skills = [
    {
      name: 'prompt-optimizer',
      description: 'Optimize system prompts against eval scores'
    },
    {
      name: 'outreach-optimizer',
      description: 'Optimize cold email/DM templates for reply rates'
    },
    {
      name: 'content-optimizer',
      description: 'Optimize blog posts and landing copy for engagement'
    },
    {
      name: 'config-tuner',
      description: 'Tune YAML/JSON configs against benchmark scripts'
    },
    {
      name: 'prediction-optimizer',
      description: 'Optimize prediction market strategies for Brier score'
    }
  ];

  console.log('');
  console.log(boxen(
    chalk.bold.cyan('AutoResearch Skill Packs'),
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
  console.log('');

  const table = new Table({
    head: [chalk.cyan('Skill'), chalk.cyan('Description')],
    style: { head: [], border: ['gray'] }
  });

  for (const skill of skills) {
    table.push([
      chalk.bold(skill.name),
      skill.description
    ]);
  }

  console.log(table.toString());
  console.log('');
  console.log(chalk.gray('Use with: autoresearch run --skill <name> --file <path> --metric <cmd>'));
  console.log('');
}

export default skillsCommand;