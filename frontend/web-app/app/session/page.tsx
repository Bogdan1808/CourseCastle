import { auth } from "@/auth";
import Heading from "@/components/heading";
import { Navbar } from "@/components/navbar";
import React from "react";
import AuthTest from "./AuthTest";

export default async function Session() {
  const session = await auth();
  return(
    <>
      <Navbar/>
      <div>
          <Heading title="Session dashboard"/>
          <div className="bg-blue-200 border-2 border-blue-500">
              <h3 className="text-lg">Session data</h3>
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(session, null, 2)}</pre>
          </div>
          <div className="mt-4">
              <AuthTest />
          </div>
      </div>
    </>
  )
}
