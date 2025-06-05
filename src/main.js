

user = "fenl_"

inBounds = (x,y,z) => (x >= y && x <= z)
onPlayerClick = () => (jp[4] = 1)
onPlayerAttemptAltAction = () => (jp[5] = 1)

function movtrack(){
        let z = api.getPosition(api.getPlayerId(user))
        // api.setPosition(user,[0,0,0])
        return z
}
function ctrack(){
        let ctmp = api.getPlayerFacingInfo(api.getPlayerId(user))
        let vec = ctmp["camPos"]
        ctmp = ctmp["dir"]
        
        ctmp[0] = ctmp[0] * ((50-vec[2]) / ctmp[2]) + vec[0]
        ctmp[1] = ctmp[1] * ((50-vec[2]) / ctmp[2]) + vec[1]
        ctmp[0] = Math.floor(ctmp[0] + 64)
        ctmp[1] = Math.floor(64 - ctmp[1])
        if(inBounds(ctmp[0], 0, 128) && inBounds(ctmp[1],0,64)){
                return ctmp
        }
        return [0,0,0]
}
function jp(){
        s[7] = s[2]
        s[8] = s[3]
        let tmp = ctrack()
        s[2] = tmp[0]
        s[3] = tmp[1]
        tmp = movtrack()
        s[0] = tmp[0]
        s[1] = tmp[2]
        s[4] = 0
        s[5] = 0
}

function requestMemory(name){
        for(let i = 0; i < 256; i++){
                ram[active.indexOf(name)].push(0)
        }
}
function setProcess(name){
        ram.push([])
        active.push(name)
        requestMemory(name)
}
function killProcess(name){
        ram.splice(active.indexOf(name),1)
        active.splice(active.indexOf(name),1)
}

function cursorShape(){
        return "100011010"
}
function drawCursor(){
        let m = cursorShape()
        for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                        let pos = [s[7]-64+i,64-s[8]-j,50]
                        let tmp = display[s[7]+i][s[8]+j][1]
                        api.setBlock(pos,api.blockIdToBlockName(tmp))
                        pos = [s[2]+i-64,64-s[3]-j,50]
                        api.setBlock(pos,api.blockIdToBlockName(97-11*m[3*i+j]))
                }
        }
        return 1
}
function dtxt(x,y,m){ 
        let r = 0
        for(let i = 0; i < m.length; i++){
                for(let dy = 0; dy < 5; dy++){
                        for(let dx = 0; dx < 3; dx++){
                                r = font[m[i]][3 * dy + dx]
                                if(r == "#"){
                                        display[x + dx][y + dy][1] = 86
                                } else {
                                        display[x + dx][y + dy][1] = 97
                                }
                        }
                }
                x += 4
        }
        return 1
}
function displayFileNames(obj){ // [task, progress, starting val]
        if(obj[1] < 10 && filecount > obj[1] + obj[2]){  
                let m = "api.getStandardChest"
                m += `Items([${obj[1] + obj[2]},0,51])`
                m = eval(m)[0]["attributes"]["customAttributes"]["pages"][0]
                api.log(m)
                dtxt(0, obj[1]*6 + 12, m)
                obj[1]++
                api.log(obj)
                return obj
        }
        return ["updateDisplay",0,0]
}
function updateDisplay(obj){
        for(let y = 0; y < 128; y++){
                for(let x = 0; x < 64; x++){
                        let val = display[y][x]
                        if(val[0] != val[1]){
                                val[0] = val[1]
                                let tmp = api.blockIdToBlockName(val[1])
                                api.setBlock([y - 64,64 - x,50],tmp)
                                display[y][x] = val
                        }
                }
        }
        return ["FINISHED",0,0]
}
function drawInitMenu(){
        dtxt(0, 0, "NickOS Alpha")
        
}


osOn = false
function tick(){
        if(osOn){
                jp()
                switch(task[0]){
                        case "displayFileNames":
                                task = displayFileNames(task)
                                break
                        case "updateDisplay":
                                updateDisplay(task)
                                task = ["cursor",0,0]
                                break
                        case "cursor":
                                drawCursor()
                                break
                        case "drawInitMenu":
                                drawInitMenu()
                                break
                }
        }
}
