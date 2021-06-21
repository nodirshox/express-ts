const config = {
    mongoHost: getConfig("MONGO_HOST", "localhost"),
    mongoPort: getConfig("MONGO_PORT", "27017"),
    mongoUser: getConfig("MONGO_USER", "task_service_admin"),
    mongoPassword: getConfig("MONGO_PASSWORD", "123456"),
    mongoDatabase: getConfig("MONGO_DATABASE", "task_service"),
    serviceHTTPPort: getConfig("SERVICE_HTTP_PORT", "3000"),
}

function getConfig(name: string, def: string): string | string[] | undefined {
    if (process.env[name]) {
        return process.env[name];
    }
    return def;
}

export default config;
