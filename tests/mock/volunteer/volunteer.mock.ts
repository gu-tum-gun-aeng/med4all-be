export const mockVolunteer = async () => {
  return await {
    id: 2,
    name: "Siriraj-Api",
    team: 2,
    mobilePhone: "0812345678",
    isActive: true,
  };
};

export const mockInvalidTeamVolunteer = async () => {
  return await {
    id: 2,
    name: "Siriraj-Api",
    team: -1,
    mobilePhone: "0812345678",
    isActive: true,
  };
};
