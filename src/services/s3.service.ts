import type { FormDataFile } from "../../deps.ts";
import { S3Bucket } from "../../deps.ts";
import config from "../config/config.ts";
import { v4 } from "../../deps.ts";
import { S3DataInfo } from "../models/s3/s3_data_info.model.ts";

const getBucket = (): S3Bucket => {
  return new S3Bucket({
    accessKeyID: config.s3.accessKeyID,
    secretKey: config.s3.secretKey,
    bucket: config.s3.bucketName,
    region: config.s3.region,
  });
};

const uploadImageObject = async (
  bucket: S3Bucket,
  fileName: string,
  data: Uint8Array,
  contentType: string,
) => {
  await bucket.putObject(fileName, data, {
    contentType: contentType,
  });
};

const uploadFileToS3 = (images: FormDataFile[]) => {
  const bucket = getBucket();
  return Promise.all(images.map(async (image: FormDataFile) => {
    const imageData = await Deno.readFile(image.filename!);
    const uuidFileName = `${image.name}/${v4.generate()}`;
    await uploadImageObject(bucket, uuidFileName, imageData, image.contentType);
    const response: S3DataInfo = {
      key: image.name,
      url:
        `https://${config.s3.bucketName}.s3.${config.s3.region}.amazonaws.com/${uuidFileName}`,
    };
    return response;
  }));
};

export default {
  uploadFileToS3,
};
