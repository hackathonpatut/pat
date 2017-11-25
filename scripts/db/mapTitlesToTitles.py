import numpy as np
import re
import matplotlib.pyplot as plot

def x() :
    file = open("skills.txt", "r")
    skills = np.char.strip(np.array(file.readlines(), dtype="S255"))

    file = open("titles.txt", "r")
    occupations = np.char.strip(np.array(file.readlines(), dtype="S255"))

    file = open("titlesToSkills.csv", "r")
    pairs = np.array(file.readlines())

    m = np.zeros((skills.size, occupations.size), dtype=np.int16)

    for i in range(0, pairs.size) :
        skill = bytes(re.sub(r'[^a-zA-Z0-9 ]', '', pairs[i].split(",")[1]).encode('utf-8'))
        occupation = bytes(re.sub(r'[^a-zA-Z0-9 ]', '', pairs[i].split(",")[0]).encode('utf-8'))

        x = np.where(skills == skill)
        y = np.where(occupations == occupation)

        if (x[0].size > 0 and y[0].size > 0):
            m[x[0][0]][y[0][0]] = 1

    N = occupations.size

    print("calculating dot product")

    r = m.T.dot(m)

    print("ready")

    return r

#print(x())
np.savetxt("title-matrix.txt", x(), fmt="%s")
print('saved')

#plot.imshow(x())
#plot.show()
