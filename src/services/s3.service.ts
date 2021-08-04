import { v4 } from "uuid/mod.ts";
import { FormDataFile } from "oak/mod.ts";
import { S3Bucket } from "s3/mod.ts";
import config from "src/config/config.ts";
import { S3DataInfo } from "src/models/s3/s3DataInfo.model.ts";

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
