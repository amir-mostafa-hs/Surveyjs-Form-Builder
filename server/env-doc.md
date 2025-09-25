## encrypt and decrypt env file with password

If you want to send env file in git repository with encrypt content, you can use `OpenSSL` tools to make encrypt and decrypt file with password.
For encrypt use command below:

```bash
openssl enc -aes-256-cbc -salt -in .env -out .env.enc
# or
openssl enc -aes-256-cbc -pbkdf2 -iter 100000 -salt -in .env -out .env.enc
```

For decrypt use command below:

```bash
openssl enc -aes-256-cbc -d -in .env.enc -out .env
# or
openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -in .env.enc -out .env
```
