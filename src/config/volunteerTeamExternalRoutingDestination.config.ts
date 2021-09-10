import { ExternalRoutingDestination } from "../models/enum/externalRoutingDestination.ts";
import { VolunteerTeam } from "../models/volunteer/volunteer.team.ts";

export type VolunteerTeamExternalRoutingDestination = {
  team: VolunteerTeam;
  externalRoutingDestination: [ExternalRoutingDestination];
};

export const volunteerTeamExternalRoutingDestinationsConfig:
  VolunteerTeamExternalRoutingDestination[] = [
    {
      team: VolunteerTeam.Ava,
      externalRoutingDestination: [ExternalRoutingDestination.Default],
    },
    {
      team: VolunteerTeam.Siriraj,
      externalRoutingDestination: [ExternalRoutingDestination.Default],
    },
  ];
