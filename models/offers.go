package models

type Offer struct {
    ID          int    `db:"id"`
    Name        string `db:"name"`
    Country     string `db:"country"`
    Carrier     string `db:"carrier"`
    Description string `db:"description"`
    Status      bool   `db:"status"`
    CreatedAt   string `db:"created_at"`
}
