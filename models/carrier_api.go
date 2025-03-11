package models

type CarrierAPI struct {
    ID             int    `db:"id"`
    OfferID        int    `db:"offer_id"`
    APIType        string `db:"api_type"`
    RequestMethod  string `db:"request_method"`
    RequestFormat  string `db:"request_format"`
    APIURL         string `db:"api_url"`
    Priority       int    `db:"priority"` // 🔹 Add This Field
}

