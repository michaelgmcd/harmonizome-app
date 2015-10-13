import urllib.request
from json import loads, dump
from sys import stdout

geneNameUrl = 'http://amp.pharm.mssm.edu/Enrichr/json/genemap.json'
gnSetup = urllib.request.urlopen(geneNameUrl)
gnRead = gnSetup.read()
gnInfo = gnSetup.info()
gnData = loads(gnRead.decode(gnInfo.get_param('charset') or 'utf-8'))

totalArr = []
currPercent = ''
gnDict = {}

for index, name in enumerate(gnData):
    setupUrl = 'http://localhost:8080/Enrichr/genemap?gene=' + name + \
        '&json=true'
    setup = urllib.request.urlopen(setupUrl)
    gRead = setup.read()
    gInfo = setup.info()
    geneData = loads(gRead.decode(gInfo.get_param('charset') or 'utf-8'))

    # geneInfoUrl = 'http://amp.pharm.mssm.edu/Harmonizome/api/1.0/gene/' + \
    #     name + '?min=true'
    # geneInfo = urllib.request.urlopen(geneInfoUrl)
    # read = geneInfo.read()
    # info = geneInfo.info()
    # jsonInfo = loads(read.decode(info.get_param('charset') or 'utf-8'))
    gnDict[name] = geneData['gene']
    # gnDict[name]['info'] = jsonInfo
    percent = format((index + 1) / len(gnData), '.4f') + '%'
    stdout.write('\r%s' % percent)
    stdout.flush()
stdout.write('\n')
with open('geneNames.json', 'w+') as gNames:
    dump(gnDict, gNames)
