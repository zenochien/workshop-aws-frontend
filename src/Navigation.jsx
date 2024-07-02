import { SideNavigation } from "@cloudscape-design/components";

/*
 * Learn more about Cloudscape Design System at
 * https://cloudscape.design
 */
export default function Navigation() {
  return (
    <SideNavigation
      activeHref={document.location.hash}
      header={{ href: "#/page1", text: "Test" }}
      items={[
        { type: "link", text: "Page 1", href: "#/page1" },
        { type: "link", text: "Page 2", href: "#/page2" }
      ]}
    />
  );
}
