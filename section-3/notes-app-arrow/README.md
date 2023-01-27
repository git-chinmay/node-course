### Replacing with ES6 method notation and concise arrow function wherever possible

### Debugger
- Add 'debugger' word at any line inside your code 
where you want to debug

- Then run the app with flag inspect 

```
node inspect app.js add --title="courses" --body="node"
```

- Go to chrome/Brave browser(any browser runs V8 engine) and type below search bar

```
brave://inspect
```
or 
```
chrome://inspect
```

- A webpage will open. click on inpect under remote traget section

- It will open a dev console. We can use that for inspection.

- To close the debugger give CTRL + C two times in terminal