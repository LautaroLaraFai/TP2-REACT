import MainLayout from "../../layouts/MainLayout.jsx";
import GameCardLarge from "../../components/GameCardLarge/GameCardLarge.jsx"
import { useTranslation } from "react-i18next";
import Section from "../../layouts/Section.jsx"
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../layouts/Loader/Loader.jsx"
import usePageOfData from "../../hooks/usePageOfData.jsx"
import CardGrid from "../../components/CardGrid/CardGrid.jsx"
import useFavorite from "../../hooks/useFavorite.jsx";

export default function Home () {

  const { t } = useTranslation()

  const { games, fetchData, hasMore, frontPageGame } = usePageOfData();
  const { toggleFavorite, isFavorite } = useFavorite()
  
  return (
    <MainLayout>
    <InfiniteScroll
      dataLength={games.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="w-full h-10 px-auto flex justify-center items-center overflow-hidden mb-5">
          <Loader/>
        </div>
      }
      endMessage={
        <div className="text-a-amber text-2xl w-full flex justify-center mt-5 mb-20">
          {t("home.seenAllText")}
        </div>
      }
    >
      {/* Front Page Game */}
      <Section>
        {frontPageGame && (
          
          <GameCardLarge
            key={frontPageGame?.id}
            gameId={frontPageGame?.id}
            name={frontPageGame?.Name}
            description={frontPageGame?.Description}
            price={frontPageGame?.Price}
            image={frontPageGame?.Image}
            onClick={() => toggleFavorite(frontPageGame?.id)}
            isFavorite={isFavorite(frontPageGame?.id)} 
          />
        )}

      </Section>

      <Section
        title={t("home.recommendations")}
      >
        <CardGrid 
          games={games}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </Section>

    </InfiniteScroll>
    </MainLayout>
  );
};