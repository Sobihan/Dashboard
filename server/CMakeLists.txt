set(SRC src/main.cpp
        )

add_executable(dashboard_server ${SRC})

target_link_libraries(dashboard_server ${CONAN_LIBS})

target_include_directories(dashboard_server PUBLIC
                            "${CMAKE_CURRENT_LIST_DIR}/include"
                            )

