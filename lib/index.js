"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const { URL } = require("url");
const MinioSDK = require("minio");

module.exports = {
  init: (config) => {
    // configure Minio bucket connection
    const internalEndpoint = new URL(config.internalEndpoint);
    const externalEndpoint = new URL(config.externalEndpoint);
    const useSSL =
      internalEndpoint.protocol && internalEndpoint.protocol === "https:";

    const externalEndpointPort =
      parseInt(externalEndpoint.port) || (useSSL ? 443 : 80);
    const externalEndpointProtocol = externalEndpoint.protocol;

    const Minio = new MinioSDK.Client({
      endPoint: internalEndpoint.hostname,
      port: parseInt(internalEndpoint.port) || (useSSL ? 443 : 80),
      useSSL: useSSL,
      accessKey: config.public,
      secretKey: config.private,
    });

    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const filename =
            (file.path ? `${file.path}.` : "") + `${file.hash}${file.ext}`;
          const buffer = new Buffer(file.buffer, "binary");

          const metaData = {
            "Content-Type": file.mime,
          };

          Minio.putObject(
            config.bucket,
            filename,
            buffer,
            metaData,
            (err, tag) => {
              if (err) {
                reject(err);
              }

              file.url =
                `${externalEndpointProtocol}//${externalEndpoint.hostname}` +
                (externalEndpointPort &&
                Number(externalEndpointPort) !== 80 &&
                Number(externalEndpointPort) !== 443
                  ? ":" + externalEndpointPort
                  : "") +
                `/${config.bucket}/${filename}`;

              resolve();
            }
          );
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          const filename =
            (file.path ? `${file.path}.` : "") + `${file.hash}${file.ext}`;

          Minio.removeObject(config.bucket, filename, (err) => {
            if (err) {
              reject(err);
            }

            resolve();
          });
        });
      },
    };
  },
};
