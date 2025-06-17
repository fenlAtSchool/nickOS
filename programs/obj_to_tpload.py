sqm = []
vertexes = []
print("OBJ File Converter into Plot3d Mesh: fenl")
obj = input("File Name: ")
try: 
    obj = open(obj)
except:
    raise FileNotFoundError(f"File {obj} not found.")
    
for x in obj:
    tmp = x.split()
    tmp.append("t")
    if(tmp[0] == "v"):
        for i in range(1,4):
            tmp[i] = float(tmp[i])
        vertexes.append(tmp[1:])
    if(tmp[0] == "f"):
        for i in range(1,4):
            tmp[i] = int(tmp[i]) - 1
        m = [vertexes[tmp[1]],vertexes[tmp[2]],vertexes[tmp[3]]]
        if not m in sqm:
            sqm.append(m)
obj.close()
print(len(sqm))
sqm = [sqm[i:i + 108] for i in range(0, len(sqm), 108)]
sqm[-1] += [[0,0,0],[0,0,0],[0,0,0]] * (108 - len(sqm[-1]))
k = input("Save as: ")
k = open(k,"w")
for i in sqm:
    k.write("j = " + str(i) + "\n")
    k.write("fpos = [0,0,53+parseInt(api.getStandardChestItemSlot([0,0,52],0).attributes.customAttributes.pages[0])]\n")
    k.write("for(let i = 0; i < 3; i++){\n")
    k.write("    for(let m = 0; m < 36; m++){\n")
    k.write("        api.setBlock(fpos,'Chest')\n")
    k.write("        api.setStandardChestItemSlot(fpos,m,'Book',1,undefined,{'customAttributes': {'pages': j[m].map(x=>JSON.stringify(x))  }})\n")
    k.write("    }; fpos[2]++\n")
    k.write("}; api.setStandardChestItemSlot([0,0,52],0,'Book',1,undefined,{'customAttributes': {'pages': [(fpos[2] - 53).toString()]}})\n")
    k.write("api.log('SUCCESS')\n\n")

k.close()
