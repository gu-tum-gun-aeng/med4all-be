FROM denoland/deno:1.12.0
# install velociraptor
RUN deno install -qAn vr https://deno.land/x/velociraptor@1.1.0/cli.ts

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

COPY . .
RUN /app/lock_update.sh
RUN deno cache /app/src/app.ts

CMD ["vr", "run", "start-not-hot"]
