import { SideNavigation } from "@cloudscape-design/components";

export default function Navigation() {
  return (
    <SideNavigation
      activeHref={document.location.hash}
      header={{ href: "#/page1", text: "Test" }}
      items={[
        {
          type: "expandable-link-group",
          text: "Parent page",
          href: "#/page1",
          items: [
            { type: "link", text: "Child page 4", href: "#/page1/page4" },
            { type: "link", text: "Child page 5", href: "#/page1/page5" },
            { type: "link", text: "Child page 6", href: "#/page1/page6" },
          ]
        },
        { type: "link", text: "Page 2", href: "#/page2" },
        { type: "link", text: "Page 3", href: "#/page3" },
        { type: "link", text: "Page 7", href: "#/page7" },
        { type: "link", text: "Page 8", href: "#/page8" },

        { type: "divider" },
        {
          type: "link",
          text: "Notifications",
          href: "#/notifications",
        },
        {
          type: "link",
          text: "Documentation",
          href: "https://example.com",
          external: true
        }
      ]}
    />
  );
}