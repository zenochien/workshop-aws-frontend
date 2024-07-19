import { Upload } from "@aws-sdk/lib-storage";


export default function s3() {
    const s3Client = new S3Client({
        region: 'YOUR_REGION',
        credentials: {
            accessKeyId: 'YOUR_ACCESS_KEY_ID',
            secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
        },
    });

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        try {
            const upload = new Upload({
                client: s3Client,
                params: {
                    Bucket: 'YOUR_BUCKET_NAME',
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

}
