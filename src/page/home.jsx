import React from "react";
import { Box, Header, SpaceBetween, ColumnLayout, Icon, Grid, Container, Link } from "@cloudscape-design/components";

const ExternalLinkItem = ({ href, text }) => (
  <li>
    <Link href={href} external>
      {text}
    </Link>
  </li>
);

export default function Home({ setContentHeader }) {
  return (
    <Box padding={{ top: 'xxxl', horizontal: 's' }}>
      <Grid
        gridDefinition={[
          { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
          { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
        ]}
      >
        <SpaceBetween>
          <div>
            <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 's' }} >
              Benefits and features
            </Box>
            <Container>
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="h3" padding={{ top: 'n' }}>
                    CloudFront console
                  </Box>
                  <Box variant="p">
                    Create, monitor, and manage your content delivery with a few simple clicks on the CloudFront
                    console.
                  </Box>
                </div>
                <div>
                  <Box variant="h3" padding={{ top: 'n' }}>
                    Static and dynamic content
                  </Box>
                  <Box variant="p">
                    Deliver both static content and dynamic content that you can personalize for individual users.
                  </Box>
                </div>
                <div>
                  <Box variant="h3" padding={{ top: 'n' }}>
                    Reporting and analytics
                  </Box>
                  <Box variant="p">
                    Get detailed cache statistics reports, monitor your CloudFront usage in near real-time, track your
                    most popular objects, and set alarms on operational metrics.
                  </Box>
                </div>
                <div>
                  <Box variant="h3" padding={{ top: 'n' }}>
                    Tools and libraries
                  </Box>
                  <Box variant="p">
                    Take advantage of a variety of tools and libraries for managing your CloudFront distribution, like
                    the CloudFront API, the AWS Command Line Interface (AWS CLI), and the AWS SDKs.
                  </Box>
                </div>
              </ColumnLayout>
            </Container>
          </div>
        </SpaceBetween>
        <div className="custom-home__sidebar">
          <SpaceBetween size="xxl">
            <Container
              header={
                <Header variant="h2">
                  Getting started{' '}
                  <span role="img" aria-label="Icon external Link">
                    <Icon name="external" size="inherit" />
                  </span>
                </Header>
              }
            >
              <ul aria-label="Getting started documentation" className="custom-list-separator">
                <li>
                  <ExternalLinkItem
                    href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
                    text="What is Amazon CloudFront?"
                  />
                </li>
                <li>
                  <ExternalLinkItem
                    href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html"
                    text="Getting started with CloudFront"
                  />
                </li>
                <li>
                  <ExternalLinkItem
                    href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html"
                    text="Working with CloudFront distributions"
                  />
                </li>
              </ul>
            </Container>
            <Container
              header={
                <Header variant="h2">
                  More resources{' '}
                  <span role="img" aria-label="Icon external Link">
                    <Icon name="external" size="inherit" />
                  </span>
                </Header>
              }
            >
              <ul aria-label="Additional resource links" className="custom-list-separator">
                <li>
                  <ExternalLinkItem href="https://aws.amazon.com/documentation/cloudfront/" text="Documentation" />
                </li>
                <li>
                  <ExternalLinkItem href="#" text="FAQ" />
                </li>
                <li>
                  <ExternalLinkItem href="#" text="CloudFront forum" />
                </li>
                <li>
                  <ExternalLinkItem href="#" text="Contact us" />
                </li>
              </ul>
            </Container>
          </SpaceBetween>
        </div>
      </Grid>
    </Box>


  );
}
