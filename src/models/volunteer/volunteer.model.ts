import { VolunteerTeam } from "./volunteer.team.ts";

export type VolunteerId = {
  id: number;
};

export type Volunteer = {
  id: number;
  name: string;
  team: VolunteerTeam;
  mobilePhone: string;
  isActive: boolean;
};
