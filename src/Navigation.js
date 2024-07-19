import * as React from "react";
import { SideNavigation, Badge, SideNavigationProps } from "@cloudscape-design/components";
import { WIKI_LABEL, WIKI_LINK } from "./page/CustomHomeHeader/consts";

export const Navigation: React.FC<SideNavigationProps> = (props) => {
  const isDev = import.meta.env ? import.meta.env.DEV : false; // Ensure isDev is correctly initialized

  const navItems: SideNavigationProps.Item[] = [
    // {
    //   type: "expandable-link-group",
    //   text: "Parent page",
    //   href: "#/page1",
    //   items: [
    //     { type: "link", text: "Child page 4", href: "#/page1/page4" },
    //     { type: "link", text: "Child page 5", href: "#/page1/page5" },
    //     { type: "link", text: "Child page 6", href: "#/page1/page6" },
    //   ]
    // },

    { type: "link", text: "Check-in List", href: "#/events/contentdashboard" },
    { type: "link", text: "Check text", href: "#/checktext" },
    { type: "link", text: "Sign In and Sign Up", href: "#/signinup" },
    { type: "link", text: "File Update", href: "#/uploaddownload" },
    { type: "link", text: "Data with Table", href: "#/datatable" },
    { type: "link", text: "Create S3", href: "#/creates3" },
    { type: "link", text: "Run S3", href: "#/runs3" },

    // { type: "divider" },
    // {
    //   type: "link",
    //   text: "Notifications",
    //   href: "#/notifications",
    // },
    // {
    //   type: "link",
    //   text: "Documentation",
    //   href: "https://example.com",
    //   external: true
    // }

    { type: "divider" },
    { type: "link", text: WIKI_LABEL, href: WIKI_LINK, external: true },
  ];

  if (isDev) {
    navItems.push(
      { type: "divider" },
      { type: "link", text: "Environment info", href: "/env", info: <Badge color="blue">DEV</Badge> }
    );
  }

  return (
    <SideNavigation
      activeHref={document.location.hash}
      items={navItems}
      header={{ href: "#/home", text: "Dashboard" }}
      toolsHide={true}
      {...props}
    />
  );
}
export default Navigation;