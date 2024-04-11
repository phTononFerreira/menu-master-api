import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    legacyMode: true
});

client.on('error', (err) => {
    console.log('Redis error: ', err);
});

client.connect((err) => {
    if (err) {
        console.log('Redis connection error: ', err);
    }else{
        console.log('✅ Redis connected');
    }
})

client.getSync = promisify(client.get);
client.setSync = async (key, value, ttlInSeconds) => {
    try {
        await client.setEx(key, ttlInSeconds, value);
    } catch (error) {
        console.error(`Erro ao definir a chave '${key}':`, error);
    }
};

export default client;