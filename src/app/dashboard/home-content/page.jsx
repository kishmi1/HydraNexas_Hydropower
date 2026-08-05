"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function HomeContentPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/home-content");
      const data = await res.json();
      if (data.success) {
        setContent(data.content);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      setLoading(false);
    }
  };

  const handleSave = async (section) => {
    setSaving(true);
    try {
      await fetch("/api/home-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, content: content[section] }),
      });
      alert("Saved successfully");
    } catch (error) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Home Page Content</h1>
        <p className="text-slate-500">Manage home page sections</p>
      </div>

      {/* Company Overview */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold mb-4">Company Overview</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={content.companyOverview?.subtitle || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                companyOverview: { ...prev.companyOverview, subtitle: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={content.companyOverview?.title || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                companyOverview: { ...prev.companyOverview, title: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={content.companyOverview?.description || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                companyOverview: { ...prev.companyOverview, description: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
              rows={4}
            />
          </div>
          <button
            onClick={() => handleSave("companyOverview")}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>

      {/* Sustainability */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold mb-4">Sustainability</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={content.sustainability?.title || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                sustainability: { ...prev.sustainability, title: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={content.sustainability?.description || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                sustainability: { ...prev.sustainability, description: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
              rows={4}
            />
          </div>
          <button
            onClick={() => handleSave("sustainability")}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold mb-4">CTA Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={content.cta?.subtitle || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, subtitle: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={content.cta?.title || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, title: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={content.cta?.description || ""}
              onChange={(e) => setContent(prev => ({
                ...prev,
                cta: { ...prev.cta, description: e.target.value }
              }))}
              className="w-full rounded-xl border p-3"
              rows={4}
            />
          </div>
          <button
            onClick={() => handleSave("cta")}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
