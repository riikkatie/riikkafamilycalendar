"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types";

export default function SettingsPage() {
  const [conflictsEnabled, setConflictsEnabled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((data: { conflictsEnabled: boolean }) => setConflictsEnabled(data.conflictsEnabled))
      .catch(() => undefined);

    fetch("/api/categories")
      .then((response) => response.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => undefined);
  }, []);

  async function saveSettings(nextValue: boolean) {
    setConflictsEnabled(nextValue);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conflictsEnabled: nextValue }),
    });
  }

  async function addCategory() {
    if (!newCategory.trim()) {
      return;
    }

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory.trim() }),
    });

    if (!response.ok) {
      return;
    }

    const created = (await response.json()) as Category;
    setCategories((current) => [...current, created]);
    setNewCategory("");
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Conflict detection</h2>
        <p className="text-sm text-gray-600">Highlight overlapping events across different calendars.</p>
        <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={conflictsEnabled}
            onChange={(event) => saveSettings(event.target.checked)}
          />
          Enable conflict highlighting
        </label>
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
        <p className="text-sm text-gray-600">Default categories can be extended any time.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {categories.map((category) => (
            <li key={category.id}>
              {category.icon ? `${category.icon} ` : ""}
              {category.name}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <input
            className="w-full rounded border px-2 py-1"
            placeholder="New category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <button onClick={addCategory} className="rounded bg-gray-900 px-3 py-1 text-white" type="button">
            Add
          </button>
        </div>
      </div>
    </section>
  );
}
