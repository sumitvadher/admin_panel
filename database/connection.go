package database

import (
    "fmt"
    "log"
    "os"

    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
    "github.com/joho/godotenv"
)

var DB *sqlx.DB

func InitDB() {
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

    connStr := os.Getenv("DATABASE_URL")
    if connStr == "" {
        log.Fatal("DATABASE_URL is not set in .env file")
    }

    DB, err = sqlx.Connect("postgres", connStr)
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    fmt.Println("Connected to PostgreSQL successfully!")
}

