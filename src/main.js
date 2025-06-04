
user = -1

inBounds = (x,y,z) => (x >= y && x <= z)
onClick = () => (jp[4] = 1)
onPlayerAttemptAltAction = () => (jp[5] = 1)

function movtrack(){
        let z = api.getPosition(user)
        api.setPosition(user,[0,0,0])
        return z
}
function ctrack(){
        let ctmp = api.getPlayerFacingInfo(user)
        let vec = ctmp["camPos"]
        ctmp = ctmp["dir"]
        
        ctmp[0] = ctmp[0] * (50 / ctmp[2]) + vec[0] + 32
        ctmp[1] = ctmp[1] * (50 / ctmp[2]) + vec[1] + 32

        if(inBounds(ctmp[0], 0, 64) && inBounds(ctmp[1],0,64)){
                return ctmp
        }
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
                        api.setBlock(s[7] + i - 32, s[8] + j - 32, display[ (s[7] + j) * 64 + s[8] + i])
                        api.setBlock(s[2] + i - 32, s[3] + j - 32, 86 + 11 * m[3*i+j])
                }
        }
        return 1
}
function dtxt(x,y,m){ //todo
        let r = 0
        for(let i = 0; i < m.length; i++){
                for(let dy = 0; dy < 5; dy++){
                        for(let dx = 0; dx < 3; dx++){
                                r = font[i][3 * dy + dx]
                                if(r == "#"){
                                        display[x + dx][y - dy] = 86
                                } else {
                                        display[x + dx][y - dy] = 97
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
                api.log(`NLOG: ${m}`)
                dtxt(0, 64 - obj[1]*5, m)
                obj[1]++
                return obj
        }
        return ["updateDisplay",0,0]
}
function updateDisplay(obj){
        for(let y = 32; y > -33; y++){
                for(let x = -32; x < 33; x++){
                        if(display[y + 32][x + 32][0] != display[y + 32][x + 32][1]){
                                display[y + 32][x + 32][0] = display[y + 32][x + 32][1]
                                api.setBlock([x,y,50],display[y + 32][x + 32][1])
                        }
                }
        }
        return ["FINISHED",0,0]
}


osOn = false
function tick(){
        if(osOn){
                switch(task[0]){
                        case "displayFileNames":
                                task = displayFileNames(task)
                                break
                        case "display":
                                task = updateDisplay(task)
                                break
                        
                }
        }
}
