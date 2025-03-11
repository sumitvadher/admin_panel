package services

import (
    "github.com/go-redis/redis/v8"
    "context"
    "log"
)

var RedisClient *redis.Client

func InitRedis() {
    RedisClient = redis.NewClient(&redis.Options{
        Addr:     "127.0.0.1:6379",
        Password: "",
        DB:       0,
    })

    ctx := context.Background()
    _, err := RedisClient.Ping(ctx).Result()
    if err != nil {
        log.Fatalf("Failed to connect to Redis: %v", err)
    }
}
