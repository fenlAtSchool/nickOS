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
        vertexes.append([float(tmp[1]),float(tmp[2]),float(tmp[3])])
    if(tmp[0] == "f"):
        sqm.append([vertexes[int(tmp[1])-1],vertexes[int(tmp[2])-1],vertexes[int(tmp[3])-1]])
obj.close()
sqm = [sqm[i:i + 150] for i in range(0, len(sqm), 150)]
    
k = input("Save as: ")
k = open(k,"w")
k.write("squareMesh = [] \n")
for i in sqm:
    k.write("j = " + str(i))
    k.write("\nfor(let i = 0; i < j.length; i++){\n   squareMesh.push(j[i])\n}\n")
k.close()
