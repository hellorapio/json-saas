import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function Page() {
  const user = await auth();

  return (
    <>
      <div>Dashboard</div>
      <p>User Info: {JSON.stringify(user)}</p>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Signout</Button>
      </form>
    </>
  );
}
