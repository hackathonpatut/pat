import os
from gensim.summarization import summarize

path = os.path.dirname(__file__)
with open(os.path.join(path, '..', 'application.txt')) as file:
    content = file.read().replace('\n', ' ')
    try:
        print summarize(content)
        os.remove(os.path.join(path, '..', 'application.txt'))
    except:
        print 'Error in summarization'
