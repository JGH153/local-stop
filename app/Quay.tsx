"use client";

import { enturClient } from "@/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { differenceInMinutes } from "date-fns";

// id format: NSR:Quay:10319
function getQuayStopGql(ids: string[]) {
  const idString = "[" + ids.map((id) => `"${id}"`).join(", ") + "]";
  console.log(idString);
  return gql`
    {
      quays(ids: ${idString}) {
        id
				name
        estimatedCalls(
          arrivalDeparture: departures
          includeCancelledTrips: true
          numberOfDepartures: 3
        ) {
          aimedArrivalTime
          aimedDepartureTime
          bookingArrangements {
            latestBookingTime
            latestBookingDay
            minimumBookingPeriod
            bookingNote
            bookWhen
            bookingContact {
              contactPerson
              email
              url
              phone
              furtherDetails
              __typename
            }
            __typename
          }
          serviceJourney {
            id
            journeyPattern {
              line {
                id
                publicCode
                __typename
              }
              __typename
            }
            notices {
              id
              text
              __typename
            }
            transportMode
            transportSubmode
            __typename
          }
          cancellation
          expectedArrivalTime
          expectedDepartureTime
          destinationDisplay {
            frontText
            via
            __typename
          }
          notices {
            id
            text
            __typename
          }
          predictionInaccurate
          quay {
            id
            name
            description
            publicCode
            stopPlace {
              name
              description
              __typename
            }
            __typename
          }
          realtime
          situations {
            situationNumber
            summary {
              value
              language
              __typename
            }
            description {
              value
              language
              __typename
            }
            advice {
              value
              language
              __typename
            }
            validityPeriod {
              startTime
              endTime
              __typename
            }
            reportType
            infoLinks {
              uri
              label
              __typename
            }
            __typename
          }
          occupancyStatus
          __typename
        }
        __typename
      }
    }
  `;
}

interface Props {
  quayIds: string[];
}

export function Quay(props: Props) {
  const { data: quayData } = useQuery(
    // getQuayStopGql(["10319", "10320"]),
    getQuayStopGql(props.quayIds),
    {
      client: enturClient,
    }
  );

  // console.log("VestreHaugenQuayData", VestreHaugenQuayData);

  return (
    <div className="flex flex-row">
      {quayData?.quays.map((quay: any, index: number) => (
        <div key={quay.id} className="flex flex-col m-2">
          <h1 className="font-bold text-center mb-2">
            {quay.name} {index + 1}
          </h1>
          {quay.estimatedCalls.map((call: any) => (
            <div
              key={
                call.expectedDepartureTime +
                call.serviceJourney.journeyPattern.line.name
              }
              className="flex flex-row items-center mb-2"
            >
              <div className="bg-[#e60000] py-1 px-3 rounded-lg text-xl font-bold">
                {call.serviceJourney.journeyPattern.line.publicCode}
              </div>
              <div className="mx-2 text-lg grow">
                {call.destinationDisplay.frontText}
              </div>
              <div className=" text-lg">
                {differenceInMinutes(
                  new Date(call.expectedDepartureTime),
                  new Date()
                )}{" "}
                min
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
