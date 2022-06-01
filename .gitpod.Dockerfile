FROM gitpod/workspace-full


COPY . .
RUN sudo apt-get upadet && sudo apt-get install make 

WORKDIR /workspace/play-bay
RUN make install