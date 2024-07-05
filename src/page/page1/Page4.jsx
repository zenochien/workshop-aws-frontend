import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";
import Button from "@cloudscape-design/components/button";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Box from "@cloudscape-design/components/box";
import "@cloudscape-design/global-styles/index.css";


export default function Page4({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 4</Header>);
  }, [setContentHeader]);

  return (
    <>
      <Container>
        <p>This is Page 4 content.</p>
      </Container>

      <ContentLayout
        defaultPadding
        disableOverlap
        headerVariant="divider"
      >
        <Box variant="h2" padding={{ top: "m" }}>
          Content heading
        </Box>

        <Box variant="p">
          Chào bạn, hôm nay bạn như thế nào khi đi chơi?
        </Box>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
          <Button
            ariaExpanded
            href="#/page1"
            iconName="arrow-left"
            wrapText={false}
            style={{ marginRight: '30px' }}
          >
            Previous
          </Button>
          <Button
            ariaExpanded
            href="#/page1/page5"
            iconAlign="right"
            iconName="arrow-right"
            wrapText={false}
          >
            Next
          </Button>
        </div>
      </ContentLayout>

    </>

  );
}
