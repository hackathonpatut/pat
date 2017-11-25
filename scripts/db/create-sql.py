skills = []

with open('skills.sql', 'w+') as out:
  with open('skills.txt', 'r') as f:
    i = 1
    out.write('INSERT INTO skills (id, skill, createdAt, updatedAt) VALUES\n')
    for line in f:
      skills.append(line.replace('\n', ''))
      out.write('(' + str(i) + ',\'' + line.replace('\n', '') + '\',\'created\',\'updated\'),\n')
      i += 1

titles = []
with open('titles.txt', 'r') as f:
  for line in f:
    titles.append(line.replace('\n', ''))

pairs = []
with open('titlesToSkills.sql', 'w+') as out:
  with open('skillsWithOccupation.csv', 'r') as f:
    i = 1
    out.write('INSERT INTO skillsToTitles (skillId, titleId, createdAt, updatedAt) VALUES\n')
    fails = 0
    cnt = 0
    for line in f:
      splitted = line.replace('\n', '').split(';')
      cnt += 1
      try:
        titleId = titles.index(splitted[1]) + 1
        skillId = skills.index(splitted[0]) + 1
        pair = str(titleId) + ' ' + str(skillId)
        if (pair in pairs):
          fails += 1
        else:
          pairs.append(pair)
          out.write('(' + str(skillId) + ',' + str(titleId) + ',\'created\',\'updated\'),\n')
        i += 1
      except:
        pass

print cnt
print fails