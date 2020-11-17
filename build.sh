#!/bin/bash

mkdir -p build
cd build
conan install ..
cmake .. -G "Unix Makefiles"
cmake --build .
