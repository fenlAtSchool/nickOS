# Keys
Movement +/- x
Movement +/- z

Cursor X
Cursor Y

Main Action
Alt Action

(NickOS runs in the +Z direction)

# Stick Programming Lang
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


