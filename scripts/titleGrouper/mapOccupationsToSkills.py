import numpy as np
import re
import matplotlib.pyplot as plot
from scipy import spatial


def x() :
    file = open("skills.txt", "r")
    skills = np.char.strip(np.array(file.readlines(), dtype="S255"))

    file = open("occupations.txt", "r")
    occupations = np.char.strip(np.array(file.readlines(), dtype="S255"))

    file = open("skillsWithOccupation.csv", "r")
    pairs = np.array(file.readlines())

    m = np.zeros((skills.size, occupations.size), dtype=np.int16)

    for i in range(0, pairs.size) :
        skill = bytes(re.sub(r'[^a-zA-Z0-9 ]', '', pairs[i].split(";")[0]), 'utf-8')
        occupation = bytes(re.sub(r'[^a-zA-Z0-9 ]', '', pairs[i].split(";")[1]), 'utf-8')

        x = np.where(skills == skill)
        y = np.where(occupations == occupation)

        if (x[0].size > 0 and y[0].size > 0):
            m[x[0][0]][y[0][0]] = 1

    n = m.T
    N = m[0].size
    r = np.zeros((N, N))

    for i in range(0, N) :
        print(i)
        for j in range(i, N) :
            if (i != j) :
                r[i][j] = 1 - spatial.distance.cosine(n[i], n[j])

    print("ready")

    return r

#print(x())
#np.savetxt("occupations.txt", x(), fmt="%s")

plot.imshow(x())
plot.show()
