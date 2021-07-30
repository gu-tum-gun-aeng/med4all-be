export const process = {
  runHostName: () => Deno.run({ cmd: ["hostname"], stdout: "piped" }),
};

export const getHostname = async (): Promise<string> => {
  const hostname = await process.runHostName().output();
  return new TextDecoder().decode(hostname).trimEnd();
};
