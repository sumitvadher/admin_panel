package controllers

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "net/url"
    "strings"
    "time"
    "pinapi/database"
    "pinapi/models"
    "github.com/gin-gonic/gin"
    //crand "crypto/rand"
    //"encoding/hex"
    "github.com/lib/pq"
    "log"
    //"database/sql"
    "github.com/rs/xid"
    "strconv"
)

var _ = bytes.MinRead
var _ = json.Marshal
var _ = url.QueryEscape
var _ = time.Now
var _ = pq.Efatal
var _ = ioutil.ReadFile // Prevents "imported but not used" error


type PinRequest struct {
    MobileNumber string `json:"mobile_number"`
    OfferID      int    `json:"offer_id"`
}

type PinVerify struct {
    MobileNumber string `json:"mobile_number"`
    PinCode      string `json:"pin_code"`
    OfferID      int    `json:"offer_id"`
}

func generateClickID() string {
    /*
    bytes := make([]byte, 16) // 16-byte random string
    _, err := crand.Read(bytes) // ✅ Use crypto/rand as crand
    if err != nil {
        return "default_clickid" // Fallback value
    }
    return hex.EncodeToString(bytes)
    */
    return xid.New().String()
}

func PingHandler(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "Pong!"})
}

///

func RequestPin(c *gin.Context) {
    // ✅ Extract query parameters
    mobileNumber := c.Query("mobile_number")
    smartOfferID, err := strconv.Atoi(c.Query("smart_offer_id"))
    affiliateID, err := strconv.Atoi(c.Query("affiliate_id"))
    affiliateClickID := c.Query("affiliate_clickid")
    subpubID := c.Query("subpubid")

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request parameters"})
        return
    }

    // 🚨 Ensure required fields are present
    if mobileNumber == "" || smartOfferID == 0 || affiliateID == 0 || affiliateClickID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required parameters"})
        return
    }

    // ✅ Generate Click ID & Transaction ID
    clickID := generateClickID()
    transactionID := generateTransactionID()

    fmt.Println("DEBUG: Received request for SmartOffer ID:", smartOfferID,
        "Mobile:", mobileNumber, "SubPubID:", subpubID,
        "AffiliateID:", affiliateID, "AffiliateClickID:", affiliateClickID)

    // ✅ Fetch Offer ID for the SmartOffer
    var offerID int
    err = database.DB.QueryRow(`
        SELECT offer_id FROM custom_schema.smart_offer_mapping
        WHERE smart_offer_id = $1 LIMIT 1
    `, smartOfferID).Scan(&offerID)

    if err != nil {
        fmt.Println("ERROR: Failed to fetch Offer ID for SmartOffer ID", smartOfferID, "->", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "No Offer found for SmartOffer", "details": err.Error()})
        return
    }

    fmt.Println("DEBUG: Mapped SmartOffer ID", smartOfferID, "to Offer ID", offerID)

    // ✅ Call the rotated API function
    response, err := makeCarrierRequest(c, smartOfferID, "PIN_REQUEST", mobileNumber, "")
    if err != nil {
        fmt.Println("Error in API rotation:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to request PIN", "details": err.Error()})
        return
    }

    // ✅ Store Transaction using `affiliate_id + affiliate_clickid + mobile_number`
    var storedTransactionID string
    query := `INSERT INTO custom_schema.transactions
        (affiliate_id, offer_id, mobile_number, transaction_id, subpubid, affiliate_clickid, pin_code, status, created_at, clickid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING', NOW(), $8)
        ON CONFLICT (affiliate_id, affiliate_clickid, mobile_number)
        DO UPDATE SET status = 'PENDING', clickid = EXCLUDED.clickid
        RETURNING transaction_id;`

    err = database.DB.QueryRow(query, affiliateID, offerID, mobileNumber, transactionID, subpubID, affiliateClickID, "", clickID).Scan(&storedTransactionID)
    if err != nil {
        fmt.Println("❌ ERROR storing transaction:", err)
    } else {
        fmt.Println("✅ DEBUG: Transaction successfully stored with ClickID:", clickID)
    }

    // ✅ Return the response with `transaction_id`
    c.JSON(http.StatusOK, gin.H{"message": "PIN request sent", "response": response, "transaction_id": storedTransactionID})
}



