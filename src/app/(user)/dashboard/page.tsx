'use client'
import { api } from "@/trpc/server";
import SaveFirstChecklist from "./_components/save-first";

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <SaveFirstChecklist />
    </div>
  );
};

export default DashboardPage;
