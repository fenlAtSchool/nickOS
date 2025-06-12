
function inb = (x,y,z) => (x >= y && x <= z)

function init(){
  render_dist = 10
  fov = 160
  const nr = 0.3
  const a = 2
}

function project(coord){
  let f = 1 / Math.tan(fov * Math.PI / 90)
  let q = render_dist / (render_dist - nr)
  let x = a*f*coord[0]/coord[2]
  let y = f*coord[1]/coord[2]
  let z = coords[2]*q*(1-nr)]
  return [x/z,y/z]
}
function drawLine(a, b, color){
  let xd = a[0] - b[0]
  let xy = a[1] - b[1]
  let distance = Math.abs(xd) + Math.abs(xy)
  for(let i = 0; i < distance; i++){
    let x = Math.floor(b[0] + (i * xd)/distance)
    let y = Math.floor(b[1] + (i * xy)/distance)
    if(inb(x,0,127) && inb(y,0,63){
      // display[y][x] = color
      api.setBlock([x-64,64-y,50],api.blockIdToBlockName(color))
    }
  }
}
function scale(d){
  d[0] += 1
  d[1] += 1
  d[0] *= 64
  d[1] *= 32
  d[1] = 63 - d[1]
  return d
}
function draw3dline(a,b,color){
  let d = scale(project(a))
  let e = scale(project(b))
  drawLine(d,e,color)
}
function draw3dtri(k,color){
  draw3dline(k[0],k[1],color)
  draw3dline(k[0],k[2],color)
  draw3dline(k[1],k[2],color)
}

squareMesh = [
  [[0,0,0],[0,1,0],[1,1,0]],
  [[0,0,0],[1,1,0],[1,0,0]],
  
  [[1,0,0],[1,1,0],[1,1,1]],
  [[1,0,0],[1,1,1],[1,0,1]],
  
  [[1,0,1],[1,1,1],[0,1,1]],
  [[1,0,1],[0,1,1],[0,0,1]],

  [[0,0,0],[0,1,0],[1,1,0]],
  [[0,0,0],[1,1,0],[1,0,0]],
  
  [[0,0,1],[0,1,1],[0,1,0]],
  [[0,0,1],[0,1,0],[0,0,0]],
  
  [[1,0,1],[0,0,1],[0,0,0]],
  [[1,0,1],[0,0,0],[1,0,0]],
]

function tick(){
  for(let i of squareMesh){
    draw3dtri(i,86)
  }
}
