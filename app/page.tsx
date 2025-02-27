"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const authStatus = true;
function IndexPage() {
  const router = useRouter();

  useEffect(() => {

    if (authStatus) {
      router.push("/dashboard");
      return;
    }
    router.push("/welcome");
  }, []);
  return <div>...Please Wait</div>;
}

export default IndexPage;
