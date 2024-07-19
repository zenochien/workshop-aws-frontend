import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppLayout, BreadcrumbGroup, ContentLayout, Header, Button, Container } from "@cloudscape-design/components";
import Navigation from "./Navigation";
import "@cloudscape-design/global-styles/index.css";
import Home from "./page/home"
import { Contentdashboard } from "./events/contentdashboard";
import CustomHomeHeader from "./page/CustomHomeHeader/CustomHomeHeader";
import CheckText from "./page/checktext";
import SignInUp from "./page/signinup";
import UploadAndDownmload from "./page/uploaddownload";
import DataTable from "./page/datatable";
import CreateS3 from "./page/creates3";
import RunS3 from "./page/runs3";

export default function App() {
  const [contentHeader, setContentHeader] = useState(null);
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const [isToolsHidden, setIsToolsHidden] = useState(true);
  const location = useLocation();

  const getBreadcrumbItems = () => {
    switch (location.pathname) {
      case "/home":
        return [
          { text: 'Home', href: '/' },
          { text: 'Home', href: '/home' },
        ];
      // case "/home/page4":
      //   return [
      //     { text: 'Home', href: '/' },
      //     { text: 'Home', href: '/home' },
      //     { text: 'Page 4', href: '/home/page4' }
      //   ];
      // case "/home/page5":
      //   return [
      //     { text: 'Home', href: '/' },
      //     { text: 'Home', href: '/home' },
      //     { text: 'Page 5', href: '/home/page5' }
      //   ];
      // case "/home/page6":
      // return [
      //   { text: 'Home', href: '/' },
      //   { text: 'Home', href: '/home' },
      //   { text: 'Page 6', href: '/home/page6' }
      // ];
      // case "/page2":
      //   return [
      //     { text: 'Home', href: '/' },
      //     { text: 'Service', href: '/page2' }
      //   ];
      case "/checktext":
        return [
          { text: 'Home', href: '/' },
          { text: 'Check Text', href: '/checktext' }
        ];

        return [
          { text: 'Home', href: '/' },
          { text: 'Page 5', href: '/page5' }
        ];
      case "/signinup":
        return [
          { text: 'Home', href: '/' },
          { text: 'Sigin up and sigin in', href: '/signinup' }
        ];
      case "/uploaddownload":
        return [
          { text: 'Home', href: '/' },
          { text: 'File Updata and Download', href: '/uploaddownload' }
        ];
      case "/datatable":
        return [
          { text: 'Home', href: '/' },
          { text: 'Data with Table', href: '/datatable' }
        ];
      case "/creates3":
        return [
          { text: 'Home', href: '/' },
          { text: 'Create S3', href: '/create s3' }
        ];
      case "/runs3":
        return [
          { text: 'Home', href: '/' },
          { text: 'Run S3', href: '/runs3' }
        ];
      case "/events/content-daskboard":
        return [
          { text: 'Home', href: '/' },
          { text: 'Dashboard Content', href: '/events/contentdashboard' }
        ];
      default:
        return [{ text: 'Home', href: '/' }];
    }
  };

  return (
    <>


      <AppLayout
        navigationOpen={isNavigationOpen}
        toolsHide={isToolsHidden}
        onNavigationChange={() => setIsNavigationOpen(!isNavigationOpen)}
        onToolsChange={() => setIsToolsHidden(!isToolsHidden)}
        navigation={<Navigation />}
        contentHeader={<CustomHomeHeader />}
        content={
          <>
            <BreadcrumbGroup items={getBreadcrumbItems()} />
            <Routes>
              <Route path="/home" element={<Home setContentHeader={setContentHeader} />} />
              <Route path="/checktext" element={<CheckText setContentHeader={setContentHeader} />} />
              <Route path="/signinup" element={<SignInUp setContentHeader={setContentHeader} />} />
              <Route path="/uploaddownload" element={<UploadAndDownmload setContentHeader={setContentHeader} />} />
              <Route path="/datatable" element={<DataTable setContentHeader={setContentHeader} />} />
              <Route path="/creates3" element={<CreateS3 setContentHeader={setContentHeader} />} />
              <Route path="/runs3" element={<RunS3 setContentHeader={setContentHeader} />} />
              <Route path="/events/contentdashboard" element={<Contentdashboard setContentHeader={setContentHeader} />} />

              <Route exact path="/" element={<Navigate to="/home" />} />
            </Routes>
          </>
        }
      />
    </>
  );
}
