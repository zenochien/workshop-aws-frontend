import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";

export default function Page2({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 4</Header>);
  }, [setContentHeader]);

  return <Container>Page 5</Container>;
}
