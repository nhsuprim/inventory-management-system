import app from "./app";

const port = 8000;

async function main() {
    const server = app.listen(port, () => {
        console.log("App is running at", port);
    });
}

main();
