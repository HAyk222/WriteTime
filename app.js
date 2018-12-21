const { Writable, Readable, Transform } = require("stream");
const fs = require("fs");
const moment = require("moment");

const format = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString() + "\n");
  }
});


const read = new Readable({ objectMode: true });
read._read = () => { };

const writeTime = () => {
	read.push(moment().format("h:mm:ss a"))
}

setInterval( writeTime, 1000 );

const write = new Writable({ objectMode: true });
write._write = (data, encoding, done) => {
  fs.appendFile( "writeTime.txt", data, err => err && console.error(err) );
  done();
};

read.pipe(format).pipe(write);


