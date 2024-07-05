import { Container, Header, Link } from "@cloudscape-design/components";
import { useEffect } from "react";

export default function Page({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(
      <Header variant="h1">
        Hello from Page 2
      </Header>
    );
  }, [setContentHeader]);

  return <Container>Page 2 content</Container>;
}
