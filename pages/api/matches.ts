import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../utils/database";
import sameDate from "../../utils/sameDate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const matchesRef = db.collection("matches");
        const snapshot = await matchesRef.get();

        let docs = [];

        if (snapshot.docs.length > 0) {
          snapshot.forEach((doc) => {
            const documentDate = new Date(doc.data().utcDate);
            const currentDate = new Date();
            if (sameDate(currentDate, documentDate)) {
              docs.push(doc.data());
            }
          });
        }

        return res.status(200).json({
          statusCode: 200,
          total: docs.length,
          matches: docs,
        });
      } catch (e) {
        return res.status(400).json({
          statusCode: 400,
          error: e.message,
        });
      }
    case "POST":
      try {
        // List matches across (a set of) competitions.
        // Oficial information: www.football-data.org/documentation/api#match
        const response = await fetch(
          "http://api.football-data.org/v2/matches",
          {
            headers: {
              "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY,
            },
          }
        );

        const data = await response.json();

        data.matches.forEach(async (match) => {
          // Once it is confirmed that the document is not in the collection it will be added.
          if (
            !(await (await db.collection("matches").doc(`${match.id}`).get())
              .exists)
          ) {
            await db.collection("matches").doc(`${match.id}`).set(match);
          }
        });

        return res.status(201).json({
          statusCode: 201,
          message: "Today's matches have been saved.",
        });
      } catch (e) {
        return res.status(400).json({
          statusCode: 400,
          error: e.message,
        });
      }
  }
};