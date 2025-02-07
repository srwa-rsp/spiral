import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthCheck({ children }: any) {
  const { status } = useSession({ required: true });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status !== "authenticated") {
    router.push("/auth/login");
  }

  return children;
}
