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
  // const { data: VestreHaugenData } = useQuery(getStopPlaceGql("5634"), {
  const { data: VestreHaugenData } = useQuery(getStopPlaceGql("359"), {
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
      {/* {VestreHaugenData && (
        <Quay
          quayIds={VestreHaugenData?.stopPlace.quays.map(
            (quay: any) => quay.id
          )}
        />
      )} */}
      {/*Vestre Haugen */}
      <Quay quayIds={["NSR:Quay:10319", "NSR:Quay:10320"]} />
      {/*Stjerneblokkveien */}
      <Quay
        quayIds={[
          "NSR:Quay:10327",
          // "NSR:Quay:10326",
          // "NSR:Quay:10325",
          "NSR:Quay:102928",
        ]}
      />
      {/*Gransletta  */}
      <Quay quayIds={["NSR:Quay:10317", "NSR:Quay:10316"]} />
    </div>
  );
}
