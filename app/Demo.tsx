"use client";

import { enturClient } from "@/apollo-client";
import { gql, useQuery } from "@apollo/client";
// import createEnturClient from "@entur/sdk";
import { useEffect, useState } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { Quay } from "./Quay";

// const enturClient = createEnturClient({
//   clientName: "awesomecompany-awesomeapp",
// });

function getStopPlaceGql(id: string) {
  /*
	estimatedCalls(timeRange: 72100, numberOfDepartures: 5) {
          realtime
          aimedArrivalTime
          aimedDepartureTime
          expectedArrivalTime
          expectedDepartureTime
          actualArrivalTime
          actualDepartureTime
          date
          forBoarding
          forAlighting
          destinationDisplay {
            frontText
          }
          quay {
            id
          }
          serviceJourney {
            journeyPattern {
              line {
                id
                name
                transportMode
              }
            }
          }
        }
				*/
  return gql`
    {
      stopPlace(id: "NSR:StopPlace:${id}") {
        id
        name
				quays {
					id
				}
        
      }
    }
  `;
}

export default function Demo() {
  // const { data, loading, error } = enturClient.query({
  const { data: VestreHaugenData } = useQuery(getStopPlaceGql("5634"), {
    client: enturClient,
  });

  console.log(
    "VestreHaugenData",
    VestreHaugenData,
    VestreHaugenData?.stopPlace.quays
  );

  // NSR:Quay:7220
  useEffect(() => {
    //     enturClient
    //       .queryJourneyPlanner(
    // `{trip(from:{place:"NSR:StopPlace:58404"}to:{place:"NSR:StopPlace:59872"}modes:{directMode:foot transportModes:[]}){tripPatterns{duration walkDistance legs{expectedStartTime expectedEndTime mode distance line{id publicCode}}}}}`,
    //         {}
    //       )
    //       .then((data) => {
    //         console.log(data);
    //       });
  }, []);

  return (
    <div>
      {/* <p>{VestreHaugenData?.stopPlace?.name}</p>
      {VestreHaugenData?.stopPlace?.estimatedCalls.map((call: any) => {
        return (
          <div
            key={
              call.expectedDepartureTime +
              call.serviceJourney.journeyPattern.line.name
            }
            className="call-element"
          >
            <p>{call.serviceJourney.journeyPattern.line.name}</p>
            <p>{call.destinationDisplay.frontText}</p>
            <p>
              {differenceInMinutes(
                new Date(call.expectedDepartureTime),
                new Date()
              )}{" "}
              min
            </p>
          </div>
        );
      })}
      <h1>Quays</h1> */}
      <Quay
        quayIds={VestreHaugenData?.stopPlace.quays.map((quay: any) => quay.id)}
      />
    </div>
  );
}
