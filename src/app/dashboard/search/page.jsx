import { Suspense } from "react";
import SearchContent from "./SearchContent";

export const metadata = {
  title: "Search - HydraNexas",
  description: "Search across projects, news, events, tender notices, and users",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 lg:p-8">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}