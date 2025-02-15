"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbItem className="capitalize">
              {index === segments.length - 1 ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                  className="hover:bg-sidebar-accent -mx-1.5 rounded-md px-1.5 py-1"
                >
                  {segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== segments.length - 1 && <BreadcrumbSeparator className="h-4" />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
