"use client";

import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { updateCourseTest } from "../actions/courseActions";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{status: number, message: string} | null>(null);

  function handleUpdate() {
    setResult(null);
    setLoading(true);
    updateCourseTest().then(res => setResult(res))
        .catch(err => setResult(err))
        .finally(()=> setLoading(false));
  }

  return (
    <div className="flex items-center gap-4">
        <Button outline onClick={handleUpdate}>
            {loading && <Spinner size="sm" className="me-3" light/>}
            Test Auth
        </Button>
        <div>
            {JSON.stringify(result, null, 2)}
        </div>
    </div>
  )
}
