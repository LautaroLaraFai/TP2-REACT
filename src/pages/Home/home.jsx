import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import getData from "../../services/getData.js";
import GameCardSmall from "../../components/GameCardSmall/GameCardSmall.jsx"
import GameCardLarge from "../../components/GameCardLarge/GameCardLarge.jsx"
import { useTranslation } from "react-i18next";

export default function Home () {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getData().then((data) => setGames(data)).catch(console.error);
  }, []);

  const { t } = useTranslation()
  return (
    <MainLayout 
      games={games}
    >
      {/* Principal recomendado */}
      <section className="lg:px-20 md:px-14 sm:px-10 max-sm:px-6 pt-16 pb-20 max-sm:pt-12 max-sm:pb-16">
        <GameCardLarge
          key={"rellenar"}
          description="Star Wars Jedi: Fallen Order es un videojuego de acción y aventuras ambientado dentro del universo ideado por George Lucas, concretamente entre los episodios"
          image="https://static.wikia.nocookie.net/esstarwars/images/5/57/Fallen-Order-Box-Art.jpg/revision/latest/scale-to-width-down/1000?cb=20191020063836"
          price="60.968,75"
          name="Star Wars - The Fallen Order"
          alt={""}
          storeUrl="https://store.steampowered.com/..."
          onClick={""}
        />
      </section>


      {/* Todos los juegos */}
      <section className="w-full pt-0">
  
        <div className="border-t-2 border-a-amber">
          <div className="inline-block md:px-36 sm:px-10 max-sm:px-6 py-4 max-sm:py-2 border-b-2 border-r-2 border-a-amber rounded-br-lg">
            <h2 className="md:text-[1.8em] tracking-[.07em] text-a-red">
              {t("home.recommendations")}
            </h2>
          </div>
        </div>
  
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
          {games.map((game) => (
            <GameCardSmall
              key={game.id}
              image={game.Image}
              price={game.Price}
              name={game.Name}
              alt={game.Name}
              storeUrl="https://store.steampowered.com/..."
              onClick={""}
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
};