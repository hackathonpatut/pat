import numpy as np
import re
import matplotlib.pyplot as plot

def x() :
    file = open("skillsWithOccupation.csv", "r")

    skills = np.array(file.readlines())

    for i in range(0, skills.size) :
        skills[i] = re.sub(r'[^a-zA-Z0-9 ]', '', skills[i].split(";")[1]).strip()

    skills = np.unique(skills)

    return np.sort(skills)


np.savetxt("occupations.txt", x(), fmt="%s")


# plot.imshow(x())
# plot.show()
