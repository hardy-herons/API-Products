from environ import Path
import csv, sys

root = Path(__file__) - 2

# inputfile = csv.reader(open(root('dataset/product.csv'), 'r'))
# outputfile = csv.writer(open(root('transformed-data/transformedProduct.csv'), 'w'), delimiter='|')

inputfile = csv.reader(open(root('dataset/'+ str(sys.argv[1]) +'.csv'), 'r'))
outputfile = csv.writer(open(root('transformed-data/transformed' + str(sys.argv[1]) + '.csv'), 'w'), delimiter='|')

for row in inputfile:
    newRow = []
    for x in row:
        newX = x.strip()
        if newX == 'null':
            newX = 0.00
        # if newX.startswith("'") and not newX.endswith("'"):
        #     newX.join("'")
        # elif newX.startswith('"') and not newX.endswith('"'):
        #     newX.join('"')
        newRow.append(newX)
    outputfile.writerow(newRow)
    # print(row)


# print(next(inputfile))

# COPY public."Styles" FROM '/Users/danielkim/HR/SDC/transformed-data/transformedstyles.csv' WITH DELIMITER '|' CSV HEADER;