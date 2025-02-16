"use client";

import { links } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link'
const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="btm-nav bg-base-200 lg:hidden">
      {links.map(({ label, href }) => (
          <Link key={href} href={href} className={`${pathname === href ? "active bg-base-200" : ""}`}>
            {label}
          </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
