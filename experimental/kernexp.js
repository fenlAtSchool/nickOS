// EXPERIMENTAL GBDKERNEL VERSON 0.1

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
    x = x.shift()
  }
  for(let i of x){
    f = (getFile(f).contents).map(m => getFile(m).name)
    f = f.indexOf(i)
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
  if(m.extension == "fol"){
    m.contents.forEach(i => deleteFile(x, i) )
  }
  setFile(x, {})
  let f = getFile(z)
  f.contents.splice(f.indexOf(x), 1)
  setFile(z, f)
}
