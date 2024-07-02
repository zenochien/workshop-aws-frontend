import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";

export default function Page1({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 1</Header>);
  });

  return <Container>Page 1</Container>;
}
