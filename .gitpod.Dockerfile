FROM gitpod/workspace-full

USER root
WORKDIR /workspace/play-bay
COPY . .
RUN make install

USER gitpod