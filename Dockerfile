FROM denoland/deno:1.11.0
# install denon
RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts
# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

COPY . .
RUN /app/lock_update.sh
RUN deno cache /app/src/app.ts

CMD ["denon", "start"]
