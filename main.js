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

REQ - Give 32 more 32-bit addresses
STM - Push string Y to memory at index X (Will be array of ASCII ints)
STO - Push register X to memory at index Y
INR - Store 


OP Family:
P - Plus
S - Minus
T - Mult
D - Div
M - Mod
A - And
N - Not
O - Or
X - Xor

CAL - Push PC to Stack 2, JMP to POP


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
