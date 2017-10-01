const path = require("path");
const express = require("express");

const app = express();

// Serve the built client
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
	const index = path.resolve(__dirname, "../client/build", "index.html");
	res.sendFile(index);
});

let server;
function runServer(port = 3001) {
	return new Promise((resolve, reject) => {
		server = app
			.listen(port, () => {
				console.log("listening on port ", port);
				resolve();
			})
			.on("error", reject);
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		server.close(err => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
}

runServer();

module.exports = {
	app,
	runServer,
	closeServer,
};
