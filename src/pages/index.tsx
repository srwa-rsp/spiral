"use-client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const index = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/auth/login');
    }
  }, [router]);
  if (session) {
    return <div>index</div>;
  } else {
    return <div>Redirecting...</div>;
  }
};

export default index;
