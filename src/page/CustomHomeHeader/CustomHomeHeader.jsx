import * as React from "react";
import Container from "@cloudscape-design/components/container";
import { SpaceBetween, Box, Grid, FormField } from "@cloudscape-design/components";

export default function CustomHomeHeader() {
    return (
        <>
            <div className="custom-home__header" style={{ backgroundColor: "aquamarine", marginLeft: "-180px", marginRight: "-180px" }}>
                <Box padding={{ vertical: 'xxxl', horizontal: 's' }}>
                    <Grid
                        gridDefinition={[
                            { offset: { l: 2, xxs: 1 }, colspan: { l: 8, xxs: 10 } },
                            { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
                            { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
                        ]}
                    >
                        <Box fontWeight="light" padding={{ top: 'xs' }}>
                            {/* <span className="custom-home__category">Networking &amp; Content Delivery</span> */}
                        </Box>
                        <div className="custom-home__header-title">
                            <Box variant="h1" fontWeight="heavy" padding="n" fontSize="display-l" color="inherit">
                                Build Project
                            </Box>
                            <Box fontWeight="light" padding={{ bottom: 's' }} fontSize="display-l" color="inherit">
                                Getting Start CloudScape
                            </Box>
                            <Box variant="p" fontWeight="light">
                                <span className="custom-home__header-sub-title">
                                    Cloudscape offers user interface guidelines, front-end components, design resources, and development tools for building intuitive, engaging, and inclusive user experiences at scale.
                                </span>
                            </Box>
                        </div>
                        <div className="custom-home__header-cta">
                            <Container>
                                <SpaceBetween size="xl">
                                    <Box variant="h2" padding="n">
                                        Workshop AWS Font-End
                                    </Box>
                                    <FormField stretch={true} label="An open source design system for the cloud">
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </div>
                    </Grid>
                </Box>
            </div>
        </>

    );
}

