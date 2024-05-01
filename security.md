# Generate certificate with OpenSSL

To create a certificate using OpenSSL, you can follow the steps below.

### 1. Creation of the Certification Authority (CA)

```ps
openssl req -x509 -sha256 -days 356 -nodes -newkey rsa:2048 -keyout masterCA.key -out masterCA.crt

```

### 2. Creating a Private Key

```ps
openssl genrsa -out master.key 2048

```

### 3. Creating a Certificate Signing Request (CSR)

```ps
openssl req -new -key master.key -out master.csr

```

### 4. Signature of the Certificate by CA

```ps
openssl x509 -req -in master.csr -CA masterCA.crt -CAkey masterCA.key -CAcreateserial -out certificate.crt -days 365 -sha256

```

### 5. To convert a certificate from .crt to .cer, follow the steps below

1. Open the Certificate Properties:

   - Double click on the .crt file to open its properties.
   - Access the “Details” tab and select the “Copy to file” option.

1. Certificate Export Wizard:
   - Click “Next” in the Certificate Export Wizard.
   - Select “Base-64 encoded X.509 (.CER)” in the format part to use, and then click “Next”

### 6. Convert yours .cer to .pfx

```ps
openssl pkcs12 -export -in master.cer -inkey master.key -out certificate.pfx
```

### 7. Import your .pfx file

```ps
Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $PFX_PASSWORD -Force -AsPlainText)
```

## .PFX to base64

```ps
certutil -encode certificate.pfx base64cert.txt
```
