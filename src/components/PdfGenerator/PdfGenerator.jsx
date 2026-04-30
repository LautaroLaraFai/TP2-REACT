import { Document, Page, Text, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    color: '#E7E8C6',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E7E8C6',
    marginTop: 10,
  },
  value: {
    fontSize: 12,
    color: '#E7E8C6',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#5AB65A',
    marginTop: 10,
  },
  screenshot: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    marginBottom: 10,
  },
});

const GamePDF = ({ game }) => {
  const { t } = useTranslation();
  
  if (!game) {
    return (
      <Document>
        <Page>
          <Text>{t("detail.pdf.state.loading")}</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {game.Image && (
          <Image 
            src={game.Image}  
            style={styles.image}
          />
        )}
        
        <Text style={styles.title}>{game.Name}</Text>
        
        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.price}>${game.Price}</Text>
        
        <Text style={styles.label}>Desarrollador:</Text>
        <Text style={styles.value}>{game.Developer}</Text>
        
        <Text style={styles.label}>Fecha de lanzamiento:</Text>
        <Text style={styles.value}>{game.ReleaseDate}</Text>
        
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{game.Rating} / 5</Text>
        
        <Text style={styles.label}>Capturas de pantalla:</Text>
        {game.Screenshots && game.Screenshots.map((screenshot, idScreenshot) => (
          <Image 
            key={idScreenshot} 
            src={screenshot} 
            style={styles.screenshot}
          />
        ))}
        
        <Text style={styles.label}>Géneros:</Text>
        <Text style={styles.value}>{game.Genres?.join(', ')}</Text>
        
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{game.Description}</Text>
      </Page>
    </Document>
  );
};



export const PDFDownloadButton = ({ game }) => {
  const { t } = useTranslation();
  
  return (
    <PDFDownloadLink
      document={<GamePDF game={game} />}
      fileName={`${game?.Name || 'juego'}.pdf`}
    >
      {({ loading }) => (
        <button className="bg-a-amber text-p-bg px-4 py-2 rounded cursor-pointer">
          {loading ? t("detail.pdf.state.generating") : t("detail.pdf.state.completed")}
        </button>
      )}
    </PDFDownloadLink>
  );
};