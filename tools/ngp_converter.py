from PIL import Image
import numpy as np

img = Image.open(input("File?")).convert("L")
img = img.resize((128, 58))
arr = np.array(img)
levels = 24
step = 256 // levels
quantized = np.minimum(arr // step, 23)
encoded = np.vectorize(lambda v: chr(ord('A') + v))(quantized)
encoded_str = ''.join(encoded.flatten())
print(encoded_str)
