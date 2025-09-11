
function getFile(x){
  try{
    return getBlockData(1e5,followPath(x),0).persisted.shared
  } catch {
    throw new Error("FileNotFoundError: ", x)
    return false
  }
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
      throw new Error("InvalidFilePathError: ", x)
      return false
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
  log("minfs", `Succesful File Created: ${x}`)
  return r.fileCount
}






function boot(){
  functions = {toRun: [], results: {}}
  requestExecFunction('init()', bootupCode)
}

function init(){
  let m = followPath("System/Library")
  font = getFile("Font.json", m).contents
  config = getFile("Config.json", m).contents
  windows = []
  requestExecFunction('initTerminal()', bootupSuccess)
  let a = JSON.parse(getFile("requirements.json", m).contents)
  for(let i of a){
    requestExecFunction(`executeCFF('pack',${i})`, packLoaded)
  }
  return 'POSITIVE INIT'
}

function executeCFF(extension, data){
  let tr = `System/Library/${extension}.cff/main.js`
  tr = eval(`let data = ${data}; let path = ${tr}; ${getFile(tr)}`)
  if(tr != "HALT"){
    requestExecFunction(`executeCFF(extension, data)`)
    return tr
  }
}

function requestExecFunction(func, resultOutputName){
  functions.toRun[functions.toRun.length] = [func, resultOutputName]
}
function executeFunction(){
  let func = functions.toRun.shift()
  functions.results[func[1]] = eval(func[0])
}

function tick(){
  executeFunction()
}

