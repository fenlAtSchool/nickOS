
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
  return r.fileCount
}
