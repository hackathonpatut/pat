import sys, os

titles = map(lambda a: a.replace('\'', ''), sys.argv[1:])

skills = []

path = os.path.dirname(__file__)

with open(os.path.join(path, 'skillsWithOccupation.csv'), 'r') as f:
  for line in f:
    entry = line.replace('\n', '').split(';')
    skill = entry[0]
    title = entry[1]

    if (title in titles):
      skills.append(skill)

skillmap = list(set(map(lambda s: '%s:%d' % (s, skills.count(s)), skills)))

print '\n'.join(skillmap)
