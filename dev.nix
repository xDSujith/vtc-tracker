{ pkgs }:
{
    deps = [
        pkgs.nodejs-18_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.postgresql_13
    ];
    services.postgres = {
        enable = true;
        package = pkgs.postgresql_13;
    };
}