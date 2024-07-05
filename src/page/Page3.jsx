import { Container, Header, Alert, Button } from "@cloudscape-design/components";
import { useEffect } from "react";

export default function Page3({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 3</Header>);
  });

  return (
    <>
      <div style={{ marginTop: '20px', display: 'grid', gap: '20%' }}>
        <Alert statusIconAriaLabel="Warning" type="warning">
          Changing the configuration might require stopping
          the instance.
        </Alert>

        <Alert
          statusIconAriaLabel="Info"
          header="Known issues/limitations"
        >
          Review the documentation to learn about potential
          compatibility issues with specific database
          versions.
        </Alert>
        <Alert
          dismissible
          statusIconAriaLabel="Success"
          type="success"
        >
          Your instance has been created successfully.
        </Alert>

        <Alert
          statusIconAriaLabel="Info"
          action={<Button>Enable versioning</Button>}
          header="Versioning is not enabled"
        >
          Versioning is not enabled for objects in bucket
          [IAM-user].
        </Alert>
      </div >

    </>

  );
}
