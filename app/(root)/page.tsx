import GetStartedButton from "@/components/buttons/get-started-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>LandingPage</h1>
      <GetStartedButton session={session} />
    </div>
  );
}
