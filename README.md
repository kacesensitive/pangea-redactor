
# Pangea Redactor

A frontend for interacting with the [Pangea](https://pangea.cloud/) redaction API. This frontend allows users to input data and scrub it clean of sensitive information such as SSNs, phone numbers, addresses, religious affiliation, IP addresses, and a ton more. 

This project utilizes React, Next.js, [shadcn/ui], Tailwind CSS, (https://ui.shadcn.com/), and of course the Pangea API. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You will need Node.js (LTS version recommended) installed on your system. You can download it from the [official site](https://nodejs.org/).
- **Yarn, npm, or pnmp**: A package manager. This project uses Yarn as a package manager. You can install it following the instructions on the [Yarn official site](https://yarnpkg.com/getting-started/install).
- **Pangea API Account**: Sign up for a Pangea account to access the API credentials necessary for running the redactor. You can register [here](https://pangea.cloud).


## Usage

 
```bash
yarn install
yarn dev
```
(or npm, pnmp, etc)
  

## Usage

You'll need to add your API credentials to the app to run the redactor. 

 1. Sign up for a Pangea account [here](https://pangea.cloud)
 2. Create a Redact [API Token](https://console.pangea.cloud/service/redact)
 3. Set your rules for the redactor to follow in the [Rulesets section](https://console.pangea.cloud/service/redact/rulesets)
 4. Click the settings cog in the top right of the app and paste in your API token, click save, and you're set!

  

## License
Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).