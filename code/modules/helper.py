# add player to player dictionary with 0 points, if player already exists return false
def addPlayer(input, players):
    if input in players:
        return False
    else:
        players[input] = 0
        return True
    
# get revealed hints checks each hint to see if it should be sent as the hint or 'unrevealed' unused at the moment
def getRevealedHints(hints):
    res = []
    for key in hints.keys():
        if hints[key] == True:
            res.append(key)
        else:
            res.append('Unrevealed')
    return res

# Scoring --------------------------------------------------

# score for a player submitting a flag. Default score is 1.
def submitScore(name,password,player, answers, players, score=1):
    print(name,password)
    if (name,password) in answers.keys():
        if player in answers[(name,password)]:
            return False
        else:
            answers[(name,password)].append(player)
            players[player] += score
            print(answers)
            print(players)
            return True
    else:
        return False