func VerifyPin(c *gin.Context) {
    // ✅ Extract query parameters
    mobileNumber := c.Query("mobile_number")
    pinCode := c.Query("pin_code")
    smartOfferID, err := strconv.Atoi(c.Query("smart_offer_id"))
    affiliateID, err := strconv.Atoi(c.Query("affiliate_id"))
    affiliateClickID := c.Query("affiliate_clickid")

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request parameters"})
        return
    }

    fmt.Println("DEBUG: Received PIN verification request for SmartOffer:", smartOfferID, "Mobile:", mobileNumber, "AffiliateID:", affiliateID, "AffiliateClickID:", affiliateClickID)

    // Ensure all required parameters are provided
    if mobileNumber == "" || pinCode == "" || smartOfferID == 0 || affiliateID == 0 || affiliateClickID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required parameters"})
        return
    }

    // ✅ Retrieve stored transaction details using `AffiliateClickID + MobileNumber`
    var clickID, subpubID, transactionID string
    var failedAttempts int
    err = database.DB.QueryRow(`
        SELECT clickid, subpubid, transaction_id, failed_attempts
        FROM custom_schema.transactions
        WHERE offer_id IN (SELECT offer_id FROM custom_schema.smart_offer_mapping WHERE smart_offer_id = $1)
        AND mobile_number = $2 AND affiliate_id = $3 AND affiliate_clickid = $4 LIMIT 1`,
        smartOfferID, mobileNumber, affiliateID, affiliateClickID).Scan(&clickID, &subpubID, &transactionID, &failedAttempts)

    if err != nil {
        fmt.Println("ERROR: Transaction not found for Mobile:", mobileNumber, "AffiliateID:", affiliateID, "AffiliateClickID:", affiliateClickID)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Transaction not found"})
        return
    }

    // ✅ Call Carrier API for PIN verification
    response, err := makeCarrierRequest(c, smartOfferID, "PIN_VERIFY", mobileNumber, pinCode)
    if err != nil {
        fmt.Println("Error in API rotation:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to verify PIN", "details": err.Error()})
        return
    }

    // ✅ Check response & update transaction status
    if strings.Contains(response, `"status":"SUCCESS"`) {  // Carrier confirmed success
        updateQuery := `
            UPDATE custom_schema.transactions
            SET status = 'SUCCESS', pin_code = $1, verified_at = NOW()
            WHERE transaction_id = $2
        `
        _, err = database.DB.Exec(updateQuery, pinCode, transactionID)
        if err != nil {
            fmt.Println("Error updating transaction status:", err)
        } else {
            fmt.Println("DEBUG: PIN Verified Successfully for Transaction:", transactionID)
        }

        // ✅ Trigger Postback only for successful verification
        go sendPostback(smartOfferID, clickID, subpubID, "SUCCESS")

        c.JSON(http.StatusOK, gin.H{"message": "PIN verified", "response": response})
    } else {
        // ❌ Carrier response shows PIN is incorrect
        failedAttempts++

        updateQuery := `
            UPDATE custom_schema.transactions
            SET failed_attempts = $1
            WHERE transaction_id = $2
        `
        _, err = database.DB.Exec(updateQuery, failedAttempts, transactionID)
        if err != nil {
            fmt.Println("Error updating failed attempts count:", err)
        } else {
            fmt.Println("DEBUG: Failed PIN attempt:", failedAttempts, "for Transaction:", transactionID)
        }

        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid PIN", "attempts": failedAttempts})
    }
}


