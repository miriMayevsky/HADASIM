// Middleware that handles errors on the server
// put default values ​​if none

 export const errorHandling = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = res.message || "sorry there is error in server";
    res.status(statusCode).send(message);
}
