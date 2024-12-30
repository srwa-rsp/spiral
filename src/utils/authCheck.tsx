import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";

export default function AuthCheck({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
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
