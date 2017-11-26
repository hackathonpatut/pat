with open('append-finnish.sql', 'w+') as out:
  with open('finnish_occupations.txt', 'r') as f:
    i = 1
    for line in f:
        s = line.replace('\n', '').split(',')
        out.write('UPDATE titles SET title_fi = "' + s[1] + '" WHERE title = "' + s[0] + '";\n')
