from wand.image import Image
from PIL import Image as PI
import pyocr
import pyocr.builders
import io
import sys
import json

filename = sys.argv[1:][0]

tool = pyocr.get_available_tools()[0]
lang = tool.get_available_languages()[2]

req_image = []
final_text = []

filename = os.path.join(os.path.dirname(__file__), '..', 'cv.pdf')

image_pdf = Image(filename=filename, resolution=300)
image_jpeg = image_pdf.convert('jpeg')

for img in image_jpeg.sequence:
  img_page = Image(image=img)
  req_image.append(img_page.make_blob('jpeg'))

for img in req_image:
  txt = tool.image_to_string(PI.open(io.BytesIO(img)), lang='eng', builder=pyocr.builders.TextBuilder())
  final_text.append(txt.encode('ascii', 'ignore'))

single = ' '.join(final_text).replace('\n', ' ').lower()
#print single

total = 0.0

foundKeys = []

with open('keywords.csv') as keyfile:
  for line in keyfile:
    key = line.split(',')[0]
    weight = float(line.split(',')[1])
    if (key in single):
      total += weight
      foundKeys.append(key)

print 'Rank: ' + str(total)
print 'Found keys: ' + ','.join(foundKeys)
