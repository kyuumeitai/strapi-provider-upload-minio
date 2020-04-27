# strapi-provider-upload-minio

## Installation and basic usage

```npm install --save https://github.com/kyuumeitai/strapi-provider-upload-minio.git```

New strapi beta: the settings are in a json file, you need to put this file in your project:

./extensions/upload/config/settings.json

```
{
  "provider": "minio",
  "name": "Minio Server Provider",
  "providerOptions": {
    "public": "Q3AM3UQ867SPQQA43P2F",
    "private": "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
    "bucket": "strapi",
    "internalEndpoint": "http://minio:9000",
    "externalEndpoint": "https://minio.yourserver.io"
  }
}

```

See https://github.com/strapi/strapi/tree/master/packages/strapi-provider-upload-aws-s3

NOTE: bucket policy must be set to allow your file to be readable. (just set it to: prefix \*, readonly)

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
