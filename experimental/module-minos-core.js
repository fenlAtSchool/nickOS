functions = {toRun: []}
function onPlayerClick(id){
	if(id == user){
		registerClick = true
	}
}
function log(x, y){
	api.broadcastMessage(`minos-module-${x}: ${y}`)
}
function getFile(x, r = 0){
  let m = followPath(x, r)
  let n = api.getBlockData(1e5,m,0)?.persisted?.shared.c
  if(n == undefined){
		throw new Error(`fileNotFoundError: ${x}`)
    return false
  }
  let str = Array.from({length: n}, (_,i) => api.getBlockData(1e5,m,i + 1).persisted.shared.c)
  str = JSON.parse(str.join(''))
  return str 
}
function loadChunk(x){
	x = Math.floor(x/32)
	api.getBlock(1e5, 32*x + 16, 0)
}
function setFile(x,z){
	try{
  	let n = JSON.stringify(z).match(/.{1,300}/g)
  	let m = followPath(x)
		api.setBlockData(1e5, m, 0, {persisted: {shared: {c: n.length}}})
		for(let i = 0; i < n.length; i++){
  			api.setBlockData(1e5,m,i + 1,{persisted: {shared: {c: n[i]}}})
		}
	} catch {
		api.log("Warning: setFile not working")
		requestExecFunction(() => setFile(x, z), "")
	}
}
function setFileAttribute(x,a,z){
  let m = getFile(x)
  m[a] = z
  setFile(x,m)
}
function followPath(x, f = 0){
  if(typeof(x) == "number"){
    return x
  }
  if(typeof(x) == "string"){
    x = x.split("/")
  }
  let j = []
  for(let i of x){
    f = (getFile(f).contents)
	j = f.map(m => getFile(m))
    j = j.map(m => m.name + m.extension)
    if(!j.includes(i)){
      throw new Error(`invalidFilePathError: ${x}`)
      return false
    }
	f = f[j.indexOf(i)]
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
  setFile(r.fileCount, x)
  setFile(-1, r)
  log("minfs", `Succesful File Created: ${x}`)
  return r.fileCount
}

function boot(id){
  functions = {toRun: [], results: {}}
  user = id
  loadChunk(0)
  requestExecFunction(init, 'bootupCode')
	api.log("minfs: Succesful Boot")
}

function init(){
  let m = followPath("System/Library")
  font = getFile("font.json", m).contents
  config = getFile("config.json", m).contents
  let a = getFile("requirements.json", m)
  registerClick = false
  executeCFF(".pack","System/Library/require.pack")
  for(let i of a.contents){
    requestExecFunction(() => require(i), 'packLoaded')
  }
  requestExecFunction(() => log("minfs", "Succesful high-level initialization"), '')
  log("minfs", "Succesful low-level initialization")
  return 1
}

function executeCFF(extension, data){
  let tr = `System/Library/${extension}.cff`
  tr = getFile(tr).contents
  tr = eval(`let data = '${data}'; let path = '${tr}'; ${tr}`)
  if(tr != "HALT"){
    requestExecFunction(() => executeCFF(extension, data))
    return tr
  }
}

function requestExecFunction(func, resultOutputName){
  functions.toRun[functions.toRun.length] = [func, resultOutputName]
}
function executeFunction(){
  if(functions.toRun.length > 0){
	let func = functions.toRun.shift()
	functions.results[func[1]] = func[0]()
  }
}
function tick(){
	executeFunction()
}
