import { program } from 'commander';
import { getAuthUser, getUser } from './models/user.js';
import { runWithFirebaseApp } from './utils/firebase.js';

type Props = {
  uid?: string;
  email?: string;
};

runWithFirebaseApp(async () => {
  const { uid, email } = program
    .option('-u, --uid <uid>')
    .option('-e, --email <email>')
    .parse(process.argv)
    .opts() as Props;

  if ((!email && !uid) || (email && uid)) {
    console.error(program.outputHelp());
    return;
  }

  const authUser = await getAuthUser({ uid, email });
  const firestoreUser = await getUser({ uid: authUser.uid });

  console.info('[authUser]');
  console.info(JSON.stringify(authUser, null, 2));
  console.info('');
  console.info('[firestoreUser]');
  console.info(JSON.stringify(firestoreUser, null, 2));
  console.info('');
});
