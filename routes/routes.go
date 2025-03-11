package routes

import (
    "github.com/gin-gonic/gin"
    "pinapi/controllers"
)

func RegisterRoutes(r *gin.Engine) {
    r.GET("/ping", controllers.PingHandler)
    r.GET("/api/pin/request", controllers.RequestPin)
    r.GET("/api/pin/verify", controllers.VerifyPin)
}
