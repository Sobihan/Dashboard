/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-guillaume.le-berre
** File description:
** main
*/

#include <iostream>
#include <fstream>

bool is_digit(const std::string &str)
{
    for (const char c : str)
        if (c < '0' || c > '9')
            return false;
    return true;
}

void help()
{
    std::cerr << "USAGE : ./dashboard_server port\n";
    std::cerr << "\tport:\tValid port, only numeric characters, 4 char long\n";
}

int main(int ac, char **av)
{
    if (ac != 2) {
        help();
        return 84;
    }

    std::string port = av[1];

    if (port.length() != 4 || !is_digit(port)) {
        help();
        return 84;
    }

    std::cout << "Success" << std::endl;
    return 0;
}
