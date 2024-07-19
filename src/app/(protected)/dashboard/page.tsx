import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Page() {
  const user = await auth();

  return (
    <>
      <div>Dashboard</div>
      <p>User Info: {JSON.stringify(user)}</p>
      <form action={signOutAction}>
        <Button>Signout</Button>
      </form>
    </>
  );
}
