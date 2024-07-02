import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";

export default function Page3({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 3</Header>);
  });

  return <Container>Page 3</Container>;
}
