console.log("Starting...");
setTimeout(()=>{
    console.log("Timer-1...");
},2000);

setTimeout(()=>{
    console.log("Timer-2...");
},0);

console.log("Stopping...");

/* 
Here expected sequence was Starting->Timer-2->Stopping->Timer-1
Bcz 0ms in Timer-2 it should start before Stopping but nothing such happening here.
To know why we have to understand the internals of Node.js(Call Stack, Call Back Queue & Event loop)
*/