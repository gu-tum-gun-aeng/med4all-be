export const mockPublishPatientResponse = async () => {
  return await {
    data: {
      id: 1,
      cdPersonID: "0000000000000",
      cdPersonFirstName: "John",
      cdPersonLastName: "Doe",
      cdPersonAge: 30,
      cdPersonPhone1: "0811231234",
      crProvinceCode: "00",
      crAmpurCode: "01",
      createdAt: new Date(),
    },
    message: "string",
  };
};
