
try{state}catch{state='init'}

if(state == 'init'){
  dtxt(56,6,"PONG")
  dtxt(20,12,"Click to Start")
  updateDisplay()
  task = ["waitTC",["execute"]]
}
