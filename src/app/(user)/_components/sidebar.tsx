"use client";
import { links } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen bg-base-200 pt-16 px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        {links.map(({ label, href }) => (
          <Link className={`btn w-full`} href={href} key={label}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
