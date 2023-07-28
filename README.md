## Run Development Server

```bash
npm run dev

```
## Deploy to Digital Ocean

```bash
git push -f gitlab-master HEAD:master

*for development branch
git push -f gitlab-master HEAD:dev

* Gitlab account is under azbow Digital Ocean account (suppo)
```

--- notes --
* Make sure firebase service json file is present in the working folder before deploying.
* Make sure all required environment variables are present in the working folder before deploying.