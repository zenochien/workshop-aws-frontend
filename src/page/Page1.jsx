import { Container, Header } from "@cloudscape-design/components";
import { useEffect } from "react";
import { CodeView } from "@cloudscape-design/code-view";

export default function Page1({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 1</Header>);
  });

  return (
    <>
      <Container fontSize="heading-l">Page 1</Container>

      <CodeView
        content='const hello: string = "world";
console.log(hello);'
      />
    </>
  );
}
