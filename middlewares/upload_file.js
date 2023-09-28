// const config = require("../config");
// const fs = require("fs");

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { Upload } = require("@aws-sdk/lib-storage");

// const s3Client = new S3Client({
//   endpoint: "https://s3.amazonaws.com",
//   credentials: {
//     accessKeyId: config.get("aws.s3_access_key"),
//     secretAccessKey: config.get("aws.s3_secret_key"),
//   },
//   region: config.get("aws.s3_region"),
// });

// module.exports = {
//   uploadPicture: async (req, res, next) => {
//     try {
//       const upload = new Upload({
//         client: s3Client,
//         params: {
//           Bucket: config.get("aws.s3_bucket"),
//           Key: `${req.file.filename}`,
//           ContentType: req.file.mimetype,
//           ACL: "public-read",
//           Body: fs.readFileSync(req.file.path),
//         },
//       });
//       const response = await upload.done();
//       req.profile_image_location = response.Location;
//       next();
//     } catch (err) {
//       res.internalError(err);
//     }
//   },
// };
