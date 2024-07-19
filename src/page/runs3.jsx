import React, { useState, useEffect } from 'react';
import {
    AppLayout,
    Button,
    Container,
    Header,
    Form,
    FormField,
    SpaceBetween,
    Alert,
    S3ResourceSelector
} from '@cloudscape-design/components';
import { getItems, requestAsyncAttribute } from './common/s3-resource-selector/mock-request';
import AWS from 'aws-sdk';
import { i18nStrings } from './common/s3-resource-selector/i18n-string';
import { ErrorAlert } from './common/common';

AWS.config.update({
    region: "us-west-1", // Nếu bạn đang ở đâu thì hãy lấy region của mình
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // REACT_APP_AWS_ACCESS_KEY_ID do bạn cung cấp access key, đừng copy bừa nhá :))
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY_ID,
});

const i18nStringsWriteMode = {
    ...i18nStrings,
    modalTitle: 'Choose destination for simulations',
    inContextInputPlaceholder: 's3://bucket/prefix',
};

const S3ResourceSelectorContainer = () => {
    const [serverSideError, setServerSideError] = useState(null);
    const [resource, setResource] = useState({ uri: '' });
    const [errorText, setErrorText] = useState(null);
    const [viewHref, setViewHref] = useState('');

    const fetch = async (resourceType, bucket, path) => {
        setServerSideError(null);
        try {
            const result = await getItems(resourceType, bucket, path);
            if (resourceType === 'buckets') {
                await Promise.all(result.map(bucket => requestAsyncAttribute(bucket, 'Region')));
            }
            return result;
        } catch (error) {
            setServerSideError(error);
            throw error;
        }
    };

    const onChange = ({ detail }) => {
        const { resource, errorText } = detail;
        setErrorText(errorText);
        setResource(resource);
        setViewHref(resource.uri !== '' && !errorText ? 'https://amazons3.demo.s3-resource-selector/test/1' : '');
    };

    const s3ResourceSelectorProps = {
        alert: serverSideError && <ErrorAlert error={serverSideError} />,
        resource,
        viewHref,
        selectableItemsTypes: ['buckets', 'objects'],
        objectsIsItemDisabled: object => !object.IsFolder,
        bucketsVisibleColumns: ['Name', 'Region', 'CreationDate'],
        i18nStrings: i18nStringsWriteMode,
        fetchBuckets: () => fetch('buckets'),
        fetchObjects: (bucket, path) => fetch('objects', bucket, path),
        fetchVersions: (bucket, path) => fetch('versions', bucket, path),
        onChange,
    };

    return (
        <FormField
            label="Run simulations to S3"
            description="Enter a destination in Amazon S3 where your simulation will be stored."
            constraintText="Use s3://bucket/prefix format."
            errorText={errorText}
            stretch={true}
            i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
            <S3ResourceSelector {...s3ResourceSelectorProps} />
        </FormField>
    );
};

const CreateSimulationContent = ({ onSuccess }) => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setIsSuccess(true);
        onSuccess && onSuccess();
    };

    return (
        <AppLayout
            contentType="form"
            content={
                <>
                    {isSuccess && (
                        <div style={{ padding: '10px' }}>
                            <Alert
                                dismissible
                                statusIconAriaLabel="Success"
                                type="success"
                            >
                                Your instance has been created successfully.
                            </Alert>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="link">Cancel</Button>
                                    <Button variant="primary" type="submit">Run</Button>
                                </SpaceBetween>
                            }
                        >
                            <Container header={<Header variant="h2">Simulations</Header>}>
                                <S3ResourceSelectorContainer />
                            </Container>
                        </Form>
                    </form>
                </>
            }
            toolsHide={true}
        />
    );
};

const RunS3 = ({ setContentHeader }) => {
    useEffect(() => {
        setContentHeader(<Header variant="h1">Run S3</Header>);
    }, [setContentHeader]);

    return <CreateSimulationContent onSuccess={() => console.log('Simulation created!')} />;
};

export default RunS3;
