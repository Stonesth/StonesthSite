import React from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Link } from '@mui/material';

const MicrosoftOffice: React.FC = () => {
  const sections = [
    { id: 'options', label: '1. Options d\'achat' },
    { id: 'comparaison', label: '2. Comparaison des avantages' },
    { id: 'conseils', label: '3. Conseils pour le choix' },
    { id: 'etudiants', label: 'Solutions pour étudiants' },
    { id: 'sources', label: 'Sources' }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Date de publication : 4 janvier 2025
        </Typography>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Microsoft Office : quelle solution choisir ?
      </Typography>

      {/* Menu de navigation */}
      <Paper sx={{ p: 2, mb: 4, bgcolor: 'background.paper' }}>
        <Typography variant="subtitle1" gutterBottom>
          Navigation rapide :
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {section.label}
            </Link>
          ))}
        </Box>
      </Paper>

      <Typography variant="body1" paragraph>
        Voici une présentation des différentes options disponibles pour Microsoft Office, avec leurs avantages, 
        afin de vous aider à choisir celle qui convient le mieux à vos besoins.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }} id="etudiants">
        Focus : Solutions pour un étudiant de 14 ans
      </Typography>
      <Box sx={{ pl: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          <Link 
            href="https://www.microsoft.com/fr-be/education/products/office?wt.mc_id=StudentandEducators_cat_banner1_office365free" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Option 1 : Microsoft Office Gratuit pour Étudiants
          </Link>
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Pour les étudiants ayant une adresse email scolaire (@ecole.be, @student.be, etc.), Microsoft propose une version gratuite de Microsoft 365.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Cette version inclut :
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li">Les applications Office en ligne</Typography>
            <Typography component="li">1 To de stockage OneDrive</Typography>
            <Typography component="li">Microsoft Teams</Typography>
            <Typography component="li">Outils de collaboration en temps réel</Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
          <Link 
            href="https://www.microsoft.com/fr-be/microsoft-365/p/microsoft-365-famille/cfq7ttc0k5dm?activetab=pivot:pr%C3%A9sentationtab" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Option 2 : Microsoft 365 Famille
          </Link>
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Si l'étudiant n'a pas d'adresse email scolaire, l'abonnement Microsoft 365 Famille est une excellente alternative :
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li">Jusqu'à 6 utilisateurs</Typography>
            <Typography component="li">1 To de stockage OneDrive par utilisateur</Typography>
            <Typography component="li">Applications Office complètes sur tous les appareils</Typography>
            <Typography component="li">Protection avancée contre les menaces en ligne</Typography>
            <Typography component="li">Partage familial facilité</Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }} id="options">
        1. Options d'achat de Microsoft Office
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Version en ligne gratuite
      </Typography>
      <Box sx={{ mb: 4, pl: 2 }}>
        <Typography variant="body1" paragraph>
          Microsoft propose une version gratuite de ses applications Office directement dans le navigateur web.
          Cette version en ligne permet d'utiliser Word, Excel, PowerPoint et OneNote gratuitement, avec la possibilité 
          de stocker vos documents dans OneDrive.
        </Typography>
        <Typography variant="body1">
          Accédez à la version en ligne gratuite : {' '}
          <Link 
            href="https://m365.cloud.microsoft/" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Microsoft 365 pour le Web
          </Link>
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Achat unique (versions perpétuelles)
      </Typography>
      <Box component="ul">
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Office Famille 2024</strong> : {' '}
          <Link 
            href="https://www.microsoft.com/fr-be/microsoft-365/p/office-famille-2024/cfq7ttc0pqvj" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            149€ (paiement unique)
          </Link>
          . Inclut Word, Excel, PowerPoint et OneNote pour PC ou Mac. 
          Installation sur un seul appareil, idéal pour un usage familial.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Office Famille et Petite Entreprise</strong> : {' '}
          <Link 
            href="https://www.microsoft.com/fr-be/microsoft-365/get-started-with-office-2021?market=be" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            299€ (paiement unique)
          </Link>
          . Version complète incluant Outlook et des fonctionnalités avancées.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Office Professionnel</strong> : {' '}
          <Link 
            href="https://proset-office.com/fr-eu/products/office-2021-professionnel" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            94,99€ (paiement unique)
          </Link>
          . Version complète incluant Access et Publisher.
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Abonnements Microsoft 365
      </Typography>
      <Box component="ul">
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Microsoft 365 Personnel</strong> : Un utilisateur, jusqu'à cinq installations (PC/Mac/tablette). 
          Inclut Word, Excel, PowerPoint, Outlook, OneDrive (1 To) et des mises à jour continues.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Microsoft 365 Famille</strong> : Jusqu'à six utilisateurs avec les mêmes avantages que la version Personnel. 
          Idéal pour les familles.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Microsoft 365 Business Standard</strong> : Conçu pour les petites entreprises, 
          inclut des outils collaboratifs comme Teams, SharePoint et Exchange.
        </Typography>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }} id="comparaison">
        2. Comparaison des avantages
      </Typography>

      <Paper sx={{ mt: 2, mb: 4, overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Caractéristique</strong></TableCell>
              <TableCell><strong>Version Web Gratuite</strong></TableCell>
              <TableCell><strong>Achat unique (Office 2021)</strong></TableCell>
              <TableCell><strong>Abonnement (Microsoft 365)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Coût initial</TableCell>
              <TableCell>Gratuit</TableCell>
              <TableCell>Paiement unique</TableCell>
              <TableCell>Paiement mensuel ou annuel</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mises à jour</TableCell>
              <TableCell>Automatiques</TableCell>
              <TableCell>Pas de nouvelles fonctionnalités après achat</TableCell>
              <TableCell>Mises à jour régulières incluses</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Applications incluses</TableCell>
              <TableCell>Versions web de Word, Excel, PowerPoint, OneNote</TableCell>
              <TableCell>Varient selon l'édition (Word, Excel, PowerPoint...)</TableCell>
              <TableCell>Inclut toujours les dernières versions des applications</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Collaboration en ligne</TableCell>
              <TableCell>Oui</TableCell>
              <TableCell>Limité</TableCell>
              <TableCell>Collaboration en temps réel via OneDrive et Teams</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stockage cloud</TableCell>
              <TableCell>5 Go avec OneDrive gratuit</TableCell>
              <TableCell>Non inclus</TableCell>
              <TableCell>1 To sur OneDrive par utilisateur</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Installation sur plusieurs appareils</TableCell>
              <TableCell>Accessible depuis n'importe quel navigateur</TableCell>
              <TableCell>Généralement limité à un appareil</TableCell>
              <TableCell>Jusqu'à 5 appareils par utilisateur</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }} id="conseils">
        3. Conseils pour le choix
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Recommandations générales
      </Typography>
      <Box component="ul">
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Pour un usage personnel ou étudiant</strong> : Microsoft Office Famille et Étudiant ou Microsoft 365 Personnel.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Pour une famille ou plusieurs utilisateurs</strong> : Microsoft 365 Famille.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Pour un usage professionnel avancé</strong> : Office Professionnel ou Microsoft 365 Business Standard.
        </Typography>
        <Typography component="li" sx={{ mb: 1 }}>
          <strong>Pour des besoins collaboratifs réguliers</strong> : Privilégier un abonnement Microsoft 365.
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }} id="sources">
        Sources
      </Typography>
      <Box component="ol" sx={{ pl: 2 }}>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-fr/education/products/office" target="_blank" rel="noopener noreferrer">
            Office 365 gratuit pour les étudiants et les enseignants - Microsoft
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.lesnumeriques.com/appli-logiciel/microsoft-office-2021-p62145.html" target="_blank" rel="noopener noreferrer">
            Microsoft Office 2021 Famille et Etudiant : meilleur prix et actualités
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-be/education/students" target="_blank" rel="noopener noreferrer">
            Technologie et logiciels gratuits pour les étudiants (Microsoft Office)
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-be/microsoft-365/p/microsoft-365-famille/cfq7ttc0k5dm" target="_blank" rel="noopener noreferrer">
            Acheter Microsoft 365 Famille (anciennement Office 365)
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-ca/store/b/student" target="_blank" rel="noopener noreferrer">
            Microsoft Education Store : remises et offres pour les étudiants
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-be/microsoft-365/buy/microsoft-365" target="_blank" rel="noopener noreferrer">
            Acheter des abonnements Microsoft 365 Famille et Personnel
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-fr/store/b/student" target="_blank" rel="noopener noreferrer">
            Rentrée scolaire 2024 et réductions étudiants | Microsoft Store
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-be/microsoft-365/p/office-famille-2024/cfq7ttc0pqvj" target="_blank" rel="noopener noreferrer">
            Acheter Office Famille 2024 pour PC ou Mac
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://www.microsoft.com/fr-be/microsoft-365/p/microsoft-365-basic/cfq7ttc0ktxs" target="_blank" rel="noopener noreferrer">
            Offre et prix de Microsoft 365 Basic (comprend 100 Go de stockage)
          </Link>
        </Typography>
        <Typography component="li" variant="body2" sx={{ mb: 1 }}>
          <Link href="https://m365.cloud.microsoft/" target="_blank" rel="noopener noreferrer">
            Microsoft 365 pour le Web - Version gratuite des applications Office
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default MicrosoftOffice;
