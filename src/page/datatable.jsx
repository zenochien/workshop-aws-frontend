import React, { useEffect, useState } from "react";
import { Spinner, Badge, Table, Box, SpaceBetween, Button, TextFilter, Header, ButtonDropdown, Pagination, CollectionPreferences, Modal, FormField, Input, Alert, Link, ColumnLayout } from "@cloudscape-design/components";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export default function DataTable({ setContentHeader }) {
    useEffect(() => {
        setContentHeader(<Header variant="h1">Data with Table</Header>);
    }, [setContentHeader]);

    // Upload file to S3 
    const s3Client = new S3Client({
        region: 'YOUR_REGION',
        credentials: {
            accessKeyId: 'YOUR_ACCESS_KEY_ID',
            secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
        },
    });

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
    const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
    const [detailsItem, setDetailsItem] = React.useState(null);
    const [editItem, setEditItem] = React.useState(null);
    const [deleteInputText, setDeleteInputText] = useState('');
    const deleteConsentText = 'confirm';

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

    const handleDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
        setDeleteInputText('');
    };

    const handleDeleteConfirm = () => {
        const deleted = selectedItems;
        const updatedItems = items.filter(item => !deleted.includes(item));
        setItems(updatedItems);
        setSelectedItems([]);
        setIsDeleteModalVisible(false);
    };

    const inputMatchesConsentText = deleteInputText.toLowerCase() === deleteConsentText;

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


    const handleDelete = () => {
        setIsDeleteModalVisible(true);
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
                params: {
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
                                        { text: "Deactivate", id: "deactivate" },
                                        { text: "Activate", id: "activate" },
                                        { text: "Download", id: "download" },
                                        { text: "Edit", id: "edit" },
                                        { text: "Delete", id: "delete" },
                                        { text: "View Details", id: "details" }
                                    ]}
                                    onItemClick={({ detail }) => {
                                        switch (detail.id) {
                                            case "deactivate":
                                                handleDeactiave();
                                                break;
                                            case "activate":
                                                handActivate();
                                                break;
                                            case "download":
                                                selectedItems.forEach(downloadItem);
                                                break;
                                            case "edit":
                                                handleEdit();
                                                break;
                                            case "delete":
                                                handleDelete();
                                                break;
                                            case "details":
                                                handleViewDetails();
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                >
                                    More actions
                                </ButtonDropdown>
                                <Button variant="primary" onClick={handleCreateResource}>Create resource</Button>
                            </SpaceBetween>
                        }
                    >
                        <Header variant="h1">Data with Table</Header>
                    </Header>
                }
                pagination={
                    <Pagination
                        pagesCount={5}
                        currentPageIndex={0}
                        onPageChange={({ detail }) => console.log("Page changed to", detail.pageIndex)}
                    />
                }
                collectionPreferences={
                    <CollectionPreferences
                        pageSize={{ options: [5, 10, 20] }}
                        visibleContent={["name", "alt", "type", "description", "status", "actions"]}
                    />
                }
            />

            {/* Create Item Modal */}
            <Modal
                visible={isModalVisible}
                onDismiss={handleModalClose}
                header="Create Resource"
                footer={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleModalSubmit}>
                            Create
                        </Button>
                    </SpaceBetween>
                }
            >
                <ColumnLayout columns={2}>
                    <FormField label="Name">
                        <Input
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Alt">
                        <Input
                            value={newItem.alt}
                            onChange={e => setNewItem({ ...newItem, alt: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Description">
                        <Input
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Type">
                        <Input
                            value={newItem.type}
                            onChange={e => setNewItem({ ...newItem, type: e.detail.value })}
                        />
                    </FormField>
                </ColumnLayout>
            </Modal>

            {/* Edit Item Modal */}
            <Modal
                visible={isEditModalVisible}
                onDismiss={handleEditModalClose}
                header="Edit Resource"
                footer={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={handleEditModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleEditModalSubmit}>
                            Save
                        </Button>
                    </SpaceBetween>
                }
            >
                <ColumnLayout columns={2}>
                    <FormField label="Name">
                        <Input
                            value={editItem?.name || ""}
                            onChange={e => setEditItem({ ...editItem, name: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Alt">
                        <Input
                            value={editItem?.alt || ""}
                            onChange={e => setEditItem({ ...editItem, alt: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Description">
                        <Input
                            value={editItem?.description || ""}
                            onChange={e => setEditItem({ ...editItem, description: e.detail.value })}
                        />
                    </FormField>
                    <FormField label="Type">
                        <Input
                            value={editItem?.type || ""}
                            onChange={e => setEditItem({ ...editItem, type: e.detail.value })}
                        />
                    </FormField>
                </ColumnLayout>
            </Modal>

            {/* Details Modal */}
            <Modal
                visible={isDetailsModalVisible}
                onDismiss={handleDetailsModalClose}
                header="Details"
                footer={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={handleDetailsModalClose}>
                            Close
                        </Button>
                    </SpaceBetween>
                }
            >
                {detailsItem && (
                    <Box>
                        <FormField label="Name">
                            <Input value={detailsItem.name} readOnly />
                        </FormField>
                        <FormField label="Alt">
                            <Input value={detailsItem.alt} readOnly />
                        </FormField>
                        <FormField label="Description">
                            <Input value={detailsItem.description} readOnly />
                        </FormField>
                        <FormField label="Type">
                            <Input value={detailsItem.type} readOnly />
                        </FormField>
                        <FormField label="Status">
                            <Input value={detailsItem.status} readOnly />
                        </FormField>
                    </Box>
                )}
            </Modal>

            {/* Delete Modal */}
            <DeleteModal
                instances={selectedItems}
                visible={isDeleteModalVisible}
                onDiscard={handleDeleteModalClose}
                onDelete={handleDeleteConfirm}
            />
        </div>
    );
}

function DeleteModal({ instances, visible, onDiscard, onDelete }) {
    const deleteConsentText = 'confirm';

    const [deleteInputText, setDeleteInputText] = useState('');
    useEffect(() => {
        setDeleteInputText('');
    }, [visible]);

    const handleDeleteSubmit = event => {
        event.preventDefault();
        if (inputMatchesConsentText) {
            onDelete();
        }
    };

    const inputMatchesConsentText = deleteInputText.toLowerCase() === deleteConsentText;

    const isMultiple = instances.length > 1;
    return (
        <Modal
            visible={visible}
            onDismiss={onDiscard}
            header={isMultiple ? 'Delete instances' : 'Delete instance'}
            closeAriaLabel="Close dialog"
            footer={
                <Box float="right">
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button variant="link" onClick={onDiscard}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleDeleteSubmit} disabled={!inputMatchesConsentText}>
                            Delete
                        </Button>
                    </SpaceBetween>
                </Box>
            }
        >
            {instances.length > 0 && (
                <SpaceBetween size="m">
                    {isMultiple ? (
                        <Box variant="span">
                            Delete{' '}
                            <Box variant="span" fontWeight="bold">
                                {instances.length} instances
                            </Box>{' '}
                            permanently? This action cannot be undone.
                        </Box>
                    ) : (
                        <Box variant="span">
                            Delete instance{' '}
                            <Box variant="span" fontWeight="bold">
                                {instances[0].name}
                            </Box>{' '}
                            permanently? This action cannot be undone.
                        </Box>
                    )}

                    <Alert type="warning" statusIconAriaLabel="Warning">
                        Proceeding with this action will delete instance(s) with all content and can impact related resources.{' '}
                        <Link external={true} href="#">
                            Learn more
                        </Link>
                    </Alert>

                    <Box>To avoid accidental deletions we ask you to provide additional written consent.</Box>

                    <ColumnLayout columns={2}>
                        <form onSubmit={handleDeleteSubmit}>
                            <FormField label={`Type "${deleteConsentText}" to agree.`}>
                                <Input
                                    placeholder={deleteConsentText}
                                    onChange={event => setDeleteInputText(event.detail.value)}
                                    value={deleteInputText}
                                    ariaRequired={true}
                                />
                            </FormField>
                        </form>
                    </ColumnLayout>
                </SpaceBetween>
            )}
        </Modal>
    );
}
