import urllib.request
import json

geneNameUrl = 'http://localhost:8080/Enrichr/json/genemap.json'
gnSetup = urllib.request.urlopen(geneNameUrl)
gnData = json.loads(gnSetup.read().decode(gnSetup.info().get_param('charset') or 'utf-8'))

totalArr = []
currPercent = ''

for index, name in enumerate(gnData):
  setupUrl = 'http://localhost:8080/Enrichr/genemap?gene=' + name + \
    '&json=true'
  setup = urllib.request.urlopen(setupUrl)
  geneData = json.loads(setup.read().decode(setup.info().get_param('charset') or 'utf-8'))

  geneInfoUrl = 'http://localhost:8090/Harmonizome/api/1.0/gene/' + \
    name + '?min=true'
  geneInfo = urllib.request.urlopen(geneInfoUrl)
  info = json.loads(geneInfo.read().decode(geneInfo.info().get_param('charset') or 'utf-8'))

  gnDict = {}
  gnDict[name] = geneData['gene']
  gnDict[name]['info'] = info
  percent = str(int((index + 1) / len(gnData))) + '%'
  if currPercent != percent:
    currPercent = percent
    print(currPercent)

with open('geneNames.json', 'w+') as gNames:
  json.dump(gnDict, gNames)

