import { FaGoogle, FaGithub } from "react-icons/fa";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import OAuthProvider from "./OAuthProvider";
import { signIn } from "next-auth/react";

export default function OAuth() {
  async function handleSignIn(provider: string) {
    await signIn(provider);
  }

  return (
    <div className="grid grid-cols-2 gap-x-4">
      <OAuthProvider onClick={() => handleSignIn("google")}>
        <FaGoogle className="w-6 h-6" />
      </OAuthProvider>
      <OAuthProvider onClick={() => handleSignIn("github")}>
        <FaGithub className="w-6 h-6" />
      </OAuthProvider>
    </div>
  );
}
