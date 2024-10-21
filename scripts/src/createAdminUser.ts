import { program } from 'commander';
import yesno from 'yesno';
import { createAdminUser } from './models/user.js';
import { runWithFirebaseApp } from './utils/firebase.js';

type Props = {
  email: string;
};

runWithFirebaseApp(async () => {
  const { email } = program
    .option('-e, --email <email>')
    .parse(process.argv)
    .opts() as Props;

  if (!email) {
    console.error(program.outputHelp());
    return;
  }

  console.info('');
  console.info('[email]', email);
  console.info('');
  const ok = await yesno({
    question: '管理者アカウントを作成しますか？（y/n）',
  });
  if (!ok) {
    console.info('キャンセルしました');
    return;
  }

  await createAdminUser(email);
  console.info('管理者アカウントを作成しました');
});
