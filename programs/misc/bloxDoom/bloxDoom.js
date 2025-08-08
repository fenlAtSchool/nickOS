/*
bloxDoom Raycaster
Dependent on NickOS
*/
function inBounds(x,y,z){
    return x >= y && x <= z
}
function getBlockIn(pos){
  if(inBounds(pos[0],0,map.length*8) && inBounds(pos[1],0,map.length*8)){
    return map[Math.floor(pos[1]/8)][Math.floor(pos[0]/8)]
  } else {
    return 1
  }
}

function castFromPos(pos,degrees){
  let dist = 0
  let ac = 2
  let dx = Math.sin(toRad * degrees)
  let dy = Math.cos(toRad * degrees)
  let p = [...pos]
  while(getBlockIn(p) != 1 && dist < max_dist){
    dist += ac
    p[0] += ac * dx
    p[1] += ac * dy
  }
  while(getBlockIn(p) == 1){
    dist -= 0.1
    p[0] -= 0.1*dx
    p[1] -= 0.1*dy
  }
  return dist
}

function init(){
  fov = 128
  max_dist = 64
  toRad = Math.PI/180
  facing = 0
  isInit = true
  pos = [9,9]
  todo = ["scan"]
  map = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,1],
  [1,0,0,1,1,1,0,1],
  [1,0,0,1,0,0,0,1],
  [1,1,0,0,0,1,0,1],
  [1,0,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1]
  ]
}
function scan(pos,starting){
  let field = []
  let height = 0
  let dir = 0
  for(let i = 0; i < fov; i++){
    dir = i+starting-(fov/2)
    height = castFromPos(pos,dir)
    height *= Math.cos(toRad * (dir - starting))
    height = 22/height
    field.push(height > 63 ? 63: height)
  }
  return field
}
function tryMove(dx,dy){
  let opos = [...pos]
  pos += dx
  pos += dy
  if(getBlockIn(pos) == 1){
    pos = opos
  }
  return 1
}
function tick(){
  switch(todo[0]){
    case "scan":
      field = scan(pos,facing)
      i = 0
      todo = ["render"]
    case "render":
      while(i < 128){
        display[i] = display[i].map(v => [v[0],palette[0]])
        let j = Math.round(field[i]/2)
        drawImage(i,32-j,1,2*j,Array(2*j).fill(palette[1]))
        i++
      }
      task = ["updateDisplay", ["execute"]]
      todo = ["movement"]
      break
    case "movement":
      if(s[2] > 96){
        facing += 10
      }
      if(s[2] < 32){
        facing -= 10
      }
      facing %= 360
      let opos = [...pos]
      tryMove(1*Math.cos(facing * toRad), 0)
      tryMove(0, 1*Math.sin(facing * toRad))
      todo = ["scan"]
      break
  }
}

try{isInit}catch{init()}
tick()
