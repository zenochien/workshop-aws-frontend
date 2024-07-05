import React, { useEffect } from "react";
import { ColumnLayout, Header } from "@cloudscape-design/components";
import Tabs from "@cloudscape-design/components/tabs";
import { CodeView } from "@cloudscape-design/code-view";
import CopyToClipboard from "@cloudscape-design/components/copy-to-clipboard";

export default function Page2({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Hello from Page 2</Header>);
  }, [setContentHeader]);

  const codeSnippet = `const hello: string = "world";\nconsole.log(hello);`;

  return (
    <>
      <Tabs
        tabs={[
          {
            label: "First tab label",
            id: "first",
            content: "First tab content area"
          },
          {
            label: "Second tab label",
            id: "second",
            content: (
              <>
                <div>
                  SVG with background color, padding, and border radius styles
                </div>
                <img
                  alt="logo"
                  src="./image/1.png"
                  style={{
                    width: "90%"
                  }}
                />
              </>
            )
          },
          {
            label: "Third tab label",
            id: "third",
            content: (
              <>

                <CodeView
                  content={codeSnippet}
                  lineNumbers
                  actions={
                    <CopyToClipboard
                      copyButtonAriaLabel="Copy code"
                      copyErrorText="Code failed to copy"
                      copySuccessText="Code copied"
                      textToCopy={codeSnippet}
                    />
                  }
                />
              </>

            )
          }
        ]}
        variant="container"
      />
    </>
  );
}
