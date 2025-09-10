try{
  let j = eval(data)
} catch {
  log("app.cff",j)
  if(j != "EXIT"){
    requestExecFunction(`executeCFF('app', ${data})`)
  }
}
