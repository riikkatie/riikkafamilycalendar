"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [owner, setOwner] = useState("calendar1");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, owner }),
    });

    if (!response.ok) {
      setError("Invalid PIN/password.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-gray-900">Family login</h1>
      <p className="text-sm text-gray-600">Use the shared password and pick your own calendar for editing rights.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <label className="block text-sm text-gray-700">
          Shared password / PIN
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
            required
          />
        </label>
        <label className="block text-sm text-gray-700">
          My calendar
          <select
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
          >
            <option value="calendar1">Calendar 1 (Pink)</option>
            <option value="calendar2">Calendar 2 (Green)</option>
            <option value="calendar3">Calendar 3 (Blue)</option>
          </select>
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="w-full rounded bg-gray-900 px-3 py-2 text-white">
          Sign in
        </button>
      </form>
    </section>
  );
}
