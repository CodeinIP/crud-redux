
# CRUD-app with redux

This project contain all crud operations and login functionality


## Demo

https://my-tasks-crud.netlify.app/


## Run Locally

Clone the project

```bash
  git clone https://github.com/CodeinIP/crud-redux
```

Go to the project directory

```bash
  cd crud-redux
```

Install dependencies

```bash
  npm install
```

Start the server
``` bash
npm run server
```
Start the application

```bash
  npm run start
```


## Tech Stack

**Client:** React, Redux, ChakraUI




## Lessons Learned

- using redux to handle application state


## Deployment

To deploy this project run
```bash
Install netlify CLI
```
```bash
  npm run build
```
- Create `_redirects` file in build folder
- `/* /index.html 200` cmd inside the _redirects file
- `"homepage":"."` inside package.json
- run `netlify deploy` in terminal
- To deploy to production run `netlify deploy --prod`


