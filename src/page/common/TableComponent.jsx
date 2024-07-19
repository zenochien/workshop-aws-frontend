import * as React from "react";
import {
  Spinner,
  Badge,
  Table,
  Box,
  SpaceBetween,
  Button,
  TextFilter,
  Header,
  ButtonDropdown,
  Pagination,
  CollectionPreferences,
  Modal,
  FormField,
  Input,
  Flashbar,
} from "@cloudscape-design/components";
import S3ResourceSelector from "@cloudscape-design/components/s3-resource-selector";

export default function Page11() {
  const [filteringText, setFilteringText] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [newItem, setNewItem] = React.useState({ name: "", alt: "", description: "", type: "", status: "active" });
  const [flashbarItems, setFlashbarItems] = React.useState([]);
  const [isS3SelectorVisible, setIsS3SelectorVisible] = React.useState(false);

  const [resource, setResource] = React.useState({
    uri: ""
  });

  const filteredItems = React.useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filteringText.toLowerCase())
    );
  }, [items, filteringText]);

  const handleCreateResource = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = () => {
    setItems([...items, newItem]);
    setIsModalVisible(false);
    setNewItem({ name: "", alt: "", description: "", type: "active" });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setNewItem({ name: "", alt: "", description: "", type: "active" });
  };

  const handleActivate = () => {
    const updateItems = items.map(item =>
      selectedItems.includes(item) ? { ...item, loading: true } : item
    );
    setItems(updateItems);
    setTimeout(() => {
      const finalUpdatedItems = items.map(item =>
        selectedItems.includes(item) ? { ...item, status: "active", loading: false } : item
      );
      setItems(finalUpdatedItems);
    }, 1000);
  };

  const handleDeactivate = () => {
    const updateItems = items.map(item =>
      selectedItems.includes(item) ? { ...item, loading: true } : item
    );
    setItems(updateItems);
    setTimeout(() => {
      const finalUpdatedItems = items.map(item =>
        selectedItems.includes(item) ? { ...item, status: "inactive", loading: false } : item
      );
      setItems(finalUpdatedItems);
    }, 1000);
  };

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const params = {
        Bucket: 'your-bucket-name',
        Key: file.name,
        Body: file
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Upload error', err);
          setFlashbarItems([{ type: 'error', message: `Upload error: ${err.message}` }]);
        } else {
          console.log('Upload success', data);
          setFlashbarItems([{ type: 'success', message: 'Upload success' }]);
          // Optionally update items state to reflect the newly uploaded file
        }
      });
    }
  };

  return (
    <div>
      <Flashbar items={flashbarItems} />
      <Table
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"} selected`,
          itemSelectionLabel: ({ selectedItems }, item) => item.name
        }}
        columnDefinitions={[
          { id: "variable", header: "Variable name", cell: item => item.name, sortingField: "name", isRowHeader: true },
          { id: "value", header: "Text value", cell: item => item.alt, sortingField: "alt" },
          { id: "type", header: "Type", cell: item => item.type },
          { id: "description", header: "Description", cell: item => item.description },
          {
            id: "status", header: "Status", cell: item =>
              item.loading ? (
                <Spinner size="small" />
              ) : (
                <Badge color={item.status === "active" ? "green" : "red"}>
                  {item.status === "active" ? "Active" : "Inactive"}
                </Badge>
              )
          },
          {
            id: "actions",
            header: "Actions",
            cell: item => (
              <SpaceBetween>
                <Button variant="inline-link" ariaLabel={`Download ${item.name}`}>
                  Download
                </Button>
              </SpaceBetween>
            ),
            minWidth: 170
          }
        ]}
        columnDisplay={[
          { id: "variable", visible: true },
          { id: "value", visible: true },
          { id: "type", visible: true },
          { id: "description", visible: true },
          { id: "status", visible: true },
          { id: "actions", visible: true }
        ]}
        enableKeyboardNavigation
        items={filteredItems}
        loadingText="Loading resources"
        selectionType="multi"
        stickyColumns={{ first: 0, last: 1 }}
        trackBy="name"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
              <Button onClick={handleCreateResource}>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find resources"
            filteringText={filteringText}
            onChange={({ detail }) => setFilteringText(detail.filteringText)}
          />
        }
        header={
          <Header
            counter={
              selectedItems.length ? "(" + selectedItems.length + "/10)" : "(10)"
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <ButtonDropdown
                  items={[
                    { text: "Deactivate", id: "deactivate", disabled: false },
                    { text: "Activate", id: "activate", disabled: false },
                    { text: "Details", id: "details", disabled: false },
                    { text: "Edit", id: "edit", disabled: false },
                    { text: "Delete", id: "delete", disabled: false }
                  ]}
                  onItemClick={({ detail }) => {
                    if (detail.id === "activate") {
                      handleActivate();
                    } else if (detail.id === "deactivate") {
                      handleDeactivate();
                    } else if (detail.id === "details") {
                      // Handle view details
                    } else if (detail.id === "edit") {
                      // Handle edit
                    } else if (detail.id === "delete") {
                      // Handle delete
                    }
                  }}
                >
                  Actions
                </ButtonDropdown>
                <Button onClick={handleCreateResource}>Create resource</Button>
                <Button onClick={() => document.getElementById('file-upload-input').click()}>Upload File</Button>
                <Button onClick={() => setIsS3SelectorVisible(true)}>Browse S3</Button>
                <input id="file-upload-input" type="file" style={{ display: 'none' }} onChange={handleUploadFile} />
              </SpaceBetween>
            }
          >
            Table with in-context actions
          </Header>
        }
        pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{
              pageSize: 10,
              contentDisplay: [
                { id: "variable", visible: true },
                { id: "value", visible: true },
                { id: "type", visible: true },
                { id: "description", visible: true }
              ]
            }}
            pageSizePreference={{
              title: "Page size",
              options: [
                { value: 10, label: "10 resources" },
                { value: 20, label: "20 resources" }
              ]
            }}
            wrapLinesPreference={{}}
            stripedRowsPreference={{}}
            contentDensityPreference={{}}
            contentDisplayPreference={{
              options: [
                { id: "variable", label: "Variable name", alwaysVisible: true },
                { id: "value", label: "Text value" },
                { id: "type", label: "Type" },
                { id: "description", label: "Description" }
              ]
            }}
            stickyColumnsPreference={{
              firstColumns: {
                title: "Stick first column(s)",
                description: "Keep the first column(s) visible while horizontally scrolling the table content.",
                options: [
                  { label: "None", value: 0 },
                  { label: "First column", value: 1 },
                  { label: "First two columns", value: 2 }
                ]
              },
              lastColumns: {
                title: "Stick last column",
                description: "Keep the last column visible while horizontally scrolling the table content.",
                options: [
                  { label: "None", value: 0 },
                  { label: "Last column", value: 1 }
                ]
              }
            }}
          />
        }
      />
      <Modal
        onDismiss={handleModalClose}
        visible={isModalVisible}
        closeAriaLabel="Close modal"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button variant="primary" onClick={handleModalSubmit}>Submit</Button>
          </SpaceBetween>
        }
        header="Create a new resource"
      >
        <form>
          <FormField label="Name">
            <Input value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.detail.value })} />
          </FormField>
          <FormField label="Alt">
            <Input value={newItem.alt} onChange={e => setNewItem({ ...newItem, alt: e.detail.value })} />
          </FormField>
          <FormField label="Description">
            <Input value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.detail.value })} />
          </FormField>
          <FormField label="Type">
            <Input value={newItem.type} onChange={e => setNewItem({ ...newItem, type: e.detail.value })} />
          </FormField>
        </form>
      </Modal>
      {isS3SelectorVisible && (
        <Modal
          onDismiss={() => setIsS3SelectorVisible(false)}
          visible={isS3SelectorVisible}
          closeAriaLabel="Close modal"
          footer={
            <SpaceBetween direction="horizontal" size="xs">
              <Button onClick={() => setIsS3SelectorVisible(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsS3SelectorVisible(false)}>Select</Button>
            </SpaceBetween>
          }
          header="Select an S3 resource"
        >
          <Box margin={{ vertical: "m" }}>
            <FormField label="Select an S3 resource">
              <S3ResourceSelector
                onChange={({ detail }) => setResource(detail.resource)}
                resource={resource}
                objectsIsItemDisabled={item => item.IsFolder}
                fetchBuckets={() =>
                  Promise.resolve([
                    {
                      Name: "bucket-fugiat",
                      CreationDate:
                        "December 27, 2019, 22:16:38 (UTC+01:00)",
                      Region: "Middle East (Bahrain) me-south-1"
                    },
                    {
                      Name: "bucket-ut",
                      CreationDate:
                        "July 06, 2019, 12:41:19 (UTC+02:00)",
                      Region: "US East (N. Virginia) us-east-1"
                    },
                    {
                      Name: "bucket-veniam",
                      CreationDate:
                        "June 13, 2019, 18:32:38 (UTC+02:00)",
                      Region: "US East (N. Virginia) us-east-1"
                    }
                  ])
                }
                fetchObjects={() =>
                  Promise.resolve([
                    { Key: "archive-2019", IsFolder: true },
                    { Key: "archive-2020", IsFolder: true },
                    {
                      Key: "black-hole-5ns.zip",
                      LastModified:
                        "August 03, 2019, 19:26:58 (UTC+02:00)",
                      Size: 66477663816,
                      IsFolder: false
                    },
                    {
                      Key: "electron-8h.zip",
                      LastModified:
                        "November 06, 2019, 14:00:40 (UTC+01:00)",
                      Size: 96909820974,
                      IsFolder: false
                    },
                    {
                      Key: "galaxy-11s.zip",
                      LastModified:
                        "September 01, 2019, 14:55:50 (UTC+02:00)",
                      Size: 71745423926,
                      IsFolder: false
                    }
                  ])
                }
                fetchVersions={() =>
                  Promise.resolve([
                    {
                      VersionId:
                        "f2ef887e-af4c-4003-ad16-153d1419c024",
                      LastModified:
                        "April 30, 2019, 05:21:44 (UTC+02:00)",
                      Size: 29013625564809
                    },
                    {
                      VersionId:
                        "82e5f938-fe82-4977-a39a-44a549e630c1",
                      LastModified:
                        "April 10, 2019, 21:21:10 (UTC+02:00)",
                      Size: 25016305995260
                    },
                    {
                      VersionId:
                        "88327c30-24d0-42d2-a72d-051d9d44a106",
                      LastModified:
                        "January 27, 2020, 14:39:58 (UTC+01:00)",
                      Size: 33295634938053
                    }
                  ])
                }
                selectableItemsTypes={["objects", "versions"]}
              />
            </FormField>
          </Box>
        </Modal>
      )}
    </div>
  );
}
