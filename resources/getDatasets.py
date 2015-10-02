import urllib.request
import json

setupUrl = 'http://amp.pharm.mssm.edu/Enrichr/genemap?gene=DOM3Z&json=true\
&setup=true&_=1442611548980'
setup = urllib.request.urlopen(setupUrl)
data = json.loads(setup.read().decode(setup.info().get_param('charset') or 'utf-8'))

datasetUrl = 'http://amp.pharm.mssm.edu/Enrichr/datasetStatistics'
dsSetup = urllib.request.urlopen(datasetUrl)
dsData = json.loads(dsSetup.read().decode(dsSetup.info().get_param('charset') or 'utf-8'))

with open('dataset-info.txt', 'w+') as info:
  for cat in data['categories']:
    line = cat['name'] + '\n'
    for lib in cat['libraries']:
      for secondLib in dsData['statistics']:
        if lib['name'] == secondLib['libraryName']:
          line += lib['name'] + '\t' + lib['format'] + '\t' + \
            secondLib.get('link', '') + '\n'
    info.write(line)

