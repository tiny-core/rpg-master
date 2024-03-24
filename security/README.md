# Generate certificate with OpenSSL

Para criar um certificado utilizando o OpenSSL, você pode seguir os passos abaixo

### 1. Criação da Autoridade Certificadora (CA)

```ps
openssl req -x509 -sha256 -days 356 -nodes -newkey rsa:2048 -keyout masterCA.key -out masterCA.crt

```

### 2. Criação de uma Chave Privada

```ps
openssl genrsa -out master.key 2048

```

### 3. Criação de uma Solicitação de Assinatura de Certificado (CSR)

```ps
openssl req -new -key master.key -out master.csr

```

### 4. Assinatura do Certificado pela CA

```ps
openssl x509 -req -in master.csr -CA masterCA.crt -CAkey masterCA.key -CAcreateserial -out certificate.crt -days 365 -sha256

```

### 5. Para converter um certificado de .crt para .cer, siga os passos abaixo

1. Abra as Propriedades do Certificado:

   - Clique duas vezes no arquivo .crt para abrir suas propriedades.
   - Acesse a guia “Detalhes” e selecione a opção “Copiar para arquivo”.

1. Assistente para Exportação de Certificados:
   - Clique em “Avançar” no Assistente para Exportação de Certificados.
   - Selecione “X.509 codificado na base 64 (.CER)” na parte de formato a ser usado e, em seguida, clique em “Avançar”

### 6. Converta o seu para .cer .pfx

```ps
openssl pkcs12 -export -in master.cer -inkey master.key -out certificate.pfx
```

### 6. Importe seu arquivo .pfx

```ps
Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $PFX_PASSWORD -Force -AsPlainText)
```
