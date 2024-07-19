import React, { useEffect } from "react";
import { Container, Header, Table, Box, Button, Link, SpaceBetween } from "@cloudscape-design/components";
import ContentLayout from "@cloudscape-design/components/content-layout";

export default function Page6({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 6</Header>);
  }, [setContentHeader]);

  return (
    <>
      <Container>
        <p>This is Page 6 content.</p>
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

        <Table
          // renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          //   `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
          // }
          columnDefinitions={[
            {
              id: "variable",
              header: "Variable name",
              cell: (item) => <Link href="#">{item.name || "-"}</Link>,
              sortingField: "name",
              isRowHeader: true,
            },
            {
              id: "alt",
              header: "Text value",
              cell: (item) => item.alt || "-",
              sortingField: "alt",
            },
            {
              id: "description",
              header: "Description",
              cell: (item) => item.description || "-",
            },
          ]}
          contentDensity="compact"
          items={[
            {
              name: "Item 1",
              alt: "First",
              description: "This is the first item",
              type: "1A",
              size: "Small",
            },
            {
              name: "Item 2",
              alt: "Second",
              description: "This is the second item",
              type: "1B",
              size: "Large",
            },
          ]}
          loadingText="Loading resources"
          sortingDisabled
          wrapLines
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No resources</b>
                <Button>Create resource</Button>
              </SpaceBetween>
            </Box>
          }
        />


        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
          <Button
            ariaExpanded
            href="#/page1/page5"
            iconName="arrow-left"
            wrapText={false}
            style={{ marginRight: '30px' }}
          >
            Previous
          </Button>
          <Button
            ariaExpanded
            href="#/page2"
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
