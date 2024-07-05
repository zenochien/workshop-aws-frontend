import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";
import Button from "@cloudscape-design/components/button";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Box from "@cloudscape-design/components/box";
import "@cloudscape-design/global-styles/index.css";
import ColumnLayout from "@cloudscape-design/components/column-layout";


export default function Page4({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 5</Header>);
  }, [setContentHeader]);

  return (
    <>
      <Container>
        <p>This is Page 5 content.</p>
      </Container>

      <ContentLayout
        defaultPadding
        disableOverlap
        headerVariant="divider"
      >
        <div>
          <Box variant="h2" padding={{ top: "m" }}>
            Content heading
          </Box>

          <Box variant="p">
            Chào bạn, hôm nay bạn như thế nào khi đi chơi?
          </Box>
        </div>

        <div style={{ display: 'flex', gap: '10%' }}>
          <ColumnLayout columns={3} variant="text-grid">
            <div>
              Use this variant when you have text content inside
              columns.
            </div>
            <div>
              Use this variant when you have text content inside
              columns.
            </div>
            <div>
              Use this variant when you have text content inside
              columns.
            </div>
          </ColumnLayout>
        </div>


        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
          <Button
            ariaExpanded
            href="#/page1/page4"
            iconName="arrow-left"
            wrapText={false}
            style={{ marginRight: '30px' }}
          >
            Previous
          </Button>
          <Button
            ariaExpanded
            href="#/page1/page6"
            iconAlign="right"
            iconName="arrow-right"
            wrapText={false}
          >
            Next
          </Button>
        </div>
      </ContentLayout >

    </>

  );
}
