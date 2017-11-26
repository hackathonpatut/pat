import os, subprocess

dir = os.path.join(os.path.dirname(__file__), '..', 'exampleData')

alpha = 3

for file in os.listdir(dir):
  if ('.pdf' in file):
    result = os.popen('python cvParser.py %s' % os.path.join(dir, file)).read()
    print result
    ans = int(raw_input('Is this good? (1-3)\n'))
    keys = raw_input('Add keywords?\n')
    
    foundKeys = result.split('Found keys: ')[1]
    if (foundKeys):
      foundKeys = foundKeys.split(',')
    
    if (keys != 'n' and len(keys.strip()) > 0):
      with open('keywords.csv', 'a') as keyfile:
        for key in keys.split(','):
          keyfile.write('%s,1\n' % key)
    
    if (ans < 2):
      with open('keywords.csv', 'r') as keyfile:
        with open('new-keys.csv', 'w') as newfile:
          for line in keyfile:
            key = line.split(',')[0]
            weight = float(line.split(',')[1])
            if (key in foundKeys):
              weight -= alpha
            newfile.write('%s,%.2f\n' % (key, weight))
      os.remove('keywords.csv')
      os.rename('new-keys.csv', 'keywords.csv')
    elif(ans > 2):
      with open('keywords.csv', 'r') as keyfile:
        with open('new-keys.csv', 'w') as newfile:
          for line in keyfile:
            key = line.split(',')[0]
            weight = float(line.split(',')[1])
            if (key in foundKeys):
              weight += alpha
            newfile.write('%s,%.2f\n' % (key, weight))
      os.remove('keywords.csv')
      os.rename('new-keys.csv', 'keywords.csv')
    