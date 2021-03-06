import React, { useState } from 'react';
import Head from 'next/head';
import NavBar from '../app/components/navbar';
import Footer from '../app/components/footer';
import '../firebase/client';
import styles from '../app/styles/index.module.css';
import MatchCard from '../app/components/match_card';

export async function getStaticProps() {
  const protocol = process.env.HOST_NAME == 'localhost:3000' ? 'http' : 'https';
  const response = await fetch(`${protocol}://${process.env.HOST_NAME}/api/matches`);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      matches: data.statusCode !== 400 ? data.matches : [],
    },
  };
}

const Home = ({ matches }) => {
  const [matchess, setMatches] = useState(matches);
  const onChangeSearcher = (val) => {
    const query: string = val.target.value;
    setMatches(
      matches.filter((elem) => {
        return (
          (elem['awayTeam']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          (elem['homeTeam']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          (elem['competition']['name'] as string).toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      }),
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Luxxon - Inicio</title>
      </Head>
      <NavBar onChange={onChangeSearcher} />
      <main className={styles.main}>
        <h2 className={styles.title}>Calendario de partidos</h2>
        <section className={styles.cards_container}>
          {matchess?.map((match) => (
            <MatchCard
              key={match.id}
              id={match.id}
              utcDate={match.utcDate}
              competition={match.competition.name}
              homeTeamName={match.homeTeam.shortName}
              homeTeamImageUrl={match.homeTeam.crestUrl}
              awayTeamImageUrl={match.awayTeam.crestUrl}
              awayTeamName={match.awayTeam.shortName}
              status={match.status === 'IN_PLAY' || match.status === 'FINISHED' ? match.status : 'SCHEDULED'}
              match={match}
            />
          ))}
        </section>
        <Footer />
      </main>
    </React.Fragment>
  );
};
export default Home;
