FROM gitpod/workspace-full


COPY . .
RUN apt-get install make 

WORKDIR /workspace/play-bay
RUN make install