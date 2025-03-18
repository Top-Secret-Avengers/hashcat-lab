# read the file and create a list with all answers and hints
def getAnswers():
    with open('answer.txt', 'r') as file:
        ans = file.read()

    resDict = {}
    lst = ans.splitlines()
    # still need a setup for value
    res = list(zip(lst[::2], lst[1::2]))
    for each in res:
        resDict.update({each: []})
    print(resDict)
    return resDict
# catch errors reading hints file, if theres no hints still runs
def getHints():
    try:
        with open('hints.txt','r') as file:
            hint = file.read()
            temp = hint.splitlines()
            
            return temp
    except:
        print('No Hints this time')
        return None
    return None
