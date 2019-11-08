from environ import Path
import csv

root = Path(__file__) - 2

inputfile = csv.reader(open(root('dataset/product.csv'), 'r'))
outputfile = csv.writer(open(root('transformed-data/transformedProduct.csv'), 'w'), delimiter='|')

for row in inputfile:
    newRow = []
    for x in row:
        newRow.append(x.strip())
    outputfile.writerow(newRow)
    # print(row)


# print(next(inputfile))