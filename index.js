const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
	if (req.url === '/' || req.url === '/home.html') {
		fs.readFile('./home.html', (error, data) => {
			if (error) {
				throw new error("File either doesn't exist or corrupted")
			}
			res.writeHead(200, {
				'Content-Type': 'text/html'
			})
			res.end(data)
		})
	}
	else if (/\.html/.test(req.url)) {
		let catagory = req.url.slice(1, req.url.length - 5)
		if (catagory === "nature" || catagory === "quotes") {
			fs.readFile("./catagory.html", (error, data) => {
				if (error) {
					throw new error("File either doesn't exist or corrupted")
				}
				//Read Catagory
				let dataFile = data.toString()
				//Edit Header to catagory
				dataFile = dataFile.replace("##container##", catagory)
				fs.readdir("./Images/" + catagory, (error, items) => {
					items.forEach((item, i) => {
						dataFile = dataFile.replace("##slide" + (i + 1) + "##", "./Images/" + catagory + "/" + item)
					})
					res.writeHead(200, {
						'Content-Type': 'text/html'
					})
					res.end(dataFile)
				})
			})
		}
		else {
			fs.readFile('./error.html', (error, data) => {
				if (error) {
					throw new error("File either doesn't exist or corrupted")
				}
				res.writeHead(200, {
					'Content-Type': 'text/html'
				})
				res.end(data)
			})
		}
	}
	else if (/\.css/.test(req.url)) {
		fs.readFile("." + req.url.toString(), (error, data) => {
			if (error) {
				throw new error("File either doesn't exist or corrupted")
			}
			res.writeHead(200, { 'Content-Type': 'text/css' })
			res.end(data)
		})
	}
	else if (/\.jpg/.test(req.url)) {
		fs.readFile("." + req.url.toString(), (error, data) => {
			if (error) {
				throw new error("Image either doesn't exist or corrupted")
			}
			res.writeHead(200, { 'Content-Type': 'image/jpg' })
			res.end(data)
		})
	}


}).listen(3000);
console.log("Listening on port : 3000")
