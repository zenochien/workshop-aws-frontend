import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppLayout } from "@cloudscape-design/components";
import { BreadcrumbGroup } from "@cloudscape-design/components"
import Navigation from "./Navigation";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";
import Page3 from "./page/Page3";

export default function App() {
  const [contentHeader, setContentHeader] = useState(null);
  const location = useLocation();

  const getBreadcrumbItems = () => {
    switch (location.pathname) {
      case "/page1":
        return [
          { text: 'Home', href: '/' },
          { text: 'Page', href: '/page1' },
        ];
      case "/page2":
        return [
          { text: 'Home', href: '/' },
          { text: 'Service', href: '/page2' },
        ];
      case "/page3":
        return [
          { text: 'Home', href: '/' },
          { text: 'Container', href: '/page3' },
        ];
      default:
        return [{ text: 'Home', href: '/' }];
    }
  };

  return (
    <AppLayout
      toolsHide={true}
      navigation={<Navigation />}
      contentHeader={contentHeader}
      content={
        <>
          <BreadcrumbGroup
            // items={[
            //   { text: 'Home', href: '/' },
            //   { text: 'Page', href: '#/page1' },
            //   { text: 'Severce', href: '#/page2' }
            // ]}
            items={getBreadcrumbItems()}
          />
          <Routes>
            <Route
              path="/page1"
              element={<Page1 setContentHeader={setContentHeader} />}
            />
            <Route
              exact
              path="/page2"
              element={<Page2 setContentHeader={setContentHeader} />}
            />
            <Route
              exact
              path="/page3"
              element={<Page3 setContentHeader={setContentHeader} />}
            />
            <Route exact path="/" element={<Navigate to="/page1" />} />
          </Routes>
        </>
      }
    />
  );
}
