import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Upload = async (file) => {
    const s3Client = new S3Client();

    const param = {
        Bucket: 'sevensquare-uploads',
        Key: `uploads/${file.originalname}`,
        Body
    }

    return s3Client.send(new PutObjectCommand(param))
}

export default s3Upload;