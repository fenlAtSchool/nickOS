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
            tmp[i] = int(float(tmp[i]) * 100)/100
        vertexes.append([float(tmp[1]),float(tmp[2]),float(tmp[3])])
    if(tmp[0] == "f"):
        for i in range(1,4):
            tmp[i] = int(tmp[i]) - 1
        sqm.append([vertexes[tmp[1]],vertexes[tmp[2]],vertexes[tmp[3]]])
obj.close()
sqm = [sqm[i:i + 48] for i in range(0, len(sqm), 48)]
    
k = input("Save as: ")
k = open(k,"w")
k.write("squareMesh = [] \n")
for i in sqm:
    k.write("j = " + str(i) + "\n")
    k.write("fpos = [parseInt(api.getChestItemSlot([0,0,52]).attributes.customAttributes.pages[0]),0,52]\nfor(let i = 0; i < 2; i++){\n  for(let m = 0; m < 48; m++){\n      api.setBlock(fpos,'Chest')\n        api.setStandardChestItemSlot(fpos,0,'Book',1,undefined,{'customAttributes': {'pages': j[m].map(x=>toString(x))  }})\n  };fpos[2]++\n}\napi.setStandardChestItemSlot([0,0,51],0,'Book',1,undefined,{'customAttributes': {'pages': fpos[2] }})\n\n")
k.close()
