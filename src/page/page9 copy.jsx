import React, { useEffect } from "react";
import { Spinner, Badge, Table, Box, SpaceBetween, Button, TextFilter, Header, ButtonDropdown, Pagination, CollectionPreferences, Modal, FormField, Input } from "@cloudscape-design/components";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export default function Page9({ setContentHeader }) {
    useEffect(() => {
        setContentHeader(<Header variant="h1">Data with Table</Header>);
    }, [setContentHeader]);

    const [filteringText, setFilteringText] = React.useState("");
    const [selectedItems, setSelectedItems] = React.useState([{ name: "Item 2" }]);
    const [items, setItems] = React.useState([
        { name: "Item 1", alt: "First", description: "This is the first item", type: "1A", size: "Small" },
        { name: "Item 2", alt: "Second", description: "This is the second item", type: "1B", size: "Large" },
        { name: "Item 3", alt: "Third", description: "-", type: "1A", size: "Large" },
        { name: "Item 4", alt: "Fourth", description: "This is the fourth item", type: "2A", size: "Small" },
        { name: "Item 5", alt: "-", description: "This is the fifth item with a longer description", type: "2A", size: "Large" },
        { name: "Item 6", alt: "Sixth", description: "This is the sixth item", type: "1A", size: "Small" }
    ]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newItem, setNewItem] = React.useState({ name: "", alt: "", description: "", type: "", status: "active" });
    const [isDetailsModalVisible, setIsDetailsModalVisible] = React.useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
    const [detailsItem, setDetailsItem] = React.useState(null);
    const [editItem, setEditItem] = React.useState(null);

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

    const handleEditModalSubmit = () => {
        const updatedItems = items.map(item =>
            item.name === editItem.name ? editItem : item
        );
        setItems(updatedItems);
        setIsEditModalVisible(false);
        setEditItem(null);
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setEditItem(null);
    };

    const handleDetailsModalClose = () => {
        setIsDetailsModalVisible(false);
        setDetailsItem(null);
    }

    const handActivate = () => {
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

    const handleDeactiave = () => {
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

    const handleViewDetails = () => {
        if (selectedItems.length === 1) {
            setDetailsItem(selectedItems[0]);
            setIsDetailsModalVisible(true);
        }
    };

    const handleEdit = () => {
        if (selectedItems.length === 1) {
            setEditItem(selectedItems[0]);
            setIsEditModalVisible(true);
        }
    };

    const handDelete = () => {
        const updatedItems = items.filter(item => !selectedItems.includes(item));
        setItems(updatedItems);
        setSelectedItems([]);
    };

    const downloadItem = (item) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${item.name}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        try {
            const upload = new Upload({
                parms: {
                    Bucket: 'Bucket_cua_ban',
                    Key: file.name,
                    Body: file,
                },
            });
            await upload.done();
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed');
        }

    };

    // Upload file to S3 
    const s3Client = new S3Client({
        region: 'YOUR_REGION',
        credentials: {
            accessKeyId: 'YOUR_ACCESS_KEY_ID',
            secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
        },
    });

    ////////////////////////////////////
    return (
        <div>
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
                                <Button variant="inline-link" ariaLabel={`Download ${item.name}`} onClick={() => downloadItem(item)}>
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
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    style={{ display: "none" }}
                                    id="upload-file-input"
                                />

                                <Button variant="primary" onClick={() => document.getElementById('upload-file-input').click()}>Upload File</Button>

                                <ButtonDropdown
                                    items={[
                                        { text: "Deactivate", id: "deactivate", disabled: false },
                                        { text: "Activate", id: "activate", disabled: false },
                                        { text: "View details", id: "view-details", disabled: false },
                                        { text: "Edit", id: "edit", disabled: false },
                                        { text: "Delete", id: "delete", disabled: false }
                                    ]}
                                    onItemClick={({ detail }) => {
                                        if (detail.id === "deactivate") {
                                            handleDeactiave();
                                        } else if (detail.id === "activate") {
                                            handActivate();
                                        } else if (detail.id === "view-details") {
                                            handleViewDetails();
                                        } else if (detail.id === "edit") {
                                            handleEdit();
                                        } else if (detail.id === "delete") {
                                            handDelete();
                                        }
                                    }
                                    }
                                >
                                    Actions
                                </ButtonDropdown>

                                <Button variant="primary" onClick={handleCreateResource}>Create resource</Button>
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

            <Modal
                onDismiss={handleEditModalClose}
                visible={isEditModalVisible}
                closeAriaLabel="Close modal"
                footer={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button onClick={handleEditModalClose}>Cancel</Button>
                        <Button variant="primary" onClick={handleEditModalSubmit}>Submit</Button>
                    </SpaceBetween>
                }
                header="Edit resource"
            >
                {editItem && (
                    <form>
                        <FormField label="Name">
                            <Input value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.detail.value })} />
                        </FormField>
                        <FormField label="Alt">
                            <Input value={editItem.alt} onChange={e => setEditItem({ ...editItem, alt: e.detail.value })} />
                        </FormField>
                        <FormField label="Description">
                            <Input value={editItem.description} onChange={e => setEditItem({ ...editItem, description: e.detail.value })} />
                        </FormField>
                        <FormField label="Type">
                            <Input value={editItem.type} onChange={e => setEditItem({ ...editItem, type: e.detail.value })} />
                        </FormField>
                    </form>
                )}
            </Modal>
            <Modal
                onDismiss={handleDetailsModalClose}
                visible={isDetailsModalVisible}
                closeAriaLabel="Close modal"
                footer={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button onClick={handleDetailsModalClose}>Close</Button>
                    </SpaceBetween>
                }
                header="Resource details"
            >
                {detailsItem && (
                    <div>
                        <p><strong>Name:</strong> {detailsItem.name}</p>
                        <p><strong>Alt:</strong> {detailsItem.alt}</p>
                        <p><strong>Description:</strong> {detailsItem.description}</p>
                        <p><strong>Type:</strong> {detailsItem.type}</p>
                        <p><strong>Status:</strong> {detailsItem.status}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
