from environ import Path
import csv, sys

root = Path(__file__) - 2

inputfile = csv.reader(open(root('dataset/photos.csv'), 'r'))
outputfile = csv.writer(open(root('transformed-data/transformedphotos.csv'), 'w'), delimiter='|')

count = 0
for row in inputfile:
    newRow = []
    maybe = []
    row[0] = str(count)
    count += 1
    for x in row:
        newX = x.strip()
        if '\n' in x:
            split_arr = x.split('\n')
            newRow.append(split_arr[0])
            new_line = split_arr[1].split(',')
            for xx in new_line:
                if xx.startswith("'") and not xx.endswith("'"):
                    xx = xx + "'"
                elif xx.startswith('"') and not xx.endswith('"'):
                    xx = xx + '"'
                elif xx.endswith("'") and not xx.startswith("'"):
                    xx = "'" + xx
                elif xx.endswith('"') and not xx.startswith('"'):
                    xx = '"' + xx
                maybe.append(xx)
        elif len(newRow) > 3:
            maybe.append(newX)
        else:
            if newX.startswith("'") and not newX.endswith("'"):
                newX = newX + "'"
            elif newX.startswith('"') and not newX.endswith('"'):
                newX = newX + '"'
            elif newX.endswith("'") and not newX.startswith("'"):
                newX = "'" + newX
            elif newX.endswith('"') and not newX.startswith('"'):
                newX = '"' + newX
            newRow.append(newX)
    outputfile.writerow(newRow)
    if len(maybe) > 0:
        maybe[0] = str(count)
        count += 1
        outputfile.writerow(maybe)