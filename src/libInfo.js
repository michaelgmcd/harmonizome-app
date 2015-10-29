module.exports = {
  'ChEA': {
    description: 'ChEA contains results from transcription factor ChIP-seq studies extracted from supporting materials of publications. Each entry has the transcription factor, PMID, cell type and organism. A peak at the promoter of gene {0} was detected in each study.',
    idName: 'PubMed ID',
    baseUrl: 'http://www.ncbi.nlm.nih.gov/pubmed/?term='
  },
  'TRANSFAC and JASPAR PWMs': {
    description: 'Using the PWM from TRANSFAC and JASPAR the binding motifs were detected at the promoter of gene {0}.',
    idName: '',
    baseUrl: ''
  },
  'Genome Browser PWMs': {
    description: 'Using a published list from the UCSC Genome Browser, gene {0} was associated with these binding motifs.',
    idName: '',
    baseUrl: ''
  },
  'Epigenomics Roadmap HM ChIP-seq': {
    description: 'Processed ChIP-seq data from the Epigenomics Roadmap project to associate detected peaks near genes.',
    idName: '',
    baseUrl: ''
  },
  'TargetScan microRNA': {
    description: 'Computationally predicted targets for microRNAs.',
    idName: '',
    baseUrl: ''
  },
  'ENCODE TF ChIP-seq 2015': {
    description: 'Processed ChIP-seq data from the ENCODE project to associate detected peaks near genes.',
    idName: '',
    baseUrl: ''
  },
  'TF-LOF Expression from GEO': {
    description: 'Gene expression signatures extracted from the GEO database for transcription factor perturbations.',
    idName: 'Accession Number',
    baseUrl: 'http://www.ncbi.nlm.nih.gov/sites/GDSbrowser?acc='
  },
  'ENCODE Histone Modifications 2015': {
    description: 'Processed ChIP-seq data from the ENCODE project to associate detected peaks near genes.',
    idName: '',
    baseUrl: ''
  },
  'Transcription Factor PPIs': {
    description: 'Protein-protein interactions for transcription factors extracted from several literature-based databases.',
    idName: '',
    baseUrl: ''
  },
  'KEGG 2015': {
    description: 'KEGG\'s cell signaling pathway database.',
    idName: '',
    baseUrl: ''
  },
  'WikiPathways 2015': {
    description: 'WikiPathways\'s cell signaling pathway database.',
    idName: '',
    baseUrl: ''
  },
  'Reactome 2015': {
    description: 'Reactome\'s cell signaling pathway database.',
    idName: '',
    baseUrl: ''
  },
  'BioCarta 2015': {
    description: 'Metabolic pathways from BioCarta.',
    idName: '',
    baseUrl: ''
  },
  'PPI Hub Proteins': {
    description: 'Protein-protein interactions for proteins with more than 50 known partners extracted from several literature-based databases.',
    idName: '',
    baseUrl: ''
  },
  'KEA 2015': {
    description: 'Kinase enrichment analysis (KEA) database of kinase-substrate interactions extracted from literature.',
    idName: '',
    baseUrl: ''
  },
  'NURSA Human Endogenous Complexome': {
    description: 'Protein complexes identified by IP-MS mass spec by the NURSA project.',
    idName: '',
    baseUrl: ''
  },
  'CORUM': {
    description: 'Protein complexes identified by mass spec from the CORUM database.',
    idName: '',
    baseUrl: ''
  },
  'SILAC Phosphoproteomics': {
    description: 'Up and down differentially phosphorylated phosphosites extracted from SILAC phosphoproteomics experiments.',
    idName: '',
    baseUrl: ''
  },
  'Kinase Perturbations from GEO': {
    description: 'Gene expression signatures extracted from the GEO database for kinase gene perturbations.',
    idName: '',
    baseUrl: ''
  },
  'Kinase Perturbations from L1000': {
    description: 'Metabolic pathways from Kinase Perturbations from L1000.',
    idName: '',
    baseUrl: ''
  },
  'Phosphatase Substrates from DEPOD': {
    description: 'Phosphatase-substrate interactions from the DEPOD database.',
    idName: '',
    baseUrl: ''
  },
  'HumanCyc': {
    description: 'Metabolic pathways from HumanCyc.',
    idName: '',
    baseUrl: ''
  },
  'NCI-Nature': {
    description: 'Cell signaling pathways from NCI-Nature pathway database.',
    idName: '',
    baseUrl: ''
  },
  'Panther': {
    description: 'Metabolic and cell signaling pathways from the Panther database.',
    idName: '',
    baseUrl: ''
  },
  'GO Biological Process': {
    description: 'Gene Ontology Biological Processes where the ontology tree was cut at an intermediate level to generate gene sets',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'GO Cellular Component': {
    description: 'Gene Ontology Cellular Components where the ontology tree was cut at an intermediate level to generate gene sets',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'GO Molecular Function': {
    description: 'Gene Ontology Molecular Functions where the ontology tree was cut at an intermediate level to generate gene sets',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'MGI Mammalian Phenotype Level 3': {
    description: 'Knockout mouse phenotypes organized into an ontology. ',
    idName: 'MP',
    baseUrl: 'http://www.informatics.jax.org/searches/Phat.cgi?id=MP:'
  },
  'MGI Mammalian Phenotype Level 4': {
    description: 'Knockout mouse phenotypes organized into an ontology that is cut at level 3 of the. ',
    idName: 'MP',
    baseUrl: 'http://www.informatics.jax.org/searches/Phat.cgi?id=MP:'
  },
  'Human Phenotype Ontology': {
    description: 'HPO is an effort to organize human phenotypes into an ontology.',
    idName: '',
    baseUrl: ''
  },
  'CMAP up': {
    description: 'The top 500 up-regulated genes from the Old Connectivity map gene rank table.',
    idName: '',
    baseUrl: ''
  },
  'CMAP down': {
    description: 'The top 500 down-regulated genes from the Old Connectivity map gene rank table.',
    idName: '',
    baseUrl: ''
  },
  'GeneSigDB': {
    description: 'The entire GeneSigDB database from the Broad.',
    idName: '',
    baseUrl: ''
  },
  'OMIM Disease': {
    description: 'The OMIM database listing gene associated with human diseases. ',
    idName: '',
    baseUrl: ''
  },
  'OMIM Expanded': {
    description: 'Protein-protein interaction networks that connect disease genes from OMIM.',
    idName: '',
    baseUrl: ''
  },
  'VirusMINT': {
    description: 'Human genes that are known to physically interact with viral genes.',
    idName: '',
    baseUrl: ''
  },
  'MSigDB Computational': {
    description: 'Modules of genes mined by processing cancer microarray data.',
    idName: '',
    baseUrl: ''
  },
  'MSigDB Oncogenic Signatures': {
    description: 'Cell signaling in cancer reconstructed from expression data.',
    idName: '',
    baseUrl: ''
  },
  'Virus Perturbations from GEO up': {
    description: 'Differentially expression genes before and after viral infection of mammalian cells.',
    idName: '',
    baseUrl: ''
  },
  'Virus Perturbations from GEO down': {
    description: 'Differentially expression genes before and after viral infection of mammalian cells.',
    idName: '',
    baseUrl: ''
  },
  'Achilles fitness increase': {
    description: 'Knockdown genes that increased cell viability of cancer cell lines from the Achillis project.',
    idName: '',
    baseUrl: ''
  },
  'Achilles fitness decrease': {
    description: 'Knockdown genes that decreased cell viability of cancer cell lines from the Achillis project.',
    idName: '',
    baseUrl: ''
  },
  'Human Gene Atlas': {
    description: 'Up regulated genes in human tissues from BioGPS.',
    idName: '',
    baseUrl: ''
  },
  'Mouse Gene Atlas': {
    description: 'Up regulated genes in mouse tissues from BioGPS.',
    idName: '',
    baseUrl: ''
  },
  'Cancer Cell Line Encyclopedia': {
    description: 'Up regulated genes across many cancer cell lines from CCLE.',
    idName: '',
    baseUrl: ''
  },
  'NCI-60 Cancer Cell Lines': {
    description: 'Up regulated genes across the NCI-60 panel of cancer cell lines.',
    idName: '',
    baseUrl: ''
  },
  'Tissue Protein Expression from ProteomicsDB': {
    description: 'Up regulated proteins in various human tissues.',
    idName: '',
    baseUrl: ''
  },
  'Tissue Protein Expression from Human Proteome Map': {
    description: 'Up regulated proteins in various human tissues from ProteomicsDB.',
    idName: '',
    baseUrl: ''
  },
  'Allen Brain Atlas up': {
    description: 'Down regulated genes across brain regions profiled by the Allen Brain Atlas.',
    idName: '',
    baseUrl: ''
  },
  'Allen Brain Atlas down': {
    description: 'Up regulated genes across brain regions profiled by the Allen Brain Atlas.',
    idName: '',
    baseUrl: ''
  },
  'ESCAPE': {
    description: 'Gene sets collected for the ESCAPE stem cell focused database.',
    idName: 'PubMed ID',
    baseUrl: 'http://www.ncbi.nlm.nih.gov/pubmed/?term='
  },
  'Chromosome Location': {
    description: 'Chromosome segment location of human genes.',
    idName: '',
    baseUrl: ''
  },
  'HMDB Metabolites': {
    description: 'Metabolites that interact with human genes.',
    idName: '',
    baseUrl: ''
  },
  'Pfam InterPro Domains': {
    description: 'Structural protein domains that are shared among proteins.',
    idName: '',
    baseUrl: ''
  },
  'HomoloGene': {
    description: 'Gene sets created based on their evolutionary age.',
    idName: '',
    baseUrl: ''
  },
  'Genes Associated with NIH Grants': {
    description: 'Gene set created by converting publications associated with NIH grants to genes using GeneRIF.',
    idName: '',
    baseUrl: ''
  },
  'KEGG 2013': {
    description: 'Legacy version of the KEGG pathways gene set library.',
    idName: '',
    baseUrl: ''
  },
  'WikiPathways 2013': {
    description: 'Legacy version of the WikiPathways gene set library.',
    idName: '',
    baseUrl: ''
  },
  'Reactome 2013': {
    description: 'Legacy version of the Reactome gene set library.',
    idName: '',
    baseUrl: ''
  },
  'BioCarta 2013': {
    description: 'Legacy version of the Biocarta pathways gene set library.',
    idName: '',
    baseUrl: ''
  },
  'ENCODE TF ChIP-seq 2014': {
    description: 'Legacy version of the ECONDE transcription factors gene set library.',
    idName: '',
    baseUrl: ''
  },
  'KEA 2013': {
    description: 'Legacy version of the Kinase Enrichment Analysis database gene set library.',
    idName: '',
    baseUrl: ''
  },
  'GO Biological Process 2013': {
    description: 'Legacy version of the GO biological process gene set library.',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'GO Cellular Component 2013': {
    description: 'Legacy version of the GO cellular component gene set library.',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'GO Molecular Function 2013': {
    description: 'Legacy version of the GO molecular functions gene set library.',
    idName: 'GO',
    baseUrl: 'http://amigo.geneontology.org/amigo/term/GO:'
  },
  'Drug Perturbations from GEO 2014': {
    description: 'Legacy version of the drug perturbation extracted from GEO gene set library.',
    idName: '',
    baseUrl: ''
  },
  'Disease Signatures from GEO up 2014': {
    description: 'Legacy version of the disease sigantures extracted from GEO down genes gene set library.',
    idName: '',
    baseUrl: ''
  },
  'Disease Signatures from GEO down 2014': {
    description: 'Legacy version of the disease sigantures extracted from GEO up genes gene set library.',
    idName: '',
    baseUrl: ''
  },
  'ENCODE Histone Modifications 2013': {
    description: 'Legacy version of the ENCODE histome modifications gene set library.',
    idName: '',
    baseUrl: ''
  },
  'MGI Mammalian Phenotype 2013': {
    description: 'Legacy version of the MGI mammalian phenotypes gene set library.',
    idName: 'MP',
    baseUrl: 'http://www.informatics.jax.org/searches/Phat.cgi?id=MP:'
  },
  'Disease Perturbations from GEO down': {
    description: 'Gene sets extarcted from GEO comparing normal vs. diseased tissues.',
    idName: '',
    baseUrl: ''
  },
  'Disease Perturbations from GEO up': {
    description: 'Gene sets extarcted from GEO comparing normal vs. diseased tissues.',
    idName: '',
    baseUrl: ''
  },
  'Drug Perturbations from GEO down': {
    description: 'Gene sets extarcted from GEO comparing cells before and after drug treatment.',
    idName: '',
    baseUrl: ''
  },
  'Drug Perturbations from GEO up': {
    description: 'Gene sets extarcted from GEO comparing cells before and after drug treatment.',
    idName: '',
    baseUrl: ''
  },
  'Single Gene Perturbations from GEO up': {
    description: 'Gene sets extarcted from GEO comparing cells before and after genetic manipulation of a single gene.',
    idName: '',
    baseUrl: ''
  },
  'Single Gene Perturbations from GEO down': {
    description: 'Gene sets extarcted from GEO comparing cells before and after genetic manipulation of a single gene.',
    idName: '',
    baseUrl: ''
  },
};
