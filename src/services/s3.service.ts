import { S3Bucket } from "../../deps.ts";
import config from "../config/config.ts"

export const getBucket = (): S3Bucket => {
    return new S3Bucket({
        accessKeyID: config.s3.accessKeyID,
        secretKey: config.s3.secretKey,
        bucket: config.s3.bucketName,
        region: config.s3.region,
    });
}

export const uploadImageObject = async (bucket: S3Bucket, fileName: string, data: Uint8Array, contentType: string) => {
    await bucket.putObject(fileName, data, {
        contentType: contentType,
    })
}

