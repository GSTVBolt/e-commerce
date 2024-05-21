import type { Metadata } from "next";
import { AdminNav } from "../components/admin/adminNav";

export const metadata: Metadata = {
    title: "E-commerce Admin",
    description: "E-commerce Admin Dashboard",
  };


export default async function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    )
  }