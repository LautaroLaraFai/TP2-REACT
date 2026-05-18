import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import logo from "../../../public/Logo.png"
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const COLORS = {
  pageBg: '#474843',
  cardBg: '#252525',
  infoBg: '#2F302B',
  text: '#E7E8C6',
  textMuted: '#999A86',
  border: '#E7E8C6',
  gold: '#ca3500',
  goldEmpty: '#7c2506',
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: COLORS.pageBg,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.text,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  gameImage: {
    width: 260,
    height: 180,
    borderRadius: 8,
  },
  infoBox: {
    flex: 1,
    backgroundColor: COLORS.infoBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 14,
  },
  infoTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    width: 90,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 10,
    color: COLORS.text,
    flex: 1,
  },
  infoValueBold: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: 'bold',
    flex: 1,
  },
  starsRow: {
    flexDirection: 'row',
    flex: 1,
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  descriptionText: {
    fontSize: 10,
    color: COLORS.textMuted,
    lineHeight: 1.6,
  },
});

const StarRating = ({ rating }) => {
  const total = 5;
  const filled = Math.round(rating);
  return (
    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: 10,
            backgroundColor: i < filled ? COLORS.gold : COLORS.goldEmpty,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
};

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
        <View style={styles.card}>

          <View style={styles.header}>
            <Image src={logo} style={styles.headerIcon} />
            <Text style={styles.headerTitle}>MAETS</Text>
          </View>

          <View style={styles.contentRow}>
            {/* {game.Image && (
              <Image src={game.Image} style={styles.gameImage} />
            )} */}
            {game.Image && (
              <Image src={`/api/image-proxy?url=${encodeURIComponent(game.Image)}`} style={styles.gameImage} />
            )}

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{game.Name}</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Precio:</Text>
                <Text style={styles.infoValueBold}>${game.Price}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Desarrolladora:</Text>
                <Text style={styles.infoValue}>{game.Developer}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fecha de salida:</Text>
                <Text style={styles.infoValue}>{game.ReleaseDate}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rating:</Text>
                <StarRating rating={game.Rating} />
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Géneros:</Text>
                <Text style={styles.infoValue}>{game.Genres?.join(', ')}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.descriptionText}>{game.Description}</Text>
        </View>
      </Page>
    </Document>
  );
};

export const PDFDownloadButton = ({ game }) => {
  const { t } = useTranslation();

  if (!game) {
    return null
  }
  return (
    <PDFDownloadLink
      document={<GamePDF game={game} />}
      fileName={`${game?.Name || 'juego'}.pdf`}
    >
      {({ loading }) => (
        <button className="px-wrap-sm text-p-bg cursor-pointer">
          <div className="px-border-sm bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
            <div
              className="
                px-inner-sm flex items-center gap-2 tracking-[.02em]
                lg:text-[1.3em] md:text-[1.1em] sm:text-[0.9em] max-sm:text-[0.8em]
                bg-a-amber hover:bg-a-darkamber active:bg-a-lime text-p-bg
                lg:px-3 lg:py-2 md:px-2.5 md:py-1.5 max-md:px-3 max-md:py-2
              "
            >
            {loading ? t("detail.pdf.state.generating") : t("detail.pdf.state.completed")}
          </div>
        </button>
      )}
    </PDFDownloadLink>
  );
};