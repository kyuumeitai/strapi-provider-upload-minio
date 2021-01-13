# strapi-provider-upload-minio

## Installation and basic usage

```npm install --save https://github.com/kyuumeitai/strapi-provider-upload-minio.git```

New strapi beta: the settings are in a js file, you need to put this file in your project:

./extensions/upload/config/settings.js

```
module.exports = {
  provider: "minio",
  name: "Minio Server Provider",
  providerOptions: {
    public: process.env.MINIO_PUBLICKEY || "Q3AM3UQ867SPQQA43P2F",
    private: process.env.MINIO_SECRET || "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    bucket: process.env.MINIO_BUCKET || "strapi",
    internalEndpoint: process.env.MINIO_INTERNAL_ENDPOINT || "http://minio:9000",
    externalEndpoint: process.env.MINIO_EXTERNAL_ENDPOINT || "https://minio.yourserver.io"
  }
};
```

See https://github.com/strapi/strapi/tree/master/packages/strapi-provider-upload-aws-s3

NOTE: bucket policy must be set to allow your file to be readable. (just set it to: prefix \*, readonly)

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
