import VolunteerTokenRepository from "../dataaccess/database/volunteer.token.repository.ts";
import { traceWrapperAsync } from "../utils/trace.util.ts";

const insert = async (
  token: string,
  validUntil: string,
): Promise<number> => {
  const id = await VolunteerTokenRepository.insert(token, validUntil);
  return traceWrapperAsync<number>(
    () => Promise.resolve(id),
    "route",
  );
};

export default {
  insert,
};
