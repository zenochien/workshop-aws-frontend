import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@cloudscape-design/components";
import Navigation from "./Navigation";
import Page1 from "./Page1";
import Page2 from "./Page2";

/*
 * Learn more about Cloudscape Design System at
 * https://cloudscape.design
 */
export default function App() {
  const [contentHeader, setContentHeader] = useState(null);

  return (
    <AppLayout
      toolsHide={true}
      navigation={<Navigation />}
      contentHeader={contentHeader}
      content={
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
          <Route exact path="/" element={<Navigate to="/page1" />} />
        </Routes>
      }
    />
  );
}
