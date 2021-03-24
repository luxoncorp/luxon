import React, { useState, useEffect } from 'react';
import styles from './match_details_layout.module.css';
import Image from 'next/image';
import { DateTime } from 'luxon';

const MatchDetails = () => {
  const [data, setData] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(JSON.parse(window.localStorage.getItem('detail')));
      console.warn(data);
    }
  }, []);

  const hour = DateTime.fromISO(data?.utcDate).setLocale('en-US').toFormat('t');

  return (
    <div>
      <h1 className={styles.title}>Información del partido</h1>
      <div className={styles.container}>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img className={styles.logoTeam} src={data?.homeTeam.crestUrl} alt='Home team`s logo' />
          </figure>
          <h2 className={styles.nameTeam}>{data?.homeTeam.name}</h2>
          <button className={styles.buttonVideoCall} type='button'>
            <figure className={styles.figure}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={50}
                height={50}
              />
            </figure>
          </button>
          <ul className={styles.containerPlayers}>
            {data?.homeTeam.squad.map((player) => (
              <li key={player.name}>
                <p className={styles.playerName}> {player.name}</p>
                <p className={styles.playerPosition}> {player.position}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.time}>
          <p className={styles.timeHour}>{hour}</p>
          <p className={styles.competition}>{data?.competition.name}</p>
        </div>
        <div className={styles.containerTeam}>
          <figure className={styles.containerLogoTeam}>
            <img className={styles.logoTeam} src={data?.awayTeam.crestUrl} alt='Away team`s logo' />
          </figure>
          <h2 className={styles.nameTeam}>{data?.awayTeam.name}</h2>
          <button className={styles.buttonVideoCall} type='button'>
            <figure className={styles.figure}>
              <Image
                src='/images/icons/videoConference.png'
                alt='Video conference with fans around the world'
                width={75}
                height={75}
              />
            </figure>
          </button>
          <ul className={styles.containerPlayers}>
            {data?.awayTeam.squad.map((player) => (
              <li key={player.name}>
                <p className={styles.playerName}> {player.name}</p>
                <p className={styles.playerPosition}> {player.position}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
