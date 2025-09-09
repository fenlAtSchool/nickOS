function drawDisplay(id){
  let f = Array(config.displayx * confix.displayy).fill({str: '\u2588', style: {color: [255,255,255]}})
  for(let i of windows){
    for(let j = 0; j < i.x; j++){
      for(let z = 0; z < i.y){
        f[display.x * (i.sy + j) + i.sx + z].style.color = win[i.y][i.x]
      }
    }
  }
  api.setFlyingMiddleMessage(id,f,0)
}
function boot(){
  functions = {toRun: [], results: {}}
  requestExecFunction('init()', bootupCode)
  log("minos-core", "Initial bootup finished")
}
function log(module, x){
  api.broadcastMessage(`module-${module}.js: ${x}`)
  return x
}
function init(){
  let m = followPath("System")
  font = getFile("Font.json", m).contents
  config = getFile("Config.json", m).contents
  windows = []
  log("minos-core", "Setup finished")
  return 1
}

function dtxt(win, x,y,f, xlim=win.length, ylim=win[0].length){
  dx = x
  for(let i = 0; i < f.length && y < ylim; i++)[
    if(f[i] === '\n'){
      y += 4
      continue
    }
    font[f[i]].forEach((j,fy) => fy.forEach((m,fx) => win[y+fy][x+fx]=Array(3).fill(255*(m!="#")) ))
    x += 4
    if(x > xlim - 4){
      x = dx
    }
  }
}

function drawBoxOutline(x1,x2,y1,y2){
  let m = [0,0,0]
  for(let i = y1; i < y2; i++){
    display[i][x1] = m
    display[i][x2] = m
  }
  for(let i = x1; i < x2; i++){
    display[y1][i] = m
    display[y2][i] = m
  }
}

function requestExecFunction(func, resultOutputName){
  functions.toRun[functions.toRun.length] = [func, resultOutputName]
}
function executeFunction(){
  let func = log('minos-core', `Executing function ${functions.toRun.shift()}` )
  functions.results[func[1]] = eval(func[0])
}

function tick(){
  executeFunction()
}

