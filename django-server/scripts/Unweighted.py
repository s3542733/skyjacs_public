from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import urllib.request
import json

SLIPON_REL = {
	'Slip On' : 5 ,
	'Low Top' : 4 ,
	'Skaters' : 4 ,
	'Cageless' : 3 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 2 ,
	'Basketball' : 1,
}

LOWTOP_REL = {
	'Slip On' : 4 ,
	'Low Top' : 5 ,
	'Skaters' : 3 ,
	'Cageless' : 3 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 1 ,
	'Basketball' : 3,
}

HIGHTOP_REL = {
	'Slip On' : 2 ,
	'Low Top' : 2 ,
	'Skaters' : 3 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 5 ,
	'Basketball' : 4,
}

SKATERS_REL = {
	'Slip On' : 3 ,
	'Low Top' : 4 ,
	'Skaters' : 5 ,
	'Cageless' : 2 ,
	'Runners/Joggers' : 2 ,
	'High Top' : 3 ,
	'Basketball' : 2,
}

RUNNERSJOGGERS_REL = {
	'Slip On' : 2 ,
	'Low Top' : 4 ,
	'Skaters' : 3 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 5 ,
	'High Top' : 3 ,
	'Basketball' : 4,
}

BASKETBAL_REL = {
	'Slip On' : 1 ,
	'Low Top' : 3 ,
	'Skaters' : 2 ,
	'Cageless' : 4 ,
	'Runners/Joggers' : 4 ,
	'High Top' : 3 ,
	'Basketball' : 5,
}

CAGELESS_REL = {
	'Slip On' : 3 ,
	'Low Top' : 3 ,
	'Skaters' : 1 ,
	'Cageless' : 5 ,
	'Runners/Joggers' : 3 ,
	'High Top' : 4 ,
	'Basketball' : 4,
}

TYPEOPTS = {
	'Slip On' : SLIPON_REL ,
	'Low Top' : LOWTOP_REL ,
	'Skaters' : SKATERS_REL ,
	'Cageless' : CAGELESS_REL ,
	'Runners/Joggers' : RUNNERSJOGGERS_REL ,
	'High Top' : HIGHTOP_REL ,
	'Basketball' : BASKETBAL_REL,
}

CONDITIONOPTS = {
	'Damaged' : 1,
	'Well-worn' : 2,
	'Good Condition' : 3,
	'New/Little use' : 4,
	'Boxed Mint' : 5,
}

def matchType(pkSpec, dbSpec):

	dbSpecRelValue = TYPEOPTS[pkSpec][dbSpec]
	
	return (dbSpecRelValue/5) * 100	

def matchSex(pkSpec, dbSpec):

	if pkSpec == dbSpec:
		return 100
	elif 'Unisex' in [pkSpec, dbSpec]:
		return 50
	else:
		return 0

def matchBrand(pkSpec, dbSpec):

	if pkSpec != dbSpec:
		return 0
	else:
		return 100
	
def matchModel(pkSpec, dbSpec):
	
	return (fuzz.partial_ratio(pkSpec, dbSpec) + fuzz.token_sort_ratio(pkSpec, dbSpec) + fuzz.ratio(pkSpec, dbSpec))/3
	
def matchCondition(pkSpec, dbSpec):

	pkSpecVal = CONDITIONOPTS[pkSpec]
	dbSpecVal = CONDITIONOPTS[dbSpec]

	if pkSpecVal == dbSpecVal:
		return 100
	elif pkSpecVal > dbSpecVal:
		return 100 - ((pkSpecVal - dbSpecVal)/5 * 100)
	elif pkSpec < dbSpec:
		return 100 - ((dbSpecVal - pkSpecVal)/5 * 100)

def matchMaterial(pkSpec, dbSpec,):

	if pkSpec == dbSpec:
		return 100
	else:
		return 0
	
def matchColour(pkSpec, dbSpec):

	return (fuzz.token_sort_ratio(pkSpec, dbSpec))
	
def matchSize(pkSpec, dbSpec):

	if pkSpec == dbSpec:
		return 100
	elif pkSpec > dbSpec:
		diff = pkSpec - dbSpec
		return 100 - (diff/13.5 * 100)
	elif pkSpec < dbSpec:
		diff = dbSpec - pkSpec
		return 100 - (diff/13.5 * 100)


dbSpecs = json.load(urllib.request.urlopen("http://127.0.0.1:8000/listings/"))
pkSpec = json.load(urllib.request.urlopen("http://127.0.0.1:8000/listings/1/"))

for dbSpec in dbSpecs:
	if dbSpec['uid'] != pkSpec['uid']:
		if dbSpec['listing_type'] != pkSpec['listing_type']:
			typePc = matchType(dbSpec['item_type'], pkSpec['item_type'])
			sexPc = matchSex(dbSpec['item_sex'], pkSpec['item_sex'])
			brandPc = matchBrand(dbSpec['item_brand'], pkSpec['item_brand'])
			modelPc = 0
			if brandPc == 100:
				modelPc = matchModel(dbSpec['item_model'], pkSpec['item_model'])
			colourPc = matchColour(dbSpec['item_colour'], pkSpec['item_colour'])
			conditionPc = matchCondition(dbSpec['item_condition'], pkSpec['item_condition'])
			materialPc = matchMaterial(dbSpec['item_material'], pkSpec['item_material'])
			sizePc = matchSize(dbSpec['item_size'], pkSpec['item_size'])
			print(typePc, sexPc, brandPc, modelPc, 
			colourPc, conditionPc, materialPc, sizePc)
			totalPc = (typePc + sexPc + brandPc + modelPc + 
			colourPc + conditionPc + materialPc + sizePc)/8
			dbSpec['item_matching'] = totalPc


for dbSpec in dbSpecs:
	print(dbSpec['item_matching'])