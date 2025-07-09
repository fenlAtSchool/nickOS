
from PIL import Image
import numpy as np
import json
image = Image.open(input("File?")).convert("RGB")
size = (58,58)
image = image.resize(size)
rgb_array = np.array(image)
rgb_tuples = rgb_array.reshape(-1, 3)
rgb_tuples = [[int(x) for x in i] for i in rgb_tuples]
unique_colors = set(map(tuple, rgb_tuples))


def find_dif(x, y):
  return abs(x[0] - y[0]) + abs(x[1] - y[1]) + abs(x[2] - y[2])
with open(input("Standard Color file (Usually colors.json)?"), 'r') as f:
  data = json.load(f)
def findMatchingBlock(x):
  md = ["NotPossible",99999]
  for i in range(len(data)):
    d = find_dif(data[i][1],x)
    if(d < md[1]):
      md[0] = i
      md[1] = d
  return md[0]

data = data[:20] + data[21:71] + data[72:76] + data[77:]

for i in range(len(rgb_tuples)):
  rgb_tuples[i] = findMatchingBlock(rgb_tuples[i])
charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|[]{}/-_>=+`~?.,;:"
items = [str(size[0]) + " " + str(size[1])]
txt = ""
total_len = 0
for i in rgb_tuples:
  real_item = charset[i]
  txt += real_item
  if len(txt) > 465:
    total_len += len(txt)
    items.append(txt)
    txt = ""
items.append(txt)
total_len += len(txt)
print(items)
print(total_len)
