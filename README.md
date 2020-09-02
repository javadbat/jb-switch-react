# jb-switch-react

simple switch component for react with loading ability

## installation

run `npm install jb-switch-react` to install package with npm

## usage

import component in your page `import JBSwitch from 'jb-switch-react'`  
you can import special edition for different envirement like es6 or requirejs or systemjs like:  
`import JBSwitch from 'jb-switch-react/dist/JBSwitch.cjs.min'` for requirejs version  
`import JBSwitch from 'jb-switch-react/dist/JBSwitch.min'` for standard es6  
`import JBSwitch from 'jb-switch-react/dist/JBSwitch.systemjs.min'` for systemjs  

use below syntax in your render function

```jsx
<JBSwitch value={booleavValue} isLoading={isLoading} trueTitle='true caption' falseTitle='false caption' onChange={(e)=>onChange(e)} ></JBSwitch>
```

as you can see in above example `value` is on-way binding like normal react forms input trueTitle is a title that place on true side of component and get bold on `value == true` onChange is standard too  
if you want to show loading in switch just make `isLoading = true`

```javascript
 onChange(e){
     setIsLoading(true)
    return new Promise((resolve,reject)=>{
        fetch(request).then((response)=>return response.json).then((data)=>{
            setIsLoading(false)
            resolve();
        })
    })
}
```

demo image:    
![](demo-gif.gif)