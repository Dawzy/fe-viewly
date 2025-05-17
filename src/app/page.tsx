import { PageHeader } from "@/components";

export default function Home() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <PageHeader
        title="My Lists"
      />

      {/* Page Content */}
      <div className="page w-full px-8 py-4 gap-12 flex-wrap justify-center">

      </div>
    </div>
  );
}