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

REQ 0x0FFF- Give 32 more 8-bit addresses
IMM 0x1XNN - Store NN at RX
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

JMP 0x4007 - JMP RX
JEQ 0x4XY2 - JEQ RX RY
JGT 0x4XY1 - JGT RX RY
JLT 0x4XY4 - JLT RX RY
JGE 0x4XY3
JLE 9x4XY4
JNE 


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
        vec = ctmp["camPos"]
        ctmp = ctmp["dir"]
        
        ctmp[0] = ctmp[0] * (50 / ctmp[2]) + vec[0]
        ctmp[1] = ctmp[1] * (50 / ctmp[2]) + vec[1]

        if(inBounds(ctmp[0], -32, 32) && inBounds(ctmp[1],-32,32)){
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
function setProcess(name){
        ram[name] = []
        active.push(name)
}
function requestMemory(name){
        for(let i = 0; i < 256; i++){
                ram[name].push(0)
        }
}
function killProcess(name){
        active.splice(active.indexOf(name),1)
        delete ram[name] = []
}

function OSboot(){
        active = []
        ram = {}

        setProcess('sys')
        requestMemory('sys')
}
