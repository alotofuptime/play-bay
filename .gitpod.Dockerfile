FROM gitpod/workspace-full



WORKDIR /workspace/play-bay
COPY . .
RUN make install