func makeCarrierRequest(c *gin.Context, smartOfferID int, apiType string, mobile, pin string) (string, error) {
    var offerIDs []int

    // ✅ Fetch offer_ids linked to SmartOffer ID
    err := database.DB.Select(&offerIDs, `
        SELECT DISTINCT offer_id FROM custom_schema.smart_offer_mapping WHERE smart_offer_id = $1
    `, smartOfferID)

    if err != nil || len(offerIDs) == 0 {
        fmt.Println("DEBUG: No offers found for SmartOffer ID:", smartOfferID)
        return "", fmt.Errorf("No offers found for smart_offer_id %d", smartOfferID)
    }

    fmt.Println("DEBUG: Offers found for SmartOffer ID", smartOfferID, "->", offerIDs)

    var carrierAPIs []models.CarrierAPI

    // ✅ Use `ANY($1)` Instead of Manual Formatting
    query := `
    SELECT c.id, c.api_url, c.request_method, c.request_format, c.priority
    FROM custom_schema.carrier_apis c
    WHERE c.offer_id = ANY($1) AND c.api_type = $2
    ORDER BY c.priority ASC;
    `
    err = database.DB.Select(&carrierAPIs, query, pq.Array(offerIDs), apiType)

    if err != nil {
        fmt.Println("ERROR: Failed to execute Carrier API Query:", err)
        return "", fmt.Errorf("Carrier API selection failed")
    } else if len(carrierAPIs) == 0 {
        fmt.Println("DEBUG: Query executed but returned no results.")
        return "", fmt.Errorf("No carrier APIs found for smart_offer_id %d", smartOfferID)
    }

    fmt.Println("DEBUG: Carrier APIs found ->", carrierAPIs)

    for _, api := range carrierAPIs {
        formattedURL := api.APIURL

        // ✅ Extract `subpubID` dynamically
        subpubID := c.Query("subpubid")

        formattedURL = strings.Replace(formattedURL, "{msisdn}", mobile, -1)
        formattedURL = strings.Replace(formattedURL, "{clickid}", generateClickID(), -1)
        formattedURL = strings.Replace(formattedURL, "{subpubid}", subpubID, -1)
        if pin != "" {
            formattedURL = strings.Replace(formattedURL, "{pin}", pin, -1)
        }

        fmt.Println("Trying Carrier API:", formattedURL)
        return formattedURL, nil
    }

    return "", fmt.Errorf("All carrier APIs failed for smart_offer_id %d", smartOfferID)
}


///

func shouldScrubSubscription(offerID int) bool {
    var scrubPercentage int
    query := `SELECT scrub_percentage FROM custom_schema.scrubbing_rules WHERE offer_id = $1 LIMIT 1`
    err := database.DB.Get(&scrubPercentage, query, offerID)
    if err != nil || scrubPercentage == 0 {
        return false
    }
    return randomScrub(scrubPercentage)
}

func randomScrub(percentage int) bool {
    return rand.Intn(100) < percentage
}

func sendPostback(smartOfferID int, clickID string, subpubID string, status string) {
    var postbackURL string
    query := `SELECT postback_url FROM custom_schema.postback_settings WHERE smart_offer_id = $1 AND status = TRUE LIMIT 1`
    err := database.DB.Get(&postbackURL, query, smartOfferID)
    if err != nil {
        fmt.Println("No postback configured or enabled for this SmartOffer.")
        return
    }

    // Replace placeholders
    formattedURL := strings.Replace(postbackURL, "{clickid}", clickID, -1)
    formattedURL = strings.Replace(formattedURL, "{subpubid}", subpubID, -1)
    formattedURL = strings.Replace(formattedURL, "{status}", status, -1)

    fmt.Println("Sending Postback:", formattedURL)

    // Make HTTP request
    req, err := http.NewRequest("GET", formattedURL, nil)
    if err != nil {
        fmt.Println("Error creating postback request:", err)
        return
    }

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error sending postback:", err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Postback sent successfully! Response:", resp.Status)
}

func updateAPIFailure(apiID int, reason ...string) {
    defaultReason := "Unknown failure"
    if len(reason) > 0 {
        defaultReason = reason[0]
    }
    log.Printf("❌ API Failure | ID: %d | Reason: %s", apiID, defaultReason)
}


func updateAPISuccess(apiID int) {
    fmt.Println("API Success:", apiID)
}

func generateTransactionID() string {
    return "txn_" + xid.New().String()
}

