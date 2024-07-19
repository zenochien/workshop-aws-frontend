import React, { useEffect, useState } from "react";
import { Container, Header, Alert, Button, FileUpload, FormField } from "@cloudscape-design/components";

export default function UploadAndDownmload({ setContentHeader }) {
    useEffect(() => {
        setContentHeader(<Header variant="h1">File Upload</Header>);
    }, [setContentHeader]);

    const [alert, setAlert] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file for download

    const handleFileChange = ({ detail }) => {
        const selectedFiles = detail.value;
        const maxFileSize = 3 * 1024 * 1024; // 3 MB
        const fileWarnings = [];

        selectedFiles.forEach(file => {
            if (file.size > maxFileSize) {
                fileWarnings.push(`${file.name} exceeds 3MB and cannot be uploaded`);
            }
        });

        if (fileWarnings.length > 0) {
            setAlert({
                type: 'warning',
                header: 'File Size Warning',
                content: fileWarnings.join(', '),
                statusIconAriaLabel: 'Warning'
            });
            setFiles([]);
        } else {
            setFiles(selectedFiles);
            setSelectedFile(selectedFiles[0]); // Set the first selected file for download
        }
    };

    const uploadFiles = async () => {
        if (files.length === 0) {
            setAlert({
                type: 'warning',
                header: 'No Files Selected',
                content: 'Please select files to upload.',
                statusIconAriaLabel: 'Warning'
            });
            return;
        }

        try {
            // Mock API call
            const response = await mockUploadApi(files);
            if (response.success) {
                setAlert({
                    type: 'success',
                    header: 'Upload Successful',
                    content: 'Your files were uploaded successfully.',
                    statusIconAriaLabel: 'Success'
                });
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setAlert({
                type: 'error',
                header: 'Upload Failed',
                content: error.message,
                statusIconAriaLabel: 'Error'
            });
        }
    };

    const mockUploadApi = (files) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    };

    const downloadFile = () => {
        if (!selectedFile) {
            setAlert({
                type: 'warning',
                header: 'No File Selected',
                content: 'Please select a file to download.',
                statusIconAriaLabel: 'Warning'
            });
            return;
        }

        const fileUrl = URL.createObjectURL(selectedFile);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = selectedFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileUrl);
    };

    return (
        <Container>
            {alert && (
                <Alert
                    type={alert.type}
                    header={alert.header}
                    statusIconAriaLabel={alert.statusIconAriaLabel}
                    dismissible
                    onDismiss={() => setAlert(null)}
                >
                    {alert.content}
                </Alert>
            )}
            <div style={{ marginTop: '20px', display: 'grid', gap: '20%' }}>
                <FormField
                    label="File Upload"
                    description="Upload files. Max size per file: 3MB."
                >
                    <FileUpload
                        onChange={handleFileChange}
                        value={files}
                        ariaRequired
                        fileWarnings={files.length > 0 && files[0].size > 3 * 1024 * 1024 ? ["This is a warning message related to this file"] : []} // Warning max size 30 MB
                        i18nStrings={{
                            uploadButtonText: e => e ? "Choose files" : "Choose file",
                            dropzoneText: e => e ? "Drop files to upload" : "Drop file to upload",
                            removeFileAriaLabel: e => `Remove file ${e + 1}`,
                            limitShowFewer: "Show fewer files",
                            limitShowMore: "Show more files",
                            errorIconAriaLabel: "Error"
                        }}
                        multiple
                        showFileLastModified
                        showFileSize
                        showFileThumbnail
                        tokenLimit={3}
                        constraintText="Hint text for file requirements"
                    />
                </FormField>
                <Button onClick={uploadFiles}>Upload Files</Button>
                <Button onClick={downloadFile}>Download File</Button>
            </div>
        </Container>
    );
}
