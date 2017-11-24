from gensim.summarization import summarize

with open('test-application.txt') as file:
    content = file.read().replace('\n', ' ')
    try:
        print summarize(content)
    except:
        print 'Error in summarization'
