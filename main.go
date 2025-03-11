package main

import (
    "log"
    "pinapi/database"
    "pinapi/routes"

    "github.com/gin-gonic/gin"
)

func main() {

    gin.SetMode(gin.ReleaseMode) // Set Gin to release mode for production
    database.InitDB()

    r := gin.Default()
    routes.RegisterRoutes(r)

    log.Println("Server is running on port 8086...")
    r.Run(":8086")
}

