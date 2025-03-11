--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Ubuntu 17.4-1.pgdg20.04+2)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg20.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS subscription_db;
--
-- Name: subscription_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE subscription_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE subscription_db OWNER TO postgres;

\connect subscription_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: custom_schema; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA custom_schema;


ALTER SCHEMA custom_schema OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_activity_logs; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.admin_activity_logs (
    id integer NOT NULL,
    admin_id integer NOT NULL,
    action character varying(255) NOT NULL,
    details text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.admin_activity_logs OWNER TO admin;

--
-- Name: admin_activity_logs_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.admin_activity_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.admin_activity_logs_id_seq OWNER TO admin;

--
-- Name: admin_activity_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.admin_activity_logs_id_seq OWNED BY custom_schema.admin_activity_logs.id;


--
-- Name: affiliate_smart_offer_mapping; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.affiliate_smart_offer_mapping (
    id integer NOT NULL,
    affiliate_id integer NOT NULL,
    smart_offer_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE custom_schema.affiliate_smart_offer_mapping OWNER TO admin;

--
-- Name: affiliate_smart_offer_mapping_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.affiliate_smart_offer_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.affiliate_smart_offer_mapping_id_seq OWNER TO admin;

--
-- Name: affiliate_smart_offer_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.affiliate_smart_offer_mapping_id_seq OWNED BY custom_schema.affiliate_smart_offer_mapping.id;


--
-- Name: affiliate_smartoffer_mapping; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.affiliate_smartoffer_mapping (
    id integer NOT NULL,
    affiliate_id integer NOT NULL,
    smart_offer_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE custom_schema.affiliate_smartoffer_mapping OWNER TO admin;

--
-- Name: affiliate_smartoffer_mapping_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.affiliate_smartoffer_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.affiliate_smartoffer_mapping_id_seq OWNER TO admin;

--
-- Name: affiliate_smartoffer_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.affiliate_smartoffer_mapping_id_seq OWNED BY custom_schema.affiliate_smartoffer_mapping.id;


--
-- Name: affiliates; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.affiliates (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    api_key character varying(255) NOT NULL,
    postback_url text,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.affiliates OWNER TO admin;

--
-- Name: affiliates_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.affiliates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.affiliates_id_seq OWNER TO admin;

--
-- Name: affiliates_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.affiliates_id_seq OWNED BY custom_schema.affiliates.id;


--
-- Name: api_logs; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.api_logs (
    id integer NOT NULL,
    endpoint character varying(255) NOT NULL,
    request_method character varying(10) NOT NULL,
    request_body text,
    response_body text,
    status_code integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.api_logs OWNER TO admin;

--
-- Name: api_logs_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.api_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.api_logs_id_seq OWNER TO admin;

--
-- Name: api_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.api_logs_id_seq OWNED BY custom_schema.api_logs.id;


--
-- Name: carrier_apis; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.carrier_apis (
    id integer NOT NULL,
    offer_id integer,
    api_type character varying(50) NOT NULL,
    request_method character varying(10) NOT NULL,
    request_format character varying(50) NOT NULL,
    response_format character varying(50) DEFAULT 'JSON'::character varying NOT NULL,
    api_url text NOT NULL,
    headers jsonb DEFAULT '{}'::jsonb,
    parameters jsonb DEFAULT '{}'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    priority integer DEFAULT 1,
    CONSTRAINT carrier_apis_api_type_check CHECK (((api_type)::text = ANY ((ARRAY['PIN_REQUEST'::character varying, 'PIN_VERIFY'::character varying, 'LOOKUP'::character varying])::text[]))),
    CONSTRAINT carrier_apis_request_format_check CHECK (((request_format)::text = ANY ((ARRAY['JSON'::character varying, 'XML'::character varying, 'FORM'::character varying])::text[]))),
    CONSTRAINT carrier_apis_request_method_check CHECK (((request_method)::text = ANY ((ARRAY['GET'::character varying, 'POST'::character varying])::text[]))),
    CONSTRAINT carrier_apis_response_format_check CHECK (((response_format)::text = ANY ((ARRAY['JSON'::character varying, 'XML'::character varying, 'FORM'::character varying])::text[])))
);


ALTER TABLE custom_schema.carrier_apis OWNER TO admin;

--
-- Name: carrier_apis_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.carrier_apis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.carrier_apis_id_seq OWNER TO admin;

--
-- Name: carrier_apis_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.carrier_apis_id_seq OWNED BY custom_schema.carrier_apis.id;


--
-- Name: clickhouse_events; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.clickhouse_events (
    id uuid DEFAULT gen_random_uuid(),
    event_type character varying(50) NOT NULL,
    transaction_id character varying(100) NOT NULL,
    affiliate_id integer NOT NULL,
    offer_id integer NOT NULL,
    revenue numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT clickhouse_events_event_type_check CHECK (((event_type)::text = ANY ((ARRAY['SUBSCRIPTION'::character varying, 'CONVERSION'::character varying, 'POSTBACK'::character varying])::text[])))
);


ALTER TABLE custom_schema.clickhouse_events OWNER TO admin;

--
-- Name: offers; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.offers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    country character varying(50) NOT NULL,
    carrier character varying(100) NOT NULL,
    description text,
    status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.offers OWNER TO admin;

--
-- Name: offers_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.offers_id_seq OWNER TO admin;

--
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.offers_id_seq OWNED BY custom_schema.offers.id;


--
-- Name: postback_logs; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.postback_logs (
    id integer NOT NULL,
    transaction_id character varying(100),
    affiliate_id integer,
    postback_url text NOT NULL,
    response_status integer,
    response_body text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.postback_logs OWNER TO admin;

--
-- Name: postback_logs_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.postback_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.postback_logs_id_seq OWNER TO admin;

--
-- Name: postback_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.postback_logs_id_seq OWNED BY custom_schema.postback_logs.id;


--
-- Name: postback_settings; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.postback_settings (
    id integer NOT NULL,
    offer_id integer,
    affiliate_id integer,
    enable_postback boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE custom_schema.postback_settings OWNER TO admin;

--
-- Name: postback_settings_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.postback_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.postback_settings_id_seq OWNER TO admin;

--
-- Name: postback_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.postback_settings_id_seq OWNED BY custom_schema.postback_settings.id;


--
-- Name: scrubbing_rules; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.scrubbing_rules (
    id integer NOT NULL,
    offer_id integer,
    affiliate_id integer,
    scrub_percentage integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT scrubbing_rules_scrub_percentage_check CHECK (((scrub_percentage >= 0) AND (scrub_percentage <= 100)))
);


ALTER TABLE custom_schema.scrubbing_rules OWNER TO admin;

--
-- Name: scrubbing_rules_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.scrubbing_rules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.scrubbing_rules_id_seq OWNER TO admin;

--
-- Name: scrubbing_rules_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.scrubbing_rules_id_seq OWNED BY custom_schema.scrubbing_rules.id;


--
-- Name: smart_offer_mapping; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.smart_offer_mapping (
    id integer NOT NULL,
    smart_offer_id integer NOT NULL,
    offer_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE custom_schema.smart_offer_mapping OWNER TO admin;

--
-- Name: smart_offer_mapping_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.smart_offer_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.smart_offer_mapping_id_seq OWNER TO admin;

--
-- Name: smart_offer_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.smart_offer_mapping_id_seq OWNED BY custom_schema.smart_offer_mapping.id;


--
-- Name: smart_offers; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.smart_offers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE custom_schema.smart_offers OWNER TO admin;

--
-- Name: smart_offers_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.smart_offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.smart_offers_id_seq OWNER TO admin;

--
-- Name: smart_offers_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.smart_offers_id_seq OWNED BY custom_schema.smart_offers.id;


--
-- Name: transactions; Type: TABLE; Schema: custom_schema; Owner: admin
--

CREATE TABLE custom_schema.transactions (
    id integer NOT NULL,
    affiliate_id integer,
    offer_id integer,
    mobile_number character varying(20) NOT NULL,
    transaction_id character varying(100) NOT NULL,
    pin_code character varying(10),
    status character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    clickid character varying(255) NOT NULL,
    subpubid character varying(255),
    affiliate_clickid character varying(255),
    failed_attempts integer DEFAULT 0,
    CONSTRAINT transactions_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'VERIFIED'::character varying, 'FAILED'::character varying, 'SCRUBBED'::character varying])::text[])))
);


ALTER TABLE custom_schema.transactions OWNER TO admin;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: custom_schema; Owner: admin
--

CREATE SEQUENCE custom_schema.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE custom_schema.transactions_id_seq OWNER TO admin;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: custom_schema; Owner: admin
--

ALTER SEQUENCE custom_schema.transactions_id_seq OWNED BY custom_schema.transactions.id;


--
-- Name: admin_activity_logs id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.admin_activity_logs ALTER COLUMN id SET DEFAULT nextval('custom_schema.admin_activity_logs_id_seq'::regclass);


--
-- Name: affiliate_smart_offer_mapping id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smart_offer_mapping ALTER COLUMN id SET DEFAULT nextval('custom_schema.affiliate_smart_offer_mapping_id_seq'::regclass);


--
-- Name: affiliate_smartoffer_mapping id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smartoffer_mapping ALTER COLUMN id SET DEFAULT nextval('custom_schema.affiliate_smartoffer_mapping_id_seq'::regclass);


--
-- Name: affiliates id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliates ALTER COLUMN id SET DEFAULT nextval('custom_schema.affiliates_id_seq'::regclass);


--
-- Name: api_logs id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.api_logs ALTER COLUMN id SET DEFAULT nextval('custom_schema.api_logs_id_seq'::regclass);


--
-- Name: carrier_apis id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.carrier_apis ALTER COLUMN id SET DEFAULT nextval('custom_schema.carrier_apis_id_seq'::regclass);


--
-- Name: offers id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.offers ALTER COLUMN id SET DEFAULT nextval('custom_schema.offers_id_seq'::regclass);


--
-- Name: postback_logs id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_logs ALTER COLUMN id SET DEFAULT nextval('custom_schema.postback_logs_id_seq'::regclass);


--
-- Name: postback_settings id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_settings ALTER COLUMN id SET DEFAULT nextval('custom_schema.postback_settings_id_seq'::regclass);


--
-- Name: scrubbing_rules id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.scrubbing_rules ALTER COLUMN id SET DEFAULT nextval('custom_schema.scrubbing_rules_id_seq'::regclass);


--
-- Name: smart_offer_mapping id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offer_mapping ALTER COLUMN id SET DEFAULT nextval('custom_schema.smart_offer_mapping_id_seq'::regclass);


--
-- Name: smart_offers id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offers ALTER COLUMN id SET DEFAULT nextval('custom_schema.smart_offers_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions ALTER COLUMN id SET DEFAULT nextval('custom_schema.transactions_id_seq'::regclass);


--
-- Data for Name: admin_activity_logs; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.admin_activity_logs (id, admin_id, action, details, created_at) FROM stdin;
\.


--
-- Data for Name: affiliate_smart_offer_mapping; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.affiliate_smart_offer_mapping (id, affiliate_id, smart_offer_id, created_at) FROM stdin;
\.


--
-- Data for Name: affiliate_smartoffer_mapping; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.affiliate_smartoffer_mapping (id, affiliate_id, smart_offer_id, created_at) FROM stdin;
1	1	1	2025-03-09 09:56:02.919965
\.


--
-- Data for Name: affiliates; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.affiliates (id, name, api_key, postback_url, status, created_at) FROM stdin;
2	test2	897899	http://mypb.com	t	2025-03-10 16:42:53.038868
4	Test Affiliate2343434	123456abcdef	https://example.com/postback	t	2025-03-11 05:36:35.958294
1	Updated Affiliate	abcdef123456	https://new-example.com/postback	f	2025-03-09 10:02:11.387486
\.


--
-- Data for Name: api_logs; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.api_logs (id, endpoint, request_method, request_body, response_body, status_code, created_at) FROM stdin;
\.


--
-- Data for Name: carrier_apis; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.carrier_apis (id, offer_id, api_type, request_method, request_format, response_format, api_url, headers, parameters, created_at, priority) FROM stdin;
13	10	PIN_REQUEST	GET	JSON	JSON	https://omantel-magz.mpx.mobi/api/v2/pin/send?msisdn={msisdn}&pixel={clickid}&cycle=daily&token=XwU5hnXT188FYpYvcvbO	{}	{}	2025-03-08 12:15:13.692077	1
14	10	PIN_VERIFY	GET	JSON	JSON	https://omantel-magz.mpx.mobi/api/v2/pin/verify?msisdn={msisdn}&pin={pin}&pixel={clickid}&cycle=daily&token=XwU5hnXT188FYpYvcvbO	{}	{}	2025-03-08 12:15:13.692077	2
15	10	LOOKUP	GET	JSON	JSON	http://omantel.goaly.mobi:8708/api/v2/check/subscription?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO	{}	{}	2025-03-08 12:15:13.692077	3
16	11	PIN_REQUEST	GET	JSON	JSON	http://13.250.242.221:7329/api/v3/pin/send?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO&service=weekly&pixel={clickid}	{}	{}	2025-03-08 12:15:13.692077	1
17	11	PIN_VERIFY	GET	JSON	JSON	http://13.250.242.221:7329/api/v3/pin/verify?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO&service=weekly&pixel={clickid}&pin={pin}	{}	{}	2025-03-08 12:15:13.692077	2
18	11	LOOKUP	GET	JSON	JSON	http://13.250.242.221:7329/api/v3/check/subscription?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO	{}	{}	2025-03-08 12:15:13.692077	3
19	12	PIN_REQUEST	GET	JSON	JSON	http://13.250.242.221:7340/api/v2/pin/send?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO&service=weekly&pixel={clickid}	{}	{}	2025-03-08 12:15:13.692077	1
20	12	PIN_VERIFY	GET	JSON	JSON	http://13.250.242.221:7340/api/v2/pin/verify?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO&service=weekly&pixel={clickid}&pin={pin}	{}	{}	2025-03-08 12:15:13.692077	2
21	12	LOOKUP	GET	JSON	JSON	http://13.250.242.221:7340/api/v2/check/subscription?msisdn={msisdn}&token=XwU5hnXT188FYpYvcvbO	{}	{}	2025-03-08 12:15:13.692077	3
\.


--
-- Data for Name: clickhouse_events; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.clickhouse_events (id, event_type, transaction_id, affiliate_id, offer_id, revenue, created_at) FROM stdin;
\.


--
-- Data for Name: offers; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.offers (id, name, country, carrier, description, status, created_at) FROM stdin;
10	MAGZMOBI	Oman 	omantel	Subscription offer for MAGZMOBI	t	2025-03-08 12:15:13.691443
11	Gamezz	Oman 	ooredoo	Subscription offer for Gamezz	t	2025-03-08 12:15:13.691443
12	Goaly	Oman	Ooredoo	Subscription offer for Goaly	t	2025-03-08 12:15:13.691443
\.


--
-- Data for Name: postback_logs; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.postback_logs (id, transaction_id, affiliate_id, postback_url, response_status, response_body, created_at) FROM stdin;
\.


--
-- Data for Name: postback_settings; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.postback_settings (id, offer_id, affiliate_id, enable_postback, created_at) FROM stdin;
\.


--
-- Data for Name: scrubbing_rules; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.scrubbing_rules (id, offer_id, affiliate_id, scrub_percentage, created_at) FROM stdin;
\.


--
-- Data for Name: smart_offer_mapping; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.smart_offer_mapping (id, smart_offer_id, offer_id, created_at) FROM stdin;
6	1	10	2025-03-09 05:57:22.498656
7	1	11	2025-03-09 05:57:29.247111
8	1	12	2025-03-09 05:57:32.142698
\.


--
-- Data for Name: smart_offers; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.smart_offers (id, name, description, created_at) FROM stdin;
1	Oman_Omantel_Offer	Smart Offer combining Omantel services	2025-03-09 05:12:01.707609
2	Oman_All_Offers	Rotating all Omantel & Ooredoo offers	2025-03-09 05:14:55.282615
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: custom_schema; Owner: admin
--

COPY custom_schema.transactions (id, affiliate_id, offer_id, mobile_number, transaction_id, pin_code, status, created_at, clickid, subpubid, affiliate_clickid, failed_attempts) FROM stdin;
2	1	10	+96891234567	txn_178139		PENDING	2025-03-09 10:09:36.19211	a68bba35b2ccc663167d47f8ce87a46c		\N	0
3	1	10	+96891234567	txn_cv6mpt5et91lujict610		PENDING	2025-03-09 10:27:00.115168	cv6mpt5et91lujict60g		\N	0
4	1	10	+96891234567	txn_cv6mq2tet91lujict62g		PENDING	2025-03-09 10:27:23.566711	cv6mq2tet91lujict620		\N	0
5	1	10	96891234567	txn_cv6nkllet91m3h4oj0eg		PENDING	2025-03-09 11:24:06.522093	7c4eb410-bd43-402a-81d7-43cb94c4413c		aff_click_007	0
6	1	10	96892345678	txn_cv6nmd5et91m3h4oj0fg		PENDING	2025-03-09 11:27:48.198981	eb83e0fb-6db3-4e26-8eb5-94222abba304		aff_click_008	0
7	1	10	96893456789	txn_cv6nsatet91m0ujm2ivg		PENDING	2025-03-09 11:40:27.307493	cv6nsatet91m0ujm2iv0		aff_click_009	1
8	1	10	96893456789	txn_cv6ntttet91m0ujm2j1g		PENDING	2025-03-09 11:43:51.907992	cv6ntttet91m0ujm2j10		aff_click_010	0
9	1	10	96898765432	txn_cv6o4tdet91mcdaa54v0		PENDING	2025-03-09 11:58:45.892365	cv6o4tdet91mcdaa54ug	23136	63c59809c259	0
10	1	10	96898765432	txn_cv6o6mtet91mb4tnlvi0		PENDING	2025-03-09 12:02:35.538569	cv6o6mtet91mb4tnlvhg	345211	f8a2d17b5c3e4a90	1
\.


--
-- Name: admin_activity_logs_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.admin_activity_logs_id_seq', 1, false);


--
-- Name: affiliate_smart_offer_mapping_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.affiliate_smart_offer_mapping_id_seq', 6, true);


--
-- Name: affiliate_smartoffer_mapping_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.affiliate_smartoffer_mapping_id_seq', 1, true);


--
-- Name: affiliates_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.affiliates_id_seq', 4, true);


--
-- Name: api_logs_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.api_logs_id_seq', 1, false);


--
-- Name: carrier_apis_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.carrier_apis_id_seq', 21, true);


--
-- Name: offers_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.offers_id_seq', 12, true);


--
-- Name: postback_logs_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.postback_logs_id_seq', 1, false);


--
-- Name: postback_settings_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.postback_settings_id_seq', 1, false);


--
-- Name: scrubbing_rules_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.scrubbing_rules_id_seq', 1, false);


--
-- Name: smart_offer_mapping_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.smart_offer_mapping_id_seq', 8, true);


--
-- Name: smart_offers_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.smart_offers_id_seq', 3, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: custom_schema; Owner: admin
--

SELECT pg_catalog.setval('custom_schema.transactions_id_seq', 10, true);


--
-- Name: admin_activity_logs admin_activity_logs_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.admin_activity_logs
    ADD CONSTRAINT admin_activity_logs_pkey PRIMARY KEY (id);


--
-- Name: affiliate_smart_offer_mapping affiliate_smart_offer_mapping_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smart_offer_mapping
    ADD CONSTRAINT affiliate_smart_offer_mapping_pkey PRIMARY KEY (id);


--
-- Name: affiliate_smartoffer_mapping affiliate_smartoffer_mapping_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smartoffer_mapping
    ADD CONSTRAINT affiliate_smartoffer_mapping_pkey PRIMARY KEY (id);


--
-- Name: affiliates affiliates_api_key_key; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliates
    ADD CONSTRAINT affiliates_api_key_key UNIQUE (api_key);


--
-- Name: affiliates affiliates_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliates
    ADD CONSTRAINT affiliates_pkey PRIMARY KEY (id);


--
-- Name: api_logs api_logs_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.api_logs
    ADD CONSTRAINT api_logs_pkey PRIMARY KEY (id);


--
-- Name: carrier_apis carrier_apis_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.carrier_apis
    ADD CONSTRAINT carrier_apis_pkey PRIMARY KEY (id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: postback_logs postback_logs_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_logs
    ADD CONSTRAINT postback_logs_pkey PRIMARY KEY (id);


--
-- Name: postback_settings postback_settings_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_settings
    ADD CONSTRAINT postback_settings_pkey PRIMARY KEY (id);


--
-- Name: scrubbing_rules scrubbing_rules_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.scrubbing_rules
    ADD CONSTRAINT scrubbing_rules_pkey PRIMARY KEY (id);


--
-- Name: smart_offer_mapping smart_offer_mapping_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offer_mapping
    ADD CONSTRAINT smart_offer_mapping_pkey PRIMARY KEY (id);


--
-- Name: smart_offers smart_offers_name_key; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offers
    ADD CONSTRAINT smart_offers_name_key UNIQUE (name);


--
-- Name: smart_offers smart_offers_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offers
    ADD CONSTRAINT smart_offers_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_transaction_id_key; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions
    ADD CONSTRAINT transactions_transaction_id_key UNIQUE (transaction_id);


--
-- Name: transactions unique_affiliate_mobile_clickid; Type: CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions
    ADD CONSTRAINT unique_affiliate_mobile_clickid UNIQUE (affiliate_id, affiliate_clickid, mobile_number);


--
-- Name: affiliate_smart_offer_mapping affiliate_smart_offer_mapping_affiliate_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smart_offer_mapping
    ADD CONSTRAINT affiliate_smart_offer_mapping_affiliate_id_fkey FOREIGN KEY (affiliate_id) REFERENCES custom_schema.affiliates(id);


--
-- Name: affiliate_smart_offer_mapping affiliate_smart_offer_mapping_smart_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.affiliate_smart_offer_mapping
    ADD CONSTRAINT affiliate_smart_offer_mapping_smart_offer_id_fkey FOREIGN KEY (smart_offer_id) REFERENCES custom_schema.smart_offers(id);


--
-- Name: carrier_apis carrier_apis_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.carrier_apis
    ADD CONSTRAINT carrier_apis_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES custom_schema.offers(id) ON DELETE CASCADE;


--
-- Name: postback_logs postback_logs_affiliate_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_logs
    ADD CONSTRAINT postback_logs_affiliate_id_fkey FOREIGN KEY (affiliate_id) REFERENCES custom_schema.affiliates(id) ON DELETE CASCADE;


--
-- Name: postback_logs postback_logs_transaction_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_logs
    ADD CONSTRAINT postback_logs_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES custom_schema.transactions(transaction_id) ON DELETE CASCADE;


--
-- Name: postback_settings postback_settings_affiliate_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_settings
    ADD CONSTRAINT postback_settings_affiliate_id_fkey FOREIGN KEY (affiliate_id) REFERENCES custom_schema.affiliates(id) ON DELETE CASCADE;


--
-- Name: postback_settings postback_settings_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.postback_settings
    ADD CONSTRAINT postback_settings_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES custom_schema.offers(id) ON DELETE CASCADE;


--
-- Name: scrubbing_rules scrubbing_rules_affiliate_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.scrubbing_rules
    ADD CONSTRAINT scrubbing_rules_affiliate_id_fkey FOREIGN KEY (affiliate_id) REFERENCES custom_schema.affiliates(id) ON DELETE CASCADE;


--
-- Name: scrubbing_rules scrubbing_rules_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.scrubbing_rules
    ADD CONSTRAINT scrubbing_rules_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES custom_schema.offers(id) ON DELETE CASCADE;


--
-- Name: smart_offer_mapping smart_offer_mapping_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offer_mapping
    ADD CONSTRAINT smart_offer_mapping_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES custom_schema.offers(id);


--
-- Name: smart_offer_mapping smart_offer_mapping_smart_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.smart_offer_mapping
    ADD CONSTRAINT smart_offer_mapping_smart_offer_id_fkey FOREIGN KEY (smart_offer_id) REFERENCES custom_schema.smart_offers(id);


--
-- Name: transactions transactions_affiliate_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions
    ADD CONSTRAINT transactions_affiliate_id_fkey FOREIGN KEY (affiliate_id) REFERENCES custom_schema.affiliates(id) ON DELETE SET NULL;


--
-- Name: transactions transactions_offer_id_fkey; Type: FK CONSTRAINT; Schema: custom_schema; Owner: admin
--

ALTER TABLE ONLY custom_schema.transactions
    ADD CONSTRAINT transactions_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES custom_schema.offers(id) ON DELETE CASCADE;


--
-- Name: DATABASE subscription_db; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE subscription_db TO admin;


--
-- PostgreSQL database dump complete
--

