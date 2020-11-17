cmake_minimum_required(VERSION 3.10)

project(Dashboard VERSION 0.1)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_subdirectory(server)
