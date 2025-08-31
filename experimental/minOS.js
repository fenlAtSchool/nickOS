// EXPERIMENTAL GBDKERNEL VERSON 0.1
// -1: SYSTEM DATA

function getFile(x){
  if(typeof(x) == "number"){
    return api.getBlockData(1e5,x,0).persisted.shared
  }
  return getFile(followPath(x))
}
function setFile(x,z){
  api.setBlockData(1e5,followPath(x),0,z)
}
function setFileAttribute(x,a,z){
  let m = getFile(x)
  m[a] = z
  setFile(x,m)
}
function followPath(x, f=0){
  if(typeof(x) == "number"){
    return x
  }
  if(typeof(x) == "string"){
    x = x.split("/")
  }
  for(let i of x){
    f = (getFile(f).contents).map(m => getFile(m))
    f = f.map(m => m.name + m.extension).indexOf(i)
    if(f === -1){
      throw new Error("File Path Invalid: ", x)
    }
  }
  return f
}
function deleteFile(z,x){
  z = followPath(z)
  x = followPath(x)
  let m = getFile(x)
  if(m.extension == ''){
    m.contents.forEach(i => deleteFile(x, i) )
  }
  setFile(x, {})
  let f = getFile(z)
  f.contents.splice(f.indexOf(x), 1)
  setFile(z, f)
}
function newFile(z,x){
  z = followPath(z)
  let f = getFile(z)
  let r = getFile(-1)
  r.fileCount++
  f.contents[f.contents.length] = r.fileCount
  setFile(z, f)
  setFile(r, x)
  setFile(-1, r)
  return r.fileCount
}

// DISPLAY
display = {x: 256, y: 128}
display.d = Array.from({length: display.y}, () => Array(display.x).fill([255,255,255]));
function drawDisplay(id){
  let f = []
  display.d.forEach(v => (v.forEach(f[f.length] j => {txt: '\u2588', style: {color: j, fontSize: '11px'}}); f[f.length] = {txt: '\n'} ))
  api.setFlyingMiddleMessage(id,f,0)
}

// PROCESSOR

processor = {tasks: [], output: []}
toRun = ""
function onBlockStand(id,b){
  if(toRun == ""){
    toRun = processor.tasks.shift()
  }
  processor.output[processor.output.length] = eval(toRun)
  toRun = ""
}

//INITIALIZER

function init(){
  font = getFile("System/Font.json").contents
}

//UTILITY FUNCTIONS

function dtxt(x,y,f, xlim=127, ylim=63){
  dx = x
  for(let i = 0; i < f.length && y < ylim; i++)[
    if(f[i] === '\n'){
      y += 4
      continue
    }
    font[f[i]].forEach((j,fy) => fy.forEach((m,fx) => display[y+fy][x+fx]=Array(3).fill(255*(m=="#")) ))
    x += 4
    if(x > xlim - 4){
      x = dx
    }
  }
}
