import express, { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response): any => {
    return response.json("Hello World!!!!");
});

app.listen(8080, () => console.log("listening on port 8080"));