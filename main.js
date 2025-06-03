/*
Movement +/- x
Movement +/- z

Cursor X
Cursor Y

Main Action
Alt Action

(NickOS runs in the +Z direction)
*/

/* Example program

Stick Programming Lang
16 Registers, Unlimited memory, System Stack
X/Y/N/NN/NNN syntax from CHIP-8

REQ 0x0FFF- Give 256 more addresses
IMM 0x1XY0 - Store following Y bytes at RX
ISR 0x1XY4 - Store following Y bytes at MRX, one byte per mem (For string purposes)
STR 0x1XY1 - Store RX at Mem RY
LDR 0x1XY2 - Store Mem RX to RY
MOV 0x1XY3 - Store RX to RY

OPP 0x2XY0 - Plus RX RY
OPS 0x2XY1 - Minus RX RY
OPT 0x2XY2 - Mult RX RY
OPD 0x2XY3 - Div RX RY
OPM 0x2XY4 - Mod RX RY
OPA 0x2XY5 - And RX RY
OPN 0x2XY6 - Not RX
OPO 0x2XY7 - Or RX RY
OPX 0x2XY8 - Xor RX RY

CAL 0x3000 - Push PC to Stack 2, JMP to POP
RET 0x3FFF - JMP to POP Stack 2
IDX 0x3X01 - Set index to RX

JMP 0x4007 - JMP RX
JEQ 0x4XY2 - JEQ RX RY
JGT 0x4XY1 - JGT RX RY
JLT 0x4XY4 - JLT RX RY
JGE 0x4XY3 - JGE RX RY
JLE 0x4XY6 - JLE RX RY
JNE 0x4XY5 - JNE RX RY

DIS 0x5XY0 - Display string with RY len starting from MEM RX

PIX 0x5XY1 - CHIP-8 DXYN with single pixel
DRA 0x5XYN - CHIP-8 DXYN

SPI 0x6XY0 - Display pixel RXRY with IDX
DSP 0x7XYN - Display 

*/
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

function OSboot(){
        active = []
        ram = []
        s = [0,0,0,0,0,0,0,0,0]
        display = [] //sulfrox code format used
        filecount = api.getStandardChes\u{74}\u{49}\u{74}emSlot([-1,0,51],0)["attributes"]["customAttributes"]["pages"][0]
        for(let i = 0; i < 64; i++){
                display.push([])
                for(let z = 0; z < 64; z++){
                        display[display.length - 1].push(0)
                }
        }
        task = ["displayFileNames", 0, 16]
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
function displayFileNames(obj){
        if(obj[1] <= obj[2]){  
                let m = "api.getStandardChest"
                m += `Items([${prog},0,51])`
                m = eval(m)[0][pages][0]
                api.log(m) //Placeholder for font display
                obj[1]++
                return 0
        }
        return 1
}
