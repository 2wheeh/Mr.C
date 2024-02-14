import Text from '@/components/atomic/text';
import { signOut, signIn, getUserInfo } from '@/lib/actions/auth';

export async function SignButton() {
  const isLoggedIn = !!(await getUserInfo());

  if (isLoggedIn) {
    return (
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button>
          <Text size="lg" weight="medium">
            Sign Out
          </Text>
        </button>
      </form>
    );
  }

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      action={async () => {
        'use server';

        await signIn();
      }}
    >
      <button>
        <Text size="lg" weight="medium">
          Sign In
        </Text>
      </button>
    </form>
  );
}
