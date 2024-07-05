import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppLayout, BreadcrumbGroup, ContentLayout, Header, Link } from "@cloudscape-design/components";
import Navigation from "./Navigation";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";
import Page3 from "./page/Page3";
import Page4 from "./page/page1/Page4";
import Page5 from "./page/page1/Page5";
import Page6 from "./page/page1/Page6"
import "@cloudscape-design/global-styles/index.css";

export default function App() {
  const [contentHeader, setContentHeader] = useState(null);
  const location = useLocation();

  const getBreadcrumbItems = () => {
    switch (location.pathname) {
      case "/page1":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 1', href: '/page1' },
        ];
      case "/page1/page4":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 1', href: '/page1' },
          { text: 'Page 4', href: '/page1/page4' }
        ];
      case "/page1/page5":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 1', href: '/page1' },
          { text: 'Page 5', href: '/page1/page5' }
        ];
      case "/page1/page6":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 1', href: '/page1' },
          { text: 'Page 6', href: '/page1/page6' }
        ];
      case "/page2":
        return [
          { text: 'Home', href: '/' },
          { text: 'Service', href: '/page2' }
        ];
      case "/page3":
        return [
          { text: 'Home', href: '/' },
          { text: 'Container', href: '/page3' }
        ];
      case "/page4":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 4', href: '/page4' }
        ];
      case "/page5":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page 5', href: '/page5' }
        ];
      default:
        return [{ text: 'Home', href: '/' }];
    }
  };

  return (
    <>
      <ContentLayout
        defaultPadding
        headerVariant="high-contrast"
        header={
          <Header
            variant="h1"
            info={<Link variant="info">Info</Link>}
            description="This is a generic description used in the header."
          >
            Header
          </Header>
        }
      >
      </ContentLayout>

      <AppLayout
        navigationOpen={true}
        toolsHide={true}
        navigation={<Navigation />}
        contentHeader={contentHeader}
        content={
          <>
            <BreadcrumbGroup items={getBreadcrumbItems()} />
            <Routes>
              <Route path="/page1" element={<Page1 setContentHeader={setContentHeader} />} />
              <Route path="/page1/page4" element={<Page4 setContentHeader={setContentHeader} />} />
              <Route path="/page1/page5" element={<Page5 setContentHeader={setContentHeader} />} />
              <Route path="/page1/page6" element={<Page6 setContentHeader={setContentHeader} />} />
              <Route path="/page2" element={<Page2 setContentHeader={setContentHeader} />} />
              <Route path="/page3" element={<Page3 setContentHeader={setContentHeader} />} />
              <Route exact path="/" element={<Navigate to="/page1" />} />
            </Routes>
          </>
        }
      />
    </>
  );
}
