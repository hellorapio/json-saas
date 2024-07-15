import { GitHubLogoIcon } from "@radix-ui/react-icons";
import OAuthProvider from "./OAuthProvider";
import { signIn } from "next-auth/react";

export default function OAuth() {
  async function handleSignIn(provider: string) {
    await signIn(provider);
  }

  return (
    <div className="grid grid-cols-1">
      <OAuthProvider onClick={() => handleSignIn("github")}>
        <GitHubLogoIcon className="w-6 h-6" />
        <div>Continue With Github</div>
      </OAuthProvider>
    </div>
  );
}
