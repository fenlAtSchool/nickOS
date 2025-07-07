from PIL import Image
import numpy as np

img = Image.open(input("File Name?")).convert("L")
arr = input("Dimensions?").split()
arr = np.array(img.resize((int(arr[0]),int(arr[1]))))
levels = 24
step = 256 // levels
quantized = np.minimum(arr // step, 23)
encoded = np.vectorize(lambda v: chr(ord('A') + v))(quantized)
encoded_str = ''.join(encoded.flatten())
print(encoded_str)
