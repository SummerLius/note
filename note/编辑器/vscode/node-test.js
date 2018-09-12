const fs = require('fs');

function someAsyncOperation(callback) {
    // Assume this takes 95ms to complete
    fs.readFile('./note/special_characters.md', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;

    console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation((err, data) => {
    console.log('读取文件完成回调');
    const startCallback = Date.now();

    // do something that will take 10ms...
    while (Date.now() - startCallback < 2000) {
        // do nothing
    }
});