from environ import Path
import csv, sys

root = Path(__file__) - 2

# inputfile = csv.reader(open(root('dataset/product.csv'), 'r'))
# outputfile = csv.writer(open(root('transformed-data/transformedProduct.csv'), 'w'), delimiter='|')

inputfile = csv.reader(open(root('dataset/'+ str(sys.argv[1]) +'.csv'), 'r'))

print(next(inputfile))

# if not sys.argv[2]:
#     print(next(inputfile))
# else:
#     rows=[r for r in inputfile]
#     print(rows[int(sys.argv[2])])